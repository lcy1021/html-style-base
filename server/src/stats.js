// 后台用的统计查询
import { db, dayOf } from './db.js';
import { content } from './content.js';

export function range(url) {
  const today = dayOf(Date.now());
  const to = /^\d{4}-\d{2}-\d{2}$/.test(url.searchParams.get('to') || '') ? url.searchParams.get('to') : today;
  let from = url.searchParams.get('from');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from || '')) from = dayOf(Date.parse(to + 'T00:00:00+08:00') - 29 * 86400e3);
  const days = Math.round((Date.parse(to) - Date.parse(from)) / 86400e3) + 1;
  const prevTo = dayOf(Date.parse(from + 'T00:00:00+08:00') - 86400e3);
  const prevFrom = dayOf(Date.parse(prevTo + 'T00:00:00+08:00') - (days - 1) * 86400e3);
  return { from, to, prevFrom, prevTo, days };
}

const one = (sql, ...a) => db.prepare(sql).get(...a);
const all = (sql, ...a) => db.prepare(sql).all(...a);

function cards(from, to) {
  const c = type => one(`SELECT COUNT(*) n FROM events WHERE day BETWEEN ? AND ? AND type = ?`, from, to, type).n;
  return {
    pv: c('page_view'),
    uv: one(`SELECT COUNT(DISTINCT visitor) n FROM events WHERE day BETWEEN ? AND ? AND source = 'web'`, from, to).n,
    detail: one(`SELECT COUNT(*) n FROM events WHERE day BETWEEN ? AND ? AND type = 'page_view' AND pattern IS NOT NULL`, from, to).n,
    md_download: c('md_download'),
    md_copy: c('md_copy'),
    prompt_copy: c('prompt_copy'),
    mcp_calls: c('mcp_call'),
    mcp_users: one(`SELECT COUNT(DISTINCT visitor) n FROM events WHERE day BETWEEN ? AND ? AND source = 'mcp' AND visitor IS NOT NULL`, from, to).n,
  };
}

export function summary(r) {
  return { range: r, cur: cards(r.from, r.to), prev: cards(r.prevFrom, r.prevTo),
    total: { patterns: content().patterns.length, tokens: one(`SELECT COUNT(*) n FROM tokens WHERE revoked = 0`).n } };
}

export function trend(r) {
  const rows = all(`SELECT day,
      SUM(type = 'page_view') pv,
      COUNT(DISTINCT CASE WHEN source = 'web' THEN visitor END) uv,
      SUM(type IN ('md_download', 'md_copy', 'prompt_copy')) take,
      SUM(type = 'mcp_call') mcp
    FROM events WHERE day BETWEEN ? AND ? GROUP BY day`, r.from, r.to);
  const by = Object.fromEntries(rows.map(x => [x.day, x]));
  const out = [];
  for (let i = 0; i < r.days; i++) {
    const d = dayOf(Date.parse(r.from + 'T00:00:00+08:00') + i * 86400e3);
    const x = by[d] || {}; out.push({ day: d, pv: x.pv || 0, uv: x.uv || 0, take: x.take || 0, mcp: x.mcp || 0 });
  }
  return out;
}

export function patterns(r) {
  const rows = all(`SELECT pattern,
      SUM(type = 'page_view') views,
      COUNT(DISTINCT CASE WHEN type = 'page_view' THEN visitor END) uv,
      SUM(type = 'md_download') md_download,
      SUM(type = 'md_copy') md_copy,
      SUM(type = 'prompt_copy') prompt_copy,
      SUM(type = 'mcp_call') mcp
    FROM events WHERE day BETWEEN ? AND ? AND pattern IS NOT NULL GROUP BY pattern`, r.from, r.to);
  const by = Object.fromEntries(rows.map(x => [x.pattern, x]));
  return content().patterns.map(p => {
    const x = by[p.id] || {};
    const views = x.views || 0, take = (x.md_download || 0) + (x.md_copy || 0) + (x.prompt_copy || 0);
    return { id: p.id, no: p.no, title: p.title, category: p.category, views, uv: x.uv || 0,
      md_download: x.md_download || 0, md_copy: x.md_copy || 0, prompt_copy: x.prompt_copy || 0, mcp: x.mcp || 0,
      rate: views ? take / views : null };
  });
}

export function mcp(r) {
  return {
    tools: all(`SELECT tool, COUNT(*) n FROM events WHERE day BETWEEN ? AND ? AND type = 'mcp_call' GROUP BY tool ORDER BY n DESC`, r.from, r.to),
    clients: all(`SELECT COALESCE(client, '未知') client, COUNT(*) n FROM events WHERE day BETWEEN ? AND ? AND type = 'mcp_call' GROUP BY 1 ORDER BY n DESC`, r.from, r.to),
    tokens: all(`SELECT t.id, t.name, t.email, t.prefix, t.created, t.last_used, t.last_client, t.revoked,
        (SELECT COUNT(*) FROM events e WHERE e.visitor = 't' || t.id AND e.type = 'mcp_call' AND e.day BETWEEN ? AND ?) calls
      FROM tokens t ORDER BY t.revoked, t.created DESC`, r.from, r.to),
  };
}

export function searches(r) {
  return {
    top: all(`SELECT query, source, COUNT(*) n, MIN(hits) min_hits FROM events
      WHERE day BETWEEN ? AND ? AND query IS NOT NULL AND query <> '' AND type IN ('search', 'mcp_call') GROUP BY query, source ORDER BY n DESC LIMIT 30`, r.from, r.to),
    zero: all(`SELECT query, source, COUNT(*) n, MAX(ts) last FROM events
      WHERE day BETWEEN ? AND ? AND query IS NOT NULL AND query <> '' AND hits = 0 GROUP BY query, source ORDER BY n DESC LIMIT 30`, r.from, r.to),
  };
}

export function csv(r) {
  const rows = all(`SELECT ts, day, type, source, pattern, visitor, tool, client, query, hits, page, device FROM events WHERE day BETWEEN ? AND ? ORDER BY ts`, r.from, r.to);
  const cols = ['time', 'day', 'type', 'source', 'pattern', 'visitor', 'tool', 'client', 'query', 'hits', 'page', 'device'];
  const q = v => v == null ? '' : /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v);
  return '﻿' + [cols.join(','), ...rows.map(x => [new Date(x.ts + 8 * 3600e3).toISOString().replace('T', ' ').slice(0, 19), x.day, x.type, x.source, x.pattern, x.visitor, x.tool, x.client, x.query, x.hits, x.page, x.device].map(q).join(','))].join('\n');
}
