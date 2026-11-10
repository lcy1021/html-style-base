// MCP 申请：同学填公司邮箱申请 → 管理员审核 → 同学用查询码领取 token（只显示一次）
import crypto from 'node:crypto';
import { config } from './config.js';
import { db, createToken } from './db.js';

const hash = s => crypto.createHash('sha256').update(s).digest('hex');
const EMAIL = /^[a-z0-9._%+-]+@([a-z0-9-]+\.)+[a-z]{2,}$/i;

export function emailAllowed(email) {
  const e = String(email || '').trim().toLowerCase();
  if (!EMAIL.test(e)) return false;
  const dom = e.split('@')[1];
  return config.applyDomains.includes(dom);
}

const perIp = new Map();     // 防刷：每个 IP 每小时最多 5 次申请
setInterval(() => perIp.clear(), 3600e3).unref();

export function submit({ name, email, reason }, iph) {
  email = String(email || '').trim().toLowerCase().slice(0, 80);
  name = String(name || '').trim().slice(0, 30) || email.split('@')[0];     // 只填邮箱时，用 @ 前面的部分当名字
  reason = String(reason || '').trim().slice(0, 300);
  if (!email) return { error: '请填写公司邮箱' };
  if (!config.applyDomains.length) return { error: '管理员还没有开放申请' };
  if (!emailAllowed(email)) return { error: `只接受 ${config.applyDomains.map(d => '@' + d).join(' / ')} 邮箱申请` };
  const n = (perIp.get(iph) || 0) + 1; perIp.set(iph, n);
  if (n > 5) return { error: '提交太频繁，请一小时后再试' };
  // 同一邮箱已有待审核的申请：不重复建，提示用原来的查询链接
  const dup = db.prepare(`SELECT id FROM applications WHERE email = ? AND status = 'pending'`).get(email);
  if (dup) return { error: '这个邮箱已有一条待审核的申请，请用当时的查询链接查看进度；链接丢了请联系管理员' };
  const code = crypto.randomBytes(18).toString('base64url');
  db.prepare(`INSERT INTO applications (name, email, reason, created, code_hash, iph) VALUES (?,?,?,?,?,?)`)
    .run(name, email, reason || null, Date.now(), hash(code), iph);
  return { code };
}

// 申请人用查询码查看状态；已通过且未领取时，在这里生成 token 并只返回这一次
export function check(code) {
  const app = db.prepare('SELECT * FROM applications WHERE code_hash = ?').get(hash(String(code || '')));
  if (!app) return { error: '查询链接无效' };
  const base = { status: app.status, name: app.name, email: app.email, created: app.created, decided: app.decided };
  if (app.status !== 'approved') return base;
  db.exec('BEGIN');
  try {
    const cur = db.prepare('SELECT status FROM applications WHERE id = ?').get(app.id);
    if (cur.status !== 'approved') { db.exec('ROLLBACK'); return { ...base, status: cur.status }; }
    const t = createToken(app.name, app.email);
    db.prepare(`UPDATE applications SET status = 'issued', token_id = ? WHERE id = ?`).run(t.id, app.id);
    db.exec('COMMIT');
    return { ...base, status: 'issued_now', token: t.token, mcp: `${config.publicUrl}/mcp` };
  } catch (err) { db.exec('ROLLBACK'); throw err; }
}

/* ---------- 后台 ---------- */
export function list() {
  return db.prepare(`SELECT a.id, a.name, a.email, a.reason, a.created, a.status, a.decided, a.token_id,
      (SELECT COUNT(*) FROM tokens t WHERE t.email = a.email AND t.revoked = 0) active_tokens
    FROM applications a ORDER BY (a.status = 'pending') DESC, a.created DESC LIMIT 200`).all();
}
export function decide(id, ok) {
  const app = db.prepare('SELECT * FROM applications WHERE id = ?').get(id);
  if (!app) return { error: '申请不存在' };
  if (app.status !== 'pending') return { error: '这条申请已经处理过了' };
  if (ok && !emailAllowed(app.email)) return { error: '邮箱后缀不在允许范围内，不能通过' };
  db.prepare('UPDATE applications SET status = ?, decided = ? WHERE id = ?').run(ok ? 'approved' : 'rejected', Date.now(), id);
  // 以后接入发信服务时：在这里给 app.email 发审核结果（通过时可直接把领取链接或 token 发到公司邮箱）
  return { ok: true };
}
export const pendingCount = () => db.prepare(`SELECT COUNT(*) n FROM applications WHERE status = 'pending'`).get().n;
