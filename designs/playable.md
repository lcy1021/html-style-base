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
| Accent · 紫 | `#120C2C` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Accent · 紫 | `#1D1546` | — | 面 / 区块 |
| Surface 2 | `#F2F3F5` | — | 面 / 区块 |
| Accent · 品红 | `#FF4FD8` | — | 面 / 区块 |
| Accent · 蓝 | `#165DFF` | — | 面 / 区块 |
| Accent · 紫 | `#9B8FD0` | `--mut` | 文字 |
| Text 1 | `#F3EEFF` | `--fg` | 文字 |
| Accent · 绿 | `#B6FF3B` | — | 文字 |
| Text 2 | `#86909C` | — | 文字 |
| Text 3 | `#1D2129` | — | 文字 |
| Line 1 | `#FFFFFF / 8%` | — | 描边 |
| Line 2 | `#DCDFE6` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 64px | 700 | 73.6px | normal | `h1, em` | 别看我们说， |
| 30px | 800 | normal | normal | `b.mono` | 0.0s |
| 18px | 700 | normal | normal | `h3` | 指标管理 |
| 16px | 400 | 28.8px | normal | `p` | 这是“创建计算指标”流程改版前后 |
| 15px | 400 | normal | normal | `div.mission` | 🎯 任务：创建指标 |
| 15px | 700 | normal | normal | `b, button.old, button.new` | 「华东区毛利率」 |
| 13px | 400 | normal | 3.9px | `small.mono` | PLAYABLE CASE ·  |
| 13px | 400 | normal | normal | `div.s, button.btn` | 共 128 个指标 |
| 12px | 400 | normal | normal | `span` | app.example/metr |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 12px | 6 |
| 50% | 3 |
| 8px | 3 |
| 16px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(182, 255, 59, 0.2) 0px 0px 24px 0px` | 1 |
| `rgba(255, 79, 216, 0.4) 0px 0px 24px 0px` | 1 |
| `rgb(42, 32, 96) 0px 0px 0px 6px, rgb(0, 0, 0) 0px 40px 80px -30px` | 1 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `section.top` — 1280×385 @ (0, 0)，block
  - `section.game` — 1100×608 @ (90, 403)，block

## 步骤脚本

1. 别看我们说， 你自己试试。
2. 指标管理

## Do's and Don'ts

### Do

- 任务写成一句话
- 只做任务需要的路径
- 现状和改版用同一个任务

### Don't

- 原型做太全，现场容易迷路
- 没有上线结果时不要说“效率提升 X%”

## Agent Prompt Guide

**颜色速查：** `#120C2C`（背景 / 面），`#FFFFFF`（面 / 区块），`#1D1546`（面 / 区块），`#F2F3F5`（面 / 区块），`#FF4FD8`（面 / 区块），`#165DFF`（面 / 区块）

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
  --canvas:#120C2C;
  --surface-1:#FFFFFF;
  --surface-2:#1D1546;
  --surface-3:#F2F3F5;
  --surface-4:#FF4FD8;
  --surface-5:#165DFF;
  --text-1:#9B8FD0;
  --text-2:#F3EEFF;
  --text-3:#B6FF3B;
  --text-4:#86909C;
  --text-5:#1D2129;
  --line-1:rgba(255,255,255,0.08);
  --line-2:#DCDFE6;
  --radius:12px;
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
