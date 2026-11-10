// 所有配置都来自环境变量（部署时写在 server/.env 里）
import path from 'node:path';

const env = process.env;
const list = v => (v || '').split(',').map(s => s.trim()).filter(Boolean);

export const config = {
  port: +(env.PORT || 8787),
  // 经验库仓库的本地副本（读 data/patterns.js、data/designs.js、demos/）
  siteDir: path.resolve(env.SITE_DIR || '/site'),
  // 数据库与备份目录
  dataDir: path.resolve(env.DATA_DIR || '/data'),
  // 经验库网页地址（MCP 返回的链接、访问根路径时跳转）
  siteUrl: (env.SITE_URL || (env.DOMAIN ? `https://${env.DOMAIN}/` : 'https://lcy1021.github.io/html-style-base/')).replace(/\/?$/, '/'),
  // 允许发送埋点的网页来源
  allowedOrigins: list(env.ALLOWED_ORIGINS || 'https://lcy1021.github.io,http://localhost:8000,http://127.0.0.1:8000'),
  // 后台登录：GitHub OAuth（推荐）或独立密码（备用）
  github: {
    clientId: env.GITHUB_CLIENT_ID || '',
    clientSecret: env.GITHUB_CLIENT_SECRET || '',
    admins: list(env.ADMIN_GITHUB_LOGINS || 'lcy1021').map(s => s.toLowerCase()),
  },
  adminPassword: env.ADMIN_PASSWORD || '',
  sessionSecret: env.SESSION_SECRET || '',
  cookieSecure: env.COOKIE_SECURE !== '0',
  publicUrl: (env.PUBLIC_URL || (env.DOMAIN ? `https://${env.DOMAIN}` : `http://localhost:${env.PORT || 8787}`)).replace(/\/$/, ''),
  // MCP 是否必须带 token（默认必须）
  mcpRequireToken: env.MCP_REQUIRE_TOKEN !== '0',
  backupKeepDays: +(env.BACKUP_KEEP_DAYS || 14),
};

if (!config.sessionSecret || config.sessionSecret.length < 16) {
  console.error('[config] SESSION_SECRET 未设置或太短（至少 16 位），后台无法登录。');
}
if (!config.github.clientId && !config.adminPassword) {
  console.error('[config] 没有配置 GitHub 登录，也没有 ADMIN_PASSWORD，后台无法登录。');
}
