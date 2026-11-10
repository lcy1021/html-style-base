// SQLite（Node 内置 node:sqlite，无需编译依赖）
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { config } from './config.js';

fs.mkdirSync(config.dataDir, { recursive: true });
fs.mkdirSync(path.join(config.dataDir, 'backup'), { recursive: true });

export const db = new DatabaseSync(path.join(config.dataDir, 'hsb.db'));
db.exec(`
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY,
  ts INTEGER NOT NULL,          -- 毫秒时间戳
  day TEXT NOT NULL,            -- 北京时间日期 YYYY-MM-DD
  type TEXT NOT NULL,           -- page_view / design_open / md_download / md_copy / prompt_copy / search / mcp_init / mcp_call
  source TEXT NOT NULL,         -- web / mcp
  pattern TEXT,                 -- 经验 id
  visitor TEXT,                 -- 网页：匿名访客 id；MCP：t<token id>
  tool TEXT, client TEXT,       -- MCP 工具名、客户端名
  query TEXT, hits INTEGER,     -- 搜索词、结果数
  page TEXT, device TEXT,       -- home / view，desktop / mobile
  iph TEXT                      -- 当天加盐的 IP 哈希（只用于去重防刷）
);
CREATE INDEX IF NOT EXISTS ev_day ON events(day, type);
CREATE INDEX IF NOT EXISTS ev_pat ON events(pattern, type);
CREATE TABLE IF NOT EXISTS tokens (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,           -- 你给的备注名
  hash TEXT NOT NULL UNIQUE,    -- token 的 sha256，原文不落库
  prefix TEXT NOT NULL,         -- 前几位，方便辨认
  created INTEGER NOT NULL,
  last_used INTEGER,
  last_client TEXT,
  revoked INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  reason TEXT,
  created INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',   -- pending 待审核 / approved 已通过未领取 / issued 已领取 / rejected 已拒绝
  code_hash TEXT NOT NULL UNIQUE,           -- 查询码的哈希，原文只给申请人
  decided INTEGER,
  token_id INTEGER,
  iph TEXT
);
`);
try { db.exec('ALTER TABLE tokens ADD COLUMN email TEXT'); } catch { /* 已有这一列 */ }

export const dayOf = ts => new Date(ts + 8 * 3600e3).toISOString().slice(0, 10);   // 北京时间

const insertEv = db.prepare(`INSERT INTO events (ts, day, type, source, pattern, visitor, tool, client, query, hits, page, device, iph)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`);
export function logEvent(e) {
  const ts = Date.now();
  try {
    insertEv.run(ts, dayOf(ts), e.type, e.source, e.pattern ?? null, e.visitor ?? null, e.tool ?? null, e.client ?? null,
      e.query ?? null, e.hits ?? null, e.page ?? null, e.device ?? null, e.iph ?? null);
  } catch (err) { console.error('[db] 写入事件失败', err.message); }
}

/* ---------- token ---------- */
export const hashToken = t => crypto.createHash('sha256').update(t).digest('hex');
export function createToken(name, email = null) {
  const token = 'hsb_' + crypto.randomBytes(16).toString('hex');
  const r = db.prepare('INSERT INTO tokens (name, hash, prefix, created, email) VALUES (?,?,?,?,?)').run(name, hashToken(token), token.slice(0, 8), Date.now(), email);
  return { id: Number(r.lastInsertRowid), token };
}
const findTok = db.prepare('SELECT * FROM tokens WHERE hash = ? AND revoked = 0');
const touchTok = db.prepare('UPDATE tokens SET last_used = ?, last_client = COALESCE(?, last_client) WHERE id = ?');
export function checkToken(token, client) {
  if (!token) return null;
  const row = findTok.get(hashToken(token));
  if (row) touchTok.run(Date.now(), client ?? null, row.id);
  return row || null;
}

/* ---------- 每日备份，保留 N 天 ---------- */
export function backup() {
  const dir = path.join(config.dataDir, 'backup');
  const file = path.join(dir, `hsb-${dayOf(Date.now())}.db`);
  try {
    if (!fs.existsSync(file)) db.exec(`VACUUM INTO '${file.replace(/'/g, "''")}'`);
    const cut = Date.now() - config.backupKeepDays * 86400e3;
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      if (fs.statSync(p).mtimeMs < cut) fs.unlinkSync(p);
    }
  } catch (err) { console.error('[backup] 失败', err.message); }
}
