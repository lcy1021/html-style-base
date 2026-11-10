// 远程 MCP：无状态 Streamable HTTP，每个请求新建一个 server 实例
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { content, search, viewUrl, fileUrl, promptOf, demoSource, siteFile } from './content.js';
import { logEvent } from './db.js';

const text = t => ({ content: [{ type: 'text', text: t }] });
const notFound = id => ({ ...text(`没有找到 id 为「${id}」的经验。先用 search_styles 或 recommend_form 查 id。`), isError: true });
const line = p => `- **${p.title}**（id: \`${p.id}\`，${p.category}）— 想说明：${p.intent}${p.demo ? `\n  样例：${viewUrl(p.id)}` : ''}`;

function styleDoc(p, design) {
  const li = a => (a || []).map(x => `- ${x}`).join('\n');
  return [
    `# ${p.title}`,
    `**分类：** ${p.category}　**想说明：** ${p.intent}`,
    p.summary,
    p.demo ? `**在线样例：** ${viewUrl(p.id)}　**样例源码：** ${fileUrl(p.demo)}` : '',
    p.url ? `**原始参考：** ${p.url}` : '',
    p.when?.length ? `## 适合什么时候用\n${li(p.when)}` : '',
    p.how?.length ? `## 怎么做\n${li(p.how)}` : '',
    p.pitfalls?.length ? `## 踩过的坑\n${li(p.pitfalls)}` : '',
    p.related?.length ? `## 相关\n${p.related.map(r => `- \`${r}\``).join('\n')}` : '',
    design ? `---\n\n${design}` : '',
  ].filter(Boolean).join('\n\n');
}

export function buildServer(ctx) {
  const server = new McpServer(
    { name: 'html-style-base', version: '0.1.0' },
    { instructions: '设计经验库：做 HTML 演示 / 分享页 / 案例讲解页时，先用 recommend_form 按“想说明什么”选展示形式，再用 get_style / get_design_md 拿规格，生成后用 list_principles 自检。' },
  );
  const track = (tool, extra = {}) => logEvent({ type: 'mcp_call', source: 'mcp', tool, visitor: ctx.visitor, client: ctx.client, iph: ctx.iph, ...extra });
  const RO = { readOnlyHint: true, openWorldHint: false };

  server.registerTool('recommend_form', {
    title: '按想说明什么推荐展示形式',
    description: '输入你想在页面上说明的事情（自然语言），返回最合适的展示形式（样式）和相关讲法（方法），附理由和 id。',
    inputSchema: { intent: z.string().min(1).describe('想说明什么，例如“改版前后对比”“多条证据拼出结论”'), limit: z.number().int().min(1).max(10).optional() },
    annotations: RO,
  }, async ({ intent, limit = 5 }) => {
    const styles = search(intent, { category: '样式', limit });
    const methods = search(intent, { category: '方法', limit: 2 });
    track('recommend_form', { query: intent.slice(0, 200), hits: styles.length, pattern: styles[0]?.p.id });
    if (!styles.length && !methods.length) return text(`没有匹配「${intent}」的形式。可以换个说法，或用 search_styles 浏览全部。`);
    const out = [];
    if (styles.length) out.push('## 推荐的展示形式\n' + styles.map(({ p }, i) => `${i + 1}. ${line(p).slice(2)}\n   ${p.summary}${p.when?.length ? `\n   适用：${p.when.slice(0, 2).join('；')}` : ''}`).join('\n'));
    if (methods.length) out.push('## 相关讲法\n' + methods.map(({ p }) => line(p)).join('\n'));
    out.push('下一步：用 get_style 或 get_design_md 拿到选中形式的完整规格。');
    return text(out.join('\n\n'));
  });

  server.registerTool('search_styles', {
    title: '搜索经验库',
    description: '按关键词搜索经验（样式 / 方法 / 规范 / 参考 / 工具与交付）。query 留空则列出全部。',
    inputSchema: { query: z.string().optional().describe('关键词'), category: z.enum(['样式', '方法', '规范', '参考', '工具与交付']).optional(), limit: z.number().int().min(1).max(80).optional() },
    annotations: RO,
  }, async ({ query = '', category, limit = 20 }) => {
    const r = search(query, { category, limit });
    if (query) track('search_styles', { query: query.slice(0, 200), hits: r.length });
    else track('search_styles', { hits: r.length });
    if (!r.length) return text(`没有找到和「${query}」相关的经验。`);
    return text(r.map(({ p }) => line(p)).join('\n'));
  });

  server.registerTool('get_style', {
    title: '获取一条经验的完整内容',
    description: '返回说明、适用场景、做法、踩坑、样例地址和 DESIGN.md 全文。',
    inputSchema: { id: z.string().describe('经验 id') },
    annotations: RO,
  }, async ({ id }) => {
    const { byId, designs } = content(); const p = byId.get(id);
    track('get_style', { pattern: p ? id : null, hits: p ? 1 : 0 });
    return p ? text(styleDoc(p, designs[id])) : notFound(id);
  });

  server.registerTool('get_design_md', {
    title: '获取 DESIGN.md',
    description: '返回某条经验的 DESIGN.md（颜色、字级、间距、组件、步骤脚本、Do/Don\'t、提示词），可直接交给 AI 生成同款。',
    inputSchema: { id: z.string() },
    annotations: RO,
  }, async ({ id }) => {
    const { byId, designs } = content();
    track('get_design_md', { pattern: byId.has(id) ? id : null, hits: designs[id] ? 1 : 0 });
    if (!byId.has(id)) return notFound(id);
    return designs[id] ? text(designs[id]) : text('这一条还没有 DESIGN.md，可以用 get_style 看文字说明。');
  });

  server.registerTool('get_prompt', {
    title: '获取给 AI 的提示词',
    description: '只返回 DESIGN.md 里“给 AI 的提示词”那一段。',
    inputSchema: { id: z.string() },
    annotations: RO,
  }, async ({ id }) => {
    const { byId, designs } = content(); const pr = promptOf(designs[id]);
    track('get_prompt', { pattern: byId.has(id) ? id : null, hits: pr ? 1 : 0 });
    if (!byId.has(id)) return notFound(id);
    return text(pr || '这一条没有单独的提示词，可以用 get_design_md 拿完整规格。');
  });

  server.registerTool('get_demo_source', {
    title: '获取样例 HTML 源码',
    description: '返回样例页面的 HTML。include_engine=true 时附上共用的步进引擎 demo.js 和样式 demo.css。',
    inputSchema: { id: z.string(), include_engine: z.boolean().optional() },
    annotations: RO,
  }, async ({ id, include_engine = false }) => {
    const { byId } = content(); const p = byId.get(id); const src = demoSource(p);
    track('get_demo_source', { pattern: p ? id : null, hits: src ? 1 : 0 });
    if (!p) return notFound(id);
    if (!src) return text('这一条没有样例。');
    const parts = [`<!-- ${p.demo} -->\n${src}`];
    if (include_engine) for (const f of ['demos/demo.js', 'demos/demo.css', 'demos/scroll.js']) { const s = siteFile(f); if (s && src.includes(f.split('/')[1])) parts.push(`<!-- ${f} -->\n${s}`); }
    return text(parts.join('\n\n'));
  });

  server.registerTool('list_principles', {
    title: '列出通用规范',
    description: '列出“规范”类经验（过渡、文字层级、内容可信等），生成页面后用来自检。',
    inputSchema: {},
    annotations: RO,
  }, async () => {
    const { patterns } = content(); const r = patterns.filter(p => p.category === '规范');
    track('list_principles', { hits: r.length });
    return text(r.map(p => `## ${p.title}（\`${p.id}\`）\n${p.summary}\n${(p.how || []).map(x => `- ${x}`).join('\n')}${p.pitfalls?.length ? `\n\n踩坑：\n${p.pitfalls.map(x => `- ${x}`).join('\n')}` : ''}`).join('\n\n'));
  });

  server.registerResource('design-md', new ResourceTemplate('style://{id}/design.md', {
    list: async () => {
      const { patterns, designs } = content();
      return { resources: patterns.filter(p => designs[p.id]).map(p => ({ uri: `style://${p.id}/design.md`, name: `${p.title} · DESIGN.md`, mimeType: 'text/markdown' })) };
    },
  }), { title: 'DESIGN.md', description: '每条经验的 DESIGN.md', mimeType: 'text/markdown' }, async (uri, { id }) => {
    const { designs, byId } = content();
    track('resource_design_md', { pattern: byId.has(id) ? id : null, hits: designs[id] ? 1 : 0 });
    return { contents: [{ uri: uri.href, mimeType: 'text/markdown', text: designs[id] || '没有这条 DESIGN.md' }] };
  });

  server.registerPrompt('make_presentation', {
    title: '按经验库做一个分享页',
    description: '先问想说明什么 → 选形式 → 生成 → 按规范自检',
    argsSchema: { topic: z.string().describe('分享主题'), points: z.string().optional().describe('想说明的几个观点，可选') },
  }, ({ topic, points }) => {
    track('prompt_make_presentation');
    return { messages: [{ role: 'user', content: { type: 'text', text:
`我要做一个关于「${topic}」的 HTML 分享页。${points ? `\n想说明的观点：${points}` : ''}
请按设计经验库的流程来：
1. 先把每一屏“想说明什么”列出来（一屏一个观点），不确定的先问我；
2. 每一屏用 recommend_form 选展示形式，说明为什么选它；
3. 用 get_design_md 拿规格，按规格生成页面（无外部依赖、键盘可操作、尊重 prefers-reduced-motion）；
4. 用 list_principles 逐条自检，列出不符合的地方再修改；
5. 不编造数据和案例，示意内容要标注。` } }] };
  });

  return server;
}

export async function handleMcp(req, res, body, ctx) {
  const server = buildServer(ctx);
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  res.on('close', () => { transport.close(); server.close(); });
  await server.connect(transport);
  await transport.handleRequest(req, res, body);
}
