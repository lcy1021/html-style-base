# Dala · 空间连续的开场 — Style Reference

> 大聚合体松开、移到中央、铺满全屏，文字真正经过视口。适合概念开场和章节交接，不适合整场都用。

**想说明：** 开场抓注意力，建立目的和价值  
**分类：** 参考  
**Theme：** 深色  
**原始参考：** <https://dala.craftedbygc.com>  
**样例：** `demos/transitions.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 开场
- 章节之间的过渡

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#000000` | — | 面 / 区块 |
| Surface 2 | `#F4F3EF` | — | 面 / 区块 |
| Surface 3 | `#FFFFFF` | — | 面 / 区块 |
| Text 1 | `#1D2129` | — | 文字 |
| Accent · 红 | `#B5482B` | — | 文字 |
| Text 2 | `#F3F1FF` | `--fg` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 32px | 400 | normal | normal | `h2, em` | 先回到 |
| 24px | 700 | normal | normal | `h3` | 案例页里只有案例的 UI |
| 20px | 400 | normal | normal | `div.veil` | 下一部分 → |
| 11px | 400 | normal | 1.54px | `p.eb` | 论点 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 14px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.1) 0px 20px 40px 0px` | 1 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.mid` — 1280×70 @ (0, 288)，block
  - `div.case` — 1280×664 @ (0, 0)，block，底色 `#F4F3EF`
  - `div.veil` — 1280×720 @ (0, 0)，grid，底色 `#000000`

## 步骤脚本

1. 论点页：粒子只做氛围，不画 UI、不加标签
2. 案例舞台从下方整块覆盖，粒子在被盖住后才隐藏
3. 章节之间：黑场过渡

## Do's and Don'ts

### Do

- 同一组元素在转场中保留身份
- 保留中间形态，不直接跳到结果
- 阅读区亮度跟着文字变

### Don't

- 进入具体案例后还用粒子，会抢案例的戏

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#000000`（面 / 区块），`#F4F3EF`（面 / 区块），`#FFFFFF`（面 / 区块），`#1D2129`（文字），`#B5482B`（文字）

```text
做一页「Dala · 空间连续的开场」形式的 HTML 演示：开场抓注意力，建立目的和价值。
适用：开场；章节之间的过渡。
做法：同一组元素在转场中保留身份；保留中间形态，不直接跳到结果；阅读区亮度跟着文字变。
避免：进入具体案例后还用粒子，会抢案例的戏。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `particle-vs-stage`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#000000;
  --surface-2:#F4F3EF;
  --surface-3:#FFFFFF;
  --text-1:#1D2129;
  --text-2:#B5482B;
  --text-3:#F3F1FF;
  --text-4:#B9A8FF;
  --text-5:#FFB547;
  --radius:14px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/transitions.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-09 · 来源：案例交互和样式参考汇总 · 01
