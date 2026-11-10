# 经验库服务端

一个服务做三件事：

| 路径 | 作用 |
|---|---|
| `/e` | 接收网页埋点（浏览、DESIGN.md 下载 / 复制、提示词复制、搜索词） |
| `/mcp` | 远程 MCP（Streamable HTTP，无状态），同学用个人 token 接入 |
| `/admin` | 数据后台，只有管理员能登录（GitHub 白名单或独立密码） |
| `/health` | 健康检查 |
| `/` | 跳转到经验库网页 |

技术：Node 22 内置 SQLite（`node:sqlite`），没有需要编译的依赖；Caddy 自动 HTTPS；数据库每天自动备份到 `data/backup/`，保留 14 天。

## 部署

前提：域名已解析到服务器，80 / 443 端口已开放。

```bash
ssh root@服务器IP
curl -fsSL https://raw.githubusercontent.com/lcy1021/html-style-base/main/server/install.sh | bash -s -- fineuedesign.com
```

脚本会装 Docker、把仓库拉到 `/opt/html-style-base`、生成 `.env`（含随机的会话密钥和**后台临时密码**，会打印出来）、启动三个容器：

- `app`：埋点 / MCP / 后台
- `caddy`：HTTPS 证书和反向代理
- `sync`：每 5 分钟 `git pull` 一次，经验内容自动更新，不用登录服务器

### 改了服务端代码之后

```bash
cd /opt/html-style-base/server && git pull && docker compose up -d --build
```

### 配置 GitHub 登录（推荐）

1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
   - Homepage URL：`https://fineuedesign.com`
   - Authorization callback URL：`https://fineuedesign.com/admin/callback`
2. 把 Client ID / Client Secret 填进 `/opt/html-style-base/server/.env` 的 `GITHUB_CLIENT_ID`、`GITHUB_CLIENT_SECRET`
3. 可以把 `ADMIN_PASSWORD` 删掉，只留 GitHub 登录
4. `docker compose up -d`

只有 `ADMIN_GITHUB_LOGINS` 里的账号（默认 `lcy1021`）能进后台。

## 给同学接入 MCP

后台「MCP」区域填备注名 → 生成 token，页面会给出现成的配置，复制发给对方：

```bash
# Claude Code
claude mcp add --transport http style-base https://fineuedesign.com/mcp \
  --header "Authorization: Bearer hsb_xxx"
```

```json
// Cursor 等支持 mcp.json 的客户端
{ "mcpServers": { "style-base": { "url": "https://fineuedesign.com/mcp",
    "headers": { "Authorization": "Bearer hsb_xxx" } } } }
```

token 只显示一次；丢了就停用旧的、生成新的。停用后对方立刻连不上。

### MCP 提供的能力

| 工具 | 作用 |
|---|---|
| `recommend_form` | 输入“想说明什么”，推荐展示形式和相关讲法 |
| `search_styles` | 按关键词 / 分类搜索全部经验 |
| `get_style` | 一条经验的完整内容 + DESIGN.md |
| `get_design_md` | 只要 DESIGN.md |
| `get_prompt` | 只要“给 AI 的提示词” |
| `get_demo_source` | 样例 HTML 源码（可附 demo.js / demo.css） |
| `list_principles` | “规范”类经验，生成后自检用 |

另有资源 `style://{id}/design.md` 和提示词模板 `make_presentation`。

## 统计口径

- 网页访客是浏览器本地生成的随机 id（`localStorage`），不含个人信息；不接第三方统计；浏览器开了“请勿跟踪”就不发送。
- IP 只存当天加盐的哈希，用来去重和防刷，第二天就对不上了。
- 同一访客 10 秒内重复打开同一页只记一次浏览。
- MCP 的“使用人数”按 token 计。
- 转化率 =（下载 + 复制全文 + 复制提示词）÷ 浏览。

## 本地开发

```bash
cd server && npm install
npm run dev          # http://localhost:8787/admin ，密码 dev，MCP 不需要 token
# 另开一个终端，在仓库根目录：python3 -m http.server 8000
```

网页埋点默认发到 `https://fineuedesign.com/e`；本地调试时在页面加载前设置 `window.HSB_ENDPOINT = 'http://localhost:8787/e'`，设为空字符串则关闭统计。
