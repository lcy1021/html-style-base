// 后台登录：GitHub OAuth（只放行白名单账号）或独立密码；会话用签名 Cookie
import crypto from 'node:crypto';
import { config } from './config.js';

const COOKIE = 'hsb_admin';
const TTL = 7 * 86400e3;
const sign = s => crypto.createHmac('sha256', config.sessionSecret).update(s).digest('base64url');

export function parseCookies(req) {
  const out = {};
  for (const part of (req.headers.cookie || '').split(';')) {
    const i = part.indexOf('='); if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}
const cookieAttrs = maxAge => `Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${config.cookieSecure ? '; Secure' : ''}`;

export function isAdmin(req) {
  if (!config.sessionSecret || config.sessionSecret.length < 16) return null;
  const v = parseCookies(req)[COOKIE]; if (!v) return null;
  const [who, exp, sig] = v.split('.');
  if (!who || !exp || !sig) return null;
  const want = sign(`${who}.${exp}`);
  if (sig.length !== want.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(want))) return null;
  if (+exp < Date.now()) return null;
  return Buffer.from(who, 'base64url').toString();
}
export function sessionCookie(name) {
  const who = Buffer.from(name).toString('base64url'), exp = Date.now() + TTL;
  return `${COOKIE}=${who}.${exp}.${sign(`${who}.${exp}`)}; ${cookieAttrs(TTL / 1000)}`;
}
export const clearCookie = () => `${COOKIE}=; ${cookieAttrs(0)}`;

/* ---------- GitHub OAuth ---------- */
export function githubStart() {
  const state = crypto.randomBytes(12).toString('hex');
  const u = new URL('https://github.com/login/oauth/authorize');
  u.searchParams.set('client_id', config.github.clientId);
  u.searchParams.set('redirect_uri', `${config.publicUrl}/admin/callback`);
  u.searchParams.set('scope', 'read:user');
  u.searchParams.set('state', state);
  return { url: u.toString(), cookie: `hsb_state=${state}; ${cookieAttrs(600)}` };
}
export async function githubFinish(req, url) {
  const state = url.searchParams.get('state'), code = url.searchParams.get('code');
  if (!code || !state || state !== parseCookies(req).hsb_state) throw new Error('登录状态校验失败，请重新登录');
  const tr = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: config.github.clientId, client_secret: config.github.clientSecret, code, redirect_uri: `${config.publicUrl}/admin/callback` }),
  }).then(r => r.json());
  if (!tr.access_token) throw new Error('GitHub 没有返回 access_token：' + (tr.error_description || tr.error || ''));
  const user = await fetch('https://api.github.com/user', { headers: { Authorization: `Bearer ${tr.access_token}`, 'User-Agent': 'html-style-base' } }).then(r => r.json());
  const login = String(user.login || '').toLowerCase();
  if (!login || !config.github.admins.includes(login)) throw new Error(`账号 ${user.login || '(未知)'} 没有后台权限`);
  return 'github:' + user.login;
}

/* ---------- 密码登录（带简单的失败次数限制） ---------- */
const fails = new Map();
export function passwordLogin(ipKey, password) {
  const f = fails.get(ipKey) || { n: 0, t: Date.now() };
  if (Date.now() - f.t > 15 * 60e3) { f.n = 0; f.t = Date.now(); }
  if (f.n >= 5) return { ok: false, msg: '尝试次数太多，15 分钟后再试' };
  const a = Buffer.from(String(password || '')), b = Buffer.from(config.adminPassword);
  const ok = !!config.adminPassword && a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!ok) { f.n++; fails.set(ipKey, f); return { ok: false, msg: '密码不对' }; }
  fails.delete(ipKey);
  return { ok: true };
}
