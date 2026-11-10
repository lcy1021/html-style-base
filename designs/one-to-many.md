# 从一个到很多 — Style Reference

> 先在一个界面里看改动，再散成很多用户的界面，问题被放大，最后盖章结论。

**想说明：** 一个小改动，放到所有人那里影响很大  
**分类：** 案例展示  
**Theme：** 浅色  
**样例：** `demos/one-to-many.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 评估后放弃的决定
- 存量配置、历史数据的影响

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F4F3EF` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#EEF3FF` | — | 面 / 区块 |
| Surface 3 | `#FFECE8` | — | 面 / 区块 |
| Text 1 | `#86909C` | — | 文字 |
| Accent · 红 | `#D93A3A` | — | 文字 |
| Accent · 蓝 | `#165DFF` | — | 文字 |
| Text 2 | `#1D2129` | `--fg` | 文字 |
| Accent · 红 | `#B5482B` | — | 文字 |
| Accent · 紫 | `#5B3FD6` | — | 文字 |
| Accent · 红 | `#E2543B` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 外观上的小改动，也可能 |
| 22px | 700 | normal | normal | `div.stamp` | 最终决定：不改 |
| 13.3333px | 400 | normal | normal | `small` | 首页 · 快捷入口 |
| 13px | 400 | normal | normal | `span` | 销售日报 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `div, i, i.cut` | 用户 1 的首页 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 10px | 16 |
| 6px | 16 |
| 8px | 4 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div#many.many` — 1212×540 @ (34, 110)，grid
  - `div.stamp.on` — 202×81 @ (539, 320)，block，底色 `#FFFFFF`，圆角 8px
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 一个页面里看
2. 只是变窄一点，好像影响不大
3. 放到所有用户的配置里看
4. 结论：评估后决定不改

## Do's and Don'ts

### Do

- 第二步只做改动本身，让人觉得“好像没问题”
- 第三步散开，出问题的地方标红
- 可在第二步停下来问听众“你会改吗？”

### Don't

- 复盘没给数量时，不要写具体受影响数

## Agent Prompt Guide

**颜色速查：** `#F4F3EF`（背景 / 面），`#FFFFFF`（面 / 区块），`#EEF3FF`（面 / 区块），`#FFECE8`（面 / 区块），`#86909C`（文字），`#D93A3A`（文字）

```text
做一页「从一个到很多」形式的 HTML 演示：一个小改动，放到所有人那里影响很大。
适用：评估后放弃的决定；存量配置、历史数据的影响。
做法：第二步只做改动本身，让人觉得“好像没问题”；第三步散开，出问题的地方标红；可在第二步停下来问听众“你会改吗？”。
避免：复盘没给数量时，不要写具体受影响数。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F4F3EF;
  --surface-1:#FFFFFF;
  --surface-2:#EEF3FF;
  --surface-3:#FFECE8;
  --text-1:#86909C;
  --text-2:#D93A3A;
  --text-3:#165DFF;
  --text-4:#1D2129;
  --text-5:#B5482B;
  --text-6:#5B3FD6;
  --line-1:#E2543B;
  --radius:10px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/one-to-many.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：UED 需求分析分享（3.1）
