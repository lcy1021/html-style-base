// 从仓库副本读取经验数据：data/patterns.js、data/designs.js、demos/
// 文件改了会自动重新读（git pull 后无需重启）
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { config } from './config.js';

let cache = { mtime: 0, patterns: [], designs: {}, byId: new Map() };

function loadWindowVar(file, name) {
  const code = fs.readFileSync(file, 'utf8');
  const ctx = { window: {} };
  vm.runInNewContext(code, ctx, { timeout: 2000 });
  return ctx.window[name];
}

export function content() {
  const pf = path.join(config.siteDir, 'data/patterns.js');
  const df = path.join(config.siteDir, 'data/designs.js');
  let mtime = 0;
  try { mtime = Math.max(fs.statSync(pf).mtimeMs, fs.existsSync(df) ? fs.statSync(df).mtimeMs : 0); } catch { return cache; }
  if (mtime === cache.mtime) return cache;
  try {
    const patterns = (loadWindowVar(pf, 'PATTERNS') || []).map((p, i) => ({ ...p, no: String(i + 1).padStart(2, '0') }));
    const designs = fs.existsSync(df) ? (loadWindowVar(df, 'DESIGNS') || {}) : {};
    cache = { mtime, patterns, designs, byId: new Map(patterns.map(p => [p.id, p])) };
    console.log(`[content] 已载入 ${patterns.length} 条经验，${Object.keys(designs).length} 份 DESIGN.md`);
  } catch (err) { console.error('[content] 读取失败，继续用上一版', err.message); }
  return cache;
}

export const viewUrl = id => `${config.siteUrl}view.html#${encodeURIComponent(id)}`;
export const fileUrl = rel => config.siteUrl + rel.replace(/^\//, '');

export function promptOf(md) {
  const m = (md || '').match(/```text\n([\s\S]*?)```/);
  return m ? m[1].trim() : '';
}

export function demoSource(p) {
  if (!p?.demo) return '';
  const f = path.resolve(config.siteDir, p.demo);
  if (!f.startsWith(path.join(config.siteDir, 'demos'))) return '';
  try { return fs.readFileSync(f, 'utf8'); } catch { return ''; }
}
export function siteFile(rel) {
  const f = path.resolve(config.siteDir, rel);
  if (!f.startsWith(config.siteDir)) return '';
  try { return fs.readFileSync(f, 'utf8'); } catch { return ''; }
}

/* ---------- 检索：中文按双字切分，英文按单词 ---------- */
function grams(s) {
  s = String(s || '').toLowerCase();
  const out = new Set();
  for (const w of s.match(/[a-z0-9]+/g) || []) if (w.length > 1) out.add(w);
  const zh = s.replace(/[^一-鿿]+/g, ' ').split(' ').filter(Boolean);
  for (const seg of zh) {
    if (seg.length === 1) out.add(seg);
    for (let i = 0; i < seg.length - 1; i++) out.add(seg.slice(i, i + 2));
  }
  return out;
}
const STOP = new Set(['一个', '怎么', '什么', '如何', '我想', '想要', '用什', '么形', '形式', '展示', '页面', '这个', '讲一', '一下']);

export function search(query, { category, limit = 8 } = {}) {
  const { patterns } = content();
  const q = [...grams(query)].filter(g => !STOP.has(g));
  const pool = patterns.filter(p => !category || p.category === category);
  if (!q.length) return pool.slice(0, limit).map(p => ({ p, score: 0 }));
  const W = [['title', 4], ['intent', 4], ['card', 3], ['tags', 3], ['when', 2], ['summary', 1.5], ['how', 1], ['pitfalls', 0.5]];
  return pool.map(p => {
    let score = 0;
    for (const [k, w] of W) {
      const v = Array.isArray(p[k]) ? p[k].join(' ') : p[k];
      const g = grams(v);
      for (const t of q) if (g.has(t)) score += w;
    }
    if (String(p.title).includes(String(query).trim())) score += 10;
    return { p, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, limit);
}
