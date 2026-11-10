# 可玩原型 — Style Reference

> 给一个具体任务，请听众在原型上操作，计数器记录点击次数；再换改版后对比。

**想说明：** 让听众亲手做一遍  
**分类：** 样式  
**Theme：** 深色  
**样例：** `demos/playable.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 路径和返回问题
- “说不清，点一下就懂”的体验差异

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Text 1 | `#F3F1FF` | `--fg` | 文字 |
| Text 2 | `#1D2129` | — | 文字 |
| Text 3 | `#9A95A8` | `--mut` | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Text 4 | `#86909C` | — | 文字 |
| Line 1 | `#2B2838` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 别讲了， |
| 30px | 400 | 54px | normal | `span` | 0 |
| 20px | 500 | 36px | normal | `b` | 任务：看完 0042 后，回到原 |
| 15px | 400 | 27px | normal | `div.task` | 先用“现状”试一遍，再切换到“改 |
| 14px | 700 | normal | normal | `h5, span` | 订单列表 · 第页 |
| 14px | 400 | normal | normal | `button` | 订单 0042 |
| 12px | 400 | 21.6px | normal | `div` | 点击次数 |
| 12px | 400 | normal | normal | `div.hint` | 可以直接点 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 28px | 1 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.task` — 384×209 @ (34, 130)，block
  - `div.ph` — 300×520 @ (826, 110)，block，底色 `#FFFFFF`，圆角 28px
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 请一位听众上来：找到“订单 0042”，看完回到列表第 3 页
2. 对比：返回后停在原位，点击数少一半

## Do's and Don'ts

### Do

- 任务写成一句话
- 只做任务需要的路径
- 现状和改版用同一个任务

### Don't

- 原型做太全，现场容易迷路
- 没有上线结果时不要说“效率提升 X%”

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#FFFFFF`（面 / 区块），`#F3F1FF`（文字），`#1D2129`（文字），`#9A95A8`（文字），`#FFB547`（文字）

```text
做一页「可玩原型」形式的 HTML 演示：让听众亲手做一遍。
适用：路径和返回问题；“说不清，点一下就懂”的体验差异。
做法：任务写成一句话；只做任务需要的路径；现状和改版用同一个任务。
避免：原型做太全，现场容易迷路；没有上线结果时不要说“效率提升 X%”。
步进：共 2 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `rehearsal`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#FFFFFF;
  --text-1:#F3F1FF;
  --text-2:#1D2129;
  --text-3:#9A95A8;
  --text-4:#FFB547;
  --text-5:#B9A8FF;
  --text-6:#86909C;
  --line-1:#2B2838;
  --radius:28px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/playable.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 M
