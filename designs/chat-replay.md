# 对话回放 — Style Reference

> 群聊逐条回放，关键句高亮，右侧同步记下笔记和改写后的诉求。

**想说明：** 需求怎样在对话里被问清楚  
**分类：** 样式  
**Theme：** 深色  
**样例：** `demos/chat-replay.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 讲追问方法
- 沟通推进的示范

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#F2F3F5` | — | 面 / 区块 |
| Accent · 橙 | `#FFB547 / 8%` | `--amber` | 面 / 区块 |
| Accent · 紫 | `#5B4BFF` | — | 面 / 区块 |
| Surface 2 | `#FFFFFF` | — | 面 / 区块 |
| Accent · 橙 | `#F77234` | — | 面 / 区块 |
| Text 1 | `#F3F1FF` | `--fg` | 文字 |
| Text 2 | `#1D2129` | — | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 需求怎么在对话里 |
| 14px | 400 | 22.4px | normal | `p, div.on` | 客户要导出时按部门拆文件。 |
| 12px | 400 | normal | normal | `i` | 产 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示范 · 不是会议原话 |
| 11px | 400 | 17.6px | normal | `small` | 笔记 · 关键条件 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 50% | 4 |
| 10px | 4 |
| 14px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgb(255, 181, 71) 0px 0px 0px 2px` | 1 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.chat` — 666×524 @ (34, 120)，flex，底色 `#F2F3F5`，圆角 14px
  - `div.notes` — 435×152 @ (811, 130)，block

## 步骤脚本

1. 群聊逐条回放
2. 追问：拆完之后要做什么
3. 关键句出现，右侧同步记笔记
4. 结论：真正的诉求

## Do's and Don'ts

### Do

- 只放推动理解的几句
- 关键句高亮，笔记同步出现
- 页面标明“示范，不是会议原话”

### Don't

- 把示范对话当成真实记录
- 对话太长，听众跟不上

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#F2F3F5`（面 / 区块），`#FFB547 / 8%`（面 / 区块），`#5B4BFF`（面 / 区块），`#FFFFFF`（面 / 区块），`#F77234`（面 / 区块）

```text
做一页「对话回放」形式的 HTML 演示：需求怎样在对话里被问清楚。
适用：讲追问方法；沟通推进的示范。
做法：只放推动理解的几句；关键句高亮，笔记同步出现；页面标明“示范，不是会议原话”。
避免：把示范对话当成真实记录；对话太长，听众跟不上。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `case-intro`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#F2F3F5;
  --surface-2:rgba(255,181,71,0.08);
  --surface-3:#5B4BFF;
  --surface-4:#FFFFFF;
  --surface-5:#F77234;
  --text-1:#F3F1FF;
  --text-2:#1D2129;
  --text-3:#FFB547;
  --text-4:#B9A8FF;
  --radius:50%;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/chat-replay.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 G
