// 入口：/e 埋点、/mcp 远程 MCP、/admin 后台
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';
import { db, logEvent, createToken, checkToken, backup, dayOf } from './db.js';
import { content } from './content.js';
import { handleMcp } from './mcp.js';
import { isAdmin, sessionCookie, clearCookie, githubStart, githubFinish, passwordLogin } from './auth.js';
import * as stats from './stats.js';
import * as apply from './apply.js';

const PUB = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public');
const page = f => fs.readFileSync(path.join(PUB, f), 'utf8');

/* ---------- 小工具 ---------- */
const send = (res, code, body, headers = {}) => {
  const isObj = body && typeof body === 'object' && !Buffer.isBuffer(body);
  res.writeHead(code, { 'Content-Type': isObj ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  res.end(isObj ? JSON.stringify(body) : body);
};
const html = (res, s, headers = {}) => send(res, 200, s, { 'Content-Type': 'text/html; charset=utf-8', ...headers });
const redirect = (res, to, headers = {}) => { res.writeHead(302, { Location: to, ...headers }); res.end(); };
function readBody(req, limit = 64 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > limit) { reject(new Error('too large')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}
const clientIp = req => (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '';
const saltOfDay = () => crypto.createHash('sha256').update(config.sessionSecret + dayOf(Date.now())).digest('hex');
const ipHash = req => crypto.createHash('sha256').update(saltOfDay() + clientIp(req)).digest('hex').slice(0, 16);

/* ---------- 埋点 ---------- */
const WEB_TYPES = new Set(['page_view', 'design_open', 'md_download', 'md_copy', 'prompt_copy', 'search', 'demo_open']);
const recent = new Map();      // 去重：同一访客短时间内重复的浏览只记一次
const perIp = new Map();       // 防刷：每个 IP 每分钟最多 120 条
setInterval(() => { const t = Date.now(); for (const [k, v] of recent) if (t - v > 60e3) recent.delete(k); perIp.clear(); }, 60e3).unref();

const originOk = o => config.allowedOrigins.includes(o) || o === config.publicUrl;   // 本域名（网页和服务同域）总是允许
function cors(req) {
  const o = req.headers.origin;
  return o && originOk(o) ? { 'Access-Control-Allow-Origin': o, 'Vary': 'Origin', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } : {};
}
async function track(req, res) {
  const h = cors(req);
  if (req.method === 'OPTIONS') return send(res, 204, '', h);
  const origin = req.headers.origin;
  if (origin && !originOk(origin)) return send(res, 403, 'origin', h);
  const iph = ipHash(req);
  const n = (perIp.get(iph) || 0) + 1; perIp.set(iph, n);
  if (n > 120) return send(res, 429, 'slow down', h);
  let list;
  try { const b = JSON.parse(await readBody(req, 16 * 1024)); list = Array.isArray(b) ? b.slice(0, 20) : [b]; } catch { return send(res, 400, 'bad json', h); }
  const { byId } = content();
  for (const e of list) {
    if (!e || !WEB_TYPES.has(e.t)) continue;
    const visitor = /^[a-z0-9]{8,32}$/i.test(e.v || '') ? e.v : null;
    const pattern = e.p && byId.has(e.p) ? e.p : null;
    if (e.t === 'page_view' || e.t === 'design_open') {
      const k = `${visitor || iph}|${e.t}|${pattern}`;
      if (recent.has(k) && Date.now() - recent.get(k) < 10e3) continue;
      recent.set(k, Date.now());
    }
    logEvent({ type: e.t, source: 'web', pattern, visitor, iph,
      page: ['home', 'view', 'overlay'].includes(e.pg) ? e.pg : null,
      device: e.d === 'm' ? 'mobile' : 'desktop',
      query: e.t === 'search' ? String(e.q || '').slice(0, 100) : null,
      hits: e.t === 'search' && Number.isFinite(+e.h) ? +e.h : null });
  }
  send(res, 204, '', h);
}

/* ---------- MCP ---------- */
async function mcp(req, res, url) {
  if (req.method === 'GET' || req.method === 'DELETE') return send(res, 405, { jsonrpc: '2.0', error: { code: -32000, message: 'Method not allowed' }, id: null }, { Allow: 'POST' });
  if (req.method !== 'POST') return send(res, 405, 'POST only');
  const raw = await readBody(req, 256 * 1024).catch(() => null);
  let body; try { body = JSON.parse(raw); } catch { return send(res, 400, { jsonrpc: '2.0', error: { code: -32700, message: 'Parse error' }, id: null }); }
  const msgs = Array.isArray(body) ? body : [body];
  const init = msgs.find(m => m?.method === 'initialize');
  const client = init ? [init.params?.clientInfo?.name, init.params?.clientInfo?.version].filter(Boolean).join(' ').slice(0, 60) || null : null;

  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : (url.searchParams.get('token') || '');
  const row = checkToken(token, client);
  if (!row && config.mcpRequireToken) {
    return send(res, 401, { jsonrpc: '2.0', error: { code: -32001, message: '需要 token：在请求头加 Authorization: Bearer <token>（找经验库管理员要）' }, id: null }, { 'WWW-Authenticate': 'Bearer' });
  }
  const ctx = { visitor: row ? 't' + row.id : null, client: client || row?.last_client || null, iph: ipHash(req) };
  if (init) logEvent({ type: 'mcp_init', source: 'mcp', visitor: ctx.visitor, client: ctx.client, iph: ctx.iph });
  await handleMcp(req, res, body, ctx);
}

/* ---------- MCP 申请（公开页面） ---------- */
async function applyRoute(req, res, url) {
  const p = url.pathname.replace(/\/$/, '');
  const fill = f => page(f).replaceAll('{{DOMAINS}}', config.applyDomains.map(d => '@' + d).join(' / '));
  if (p === '/apply' && req.method === 'GET') return html(res, fill('apply.html'));
  if (p === '/apply/status' && req.method === 'GET') return html(res, fill('apply-status.html'));
  const h = cors(req);               // 首页（含 GitHub Pages 备用地址）里的申请框会跨站提交
  if (req.method === 'OPTIONS') return send(res, 204, '', h);
  if (req.method !== 'POST') return send(res, 405, 'POST only', h);
  const o = req.headers.origin;
  if (o && !originOk(o)) return send(res, 403, { error: 'origin' }, h);
  let b = {}; try { b = JSON.parse(await readBody(req, 8 * 1024)); } catch { return send(res, 400, { error: '请求格式不对' }, h); }
  if (p === '/apply') {
    const r = apply.submit(b, ipHash(req));
    return send(res, r.error ? 400 : 200, r, h);
  }
  if (p === '/apply/check') {
    const r = apply.check(b.code);
    return send(res, r.error ? 404 : 200, r, h);
  }
  return send(res, 404, { error: 'not found' }, h);
}

/* ---------- 后台 ---------- */
async function admin(req, res, url) {
  const p = url.pathname;
  const hasGh = !!config.github.clientId, hasPw = !!config.adminPassword;

  if (p === '/admin/login') {
    if (req.method === 'POST' && hasPw) {
      const form = new URLSearchParams(await readBody(req, 4096).catch(() => ''));
      const r = passwordLogin(ipHash(req), form.get('password'));
      if (r.ok) return redirect(res, '/admin', { 'Set-Cookie': sessionCookie('password') });
      return html(res, loginPage(hasGh, hasPw, r.msg));
    }
    if (url.searchParams.has('github') && hasGh) { const s = githubStart(); return redirect(res, s.url, { 'Set-Cookie': s.cookie }); }
    return html(res, loginPage(hasGh, hasPw));
  }
  if (p === '/admin/callback' && hasGh) {
    try { const who = await githubFinish(req, url); return redirect(res, '/admin', { 'Set-Cookie': sessionCookie(who) }); }
    catch (e) { return html(res, loginPage(hasGh, hasPw, e.message)); }
  }
  if (p === '/admin/logout') return redirect(res, '/admin/login', { 'Set-Cookie': clearCookie() });

  const who = isAdmin(req);
  if (!who) return p.startsWith('/admin/api/') ? send(res, 401, { error: '未登录' }) : redirect(res, '/admin/login');

  if (p === '/admin' || p === '/admin/') return html(res, page('admin.html'));
  if (!p.startsWith('/admin/api/')) return send(res, 404, 'not found');

  // 修改类接口要求同源，防止跨站请求
  if (req.method !== 'GET') {
    const o = req.headers.origin;
    if (o && o !== config.publicUrl && !o.startsWith('http://localhost')) return send(res, 403, { error: 'origin' });
  }
  const r = stats.range(url);
  switch (p) {
    case '/admin/api/me': return send(res, 200, { who, site: config.siteUrl, mcp: `${config.publicUrl}/mcp`, requireToken: config.mcpRequireToken, applyUrl: `${config.publicUrl}/apply`, domains: config.applyDomains });
    case '/admin/api/applications': return send(res, 200, { list: apply.list(), pending: apply.pendingCount() });
    case '/admin/api/summary': return send(res, 200, stats.summary(r));
    case '/admin/api/trend': return send(res, 200, stats.trend(r));
    case '/admin/api/patterns': return send(res, 200, stats.patterns(r));
    case '/admin/api/mcp': return send(res, 200, stats.mcp(r));
    case '/admin/api/search': return send(res, 200, stats.searches(r));
    case '/admin/api/export.csv': return send(res, 200, stats.csv(r), { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="events-${r.from}-${r.to}.csv"` });
    case '/admin/api/tokens': {
      if (req.method !== 'POST') break;
      let b = {}; try { b = JSON.parse(await readBody(req, 4096)); } catch {}
      const name = String(b.name || '').trim().slice(0, 40);
      if (!name) return send(res, 400, { error: '请填写备注名' });
      return send(res, 200, { ...createToken(name), name });
    }
  }
  const ma = p.match(/^\/admin\/api\/applications\/(\d+)\/(approve|reject)$/);
  if (ma && req.method === 'POST') { const r = apply.decide(+ma[1], ma[2] === 'approve'); return send(res, r.error ? 400 : 200, r); }
  const m = p.match(/^\/admin\/api\/tokens\/(\d+)\/(revoke|restore)$/);
  if (m && req.method === 'POST') {
    db.prepare('UPDATE tokens SET revoked = ? WHERE id = ?').run(m[2] === 'revoke' ? 1 : 0, +m[1]);
    return send(res, 200, { ok: true });
  }
  return send(res, 404, { error: 'not found' });
}

function loginPage(gh, pw, msg = '') {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  return page('login.html')
    .replace('<!--MSG-->', msg ? `<p class="msg">${esc(msg)}</p>` : '')
    .replace('<!--GH-->', gh ? '<a class="btn pri" href="/admin/login?github=1">用 GitHub 登录</a>' : '')
    .replace('<!--PW-->', pw ? `${gh ? '<div class="or">或</div>' : ''}<form method="post" action="/admin/login"><input type="password" name="password" placeholder="管理密码" autocomplete="current-password" required><button class="btn" type="submit">登录</button></form>` : '')
    .replace('<!--NONE-->', !gh && !pw ? '<p class="msg">服务器还没有配置登录方式（GITHUB_CLIENT_ID 或 ADMIN_PASSWORD）。</p>' : '');
}

/* ---------- 路由 ---------- */
const SEC = { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'same-origin', 'X-Frame-Options': 'DENY' };
const server = http.createServer(async (req, res) => {
  for (const [k, v] of Object.entries(SEC)) res.setHeader(k, v);
  let url;
  try { url = new URL('http://x' + (req.url.startsWith('/') ? req.url : '/' + req.url)); }   // 扫描器会发 //xx 之类的怪路径，不能当成主机名解析
  catch { return send(res, 400, 'bad request'); }
  try {
    if (url.pathname === '/e') return await track(req, res);
    if (url.pathname === '/mcp') return await mcp(req, res, url);
    if (url.pathname === '/admin' || url.pathname.startsWith('/admin/')) return await admin(req, res, url);
    if (url.pathname === '/apply' || url.pathname.startsWith('/apply/')) return await applyRoute(req, res, url);
    if (url.pathname === '/health') return send(res, 200, 'ok');
    if (url.pathname === '/') return redirect(res, config.siteUrl);
    send(res, 404, 'not found');
  } catch (err) {
    console.error('[http]', req.method, url.pathname, err);
    if (!res.headersSent) send(res, 500, 'server error');
  }
});

content();
backup();
setInterval(backup, 3600e3).unref();     // 每小时检查一次，当天没备份就备份
server.listen(config.port, () => console.log(`[server] 监听 :${config.port}  站点目录 ${config.siteDir}  后台 ${config.publicUrl}/admin`));
const stop = () => { server.close(); try { db.close(); } catch {} process.exit(0); };
process.on('SIGTERM', stop); process.on('SIGINT', stop);
process.on('uncaughtException', err => console.error('[uncaught]', err));        // 兜底：单个请求出错不让整个服务退出
process.on('unhandledRejection', err => console.error('[unhandled]', err));
