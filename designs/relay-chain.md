# 传话链 — Style Reference

> 人物一字排开，对话框依次移动；角落标出这句话“现在停在哪一层”。

**想说明：** 一句话经过多人转述后怎样变形  
**分类：** 案例展示  
**Theme：** 浅色  
**样例：** `demos/relay-chain.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 需求转述、信息传递
- 多角色交接中信息的变化

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F4F3EF` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Accent · 紫 | `#6A4CF0` | — | 面 / 区块 |
| Text 1 | `#1D2129` | `--fg` | 文字 |
| Accent · 红 | `#C2412D` | — | 文字 |
| Accent · 红 | `#B5482B` | — | 文字 |
| Accent · 紫 | `#5B3FD6` | — | 文字 |
| Text 2 | `#A39D90` | — | 文字 |
| Text 3 | `#6B7280` | `--mut` | 文字 |
| Line 1 | `#DDD8CD` | — | 描边 |
| Line 2 | `#D8D3C8` | — | 描边 |
| Line 3 | `#CBC5B8` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 每转一手，说法就可能 |
| 22px | 400 | normal | normal | `i` | 🧑‍💼 |
| 15px | 400 | 23.25px | normal | `div.say` | “加一个拆分选项？” |
| 13px | 700 | normal | normal | `b` | 一线用户 |
| 12px | 500 | normal | normal | `b` | 任务 |
| 12px | 600 | 18.6px | normal | `small` | 说的是任务 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `p.note` | 内容为示意 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 8px | 4 |
| 50% | 4 |
| 14px | 1 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div#lad.lad` — 202×27 @ (1044, 30)，flex
  - `div.chain` — 1212×110 @ (34, 418)，block
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 现场：说的是正在做的事（任务）
2. 转一手：条件丢了，只剩评价
3. 再转一手：变成了一个做法（方案）
4. 到你手上：已经是一个界面交互

## Do's and Don'ts

### Do

- 每个人物说一句真实或示意的原话
- 用层级指示（任务 / 评价 / 方案 / 界面）代替“失真程度”
- 最后一步把头尾两句并排对照

### Don't

- 不要画一条随手数上涨的“失真条”：失不失真看停在哪一层，不看转了几手
- 中间几手如果是示意，页面注明

## Agent Prompt Guide

**颜色速查：** `#F4F3EF`（背景 / 面），`#FFFFFF`（面 / 区块），`#6A4CF0`（面 / 区块），`#1D2129`（文字），`#C2412D`（文字），`#B5482B`（文字）

```text
做一页「传话链」形式的 HTML 演示：一句话经过多人转述后怎样变形。
适用：需求转述、信息传递；多角色交接中信息的变化。
做法：每个人物说一句真实或示意的原话；用层级指示（任务 / 评价 / 方案 / 界面）代替“失真程度”；最后一步把头尾两句并排对照。
避免：不要画一条随手数上涨的“失真条”：失不失真看停在哪一层，不看转了几手；中间几手如果是示意，页面注明。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F4F3EF;
  --surface-1:#FFFFFF;
  --surface-2:#6A4CF0;
  --text-1:#1D2129;
  --text-2:#C2412D;
  --text-3:#B5482B;
  --text-4:#5B3FD6;
  --text-5:#A39D90;
  --text-6:#6B7280;
  --line-1:#DDD8CD;
  --line-2:#D8D3C8;
  --line-3:#CBC5B8;
  --radius:8px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/relay-chain.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：UED 需求分析分享（2.1）
