# 划掉重写 — Style Reference

> 旧问题先出现 → 红线划掉 → 新问题展开 → 画面跟着新问题变化。

**想说明：** 分析之后，问题被重新定义  
**分类：** 样式  
**Theme：** 浅色  
**样例：** `demos/strike-rewrite.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- “从 A 问题变成 B 问题”的认知转变
- 需求方案被重新表述

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F4F3EF` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#E8FFEA` | — | 面 / 区块 |
| Surface 3 | `#F2F3F5` | — | 面 / 区块 |
| Text 1 | `#1D2129` | `--fg` | 文字 |
| Accent · 红 | `#B5482B` | — | 文字 |
| Text 2 | `#6B7280` | `--mut` | 文字 |
| Text 3 | `#A0A6B0` | — | 文字 |
| Accent · 绿 | `#00A12A` | — | 文字 |
| Accent · 紫 | `#5B3FD6` | — | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 分析之后， |
| 17px | 400 | normal | normal | `span.ft` | 怎样让批量拖动更快 |
| 12px | 400 | normal | normal | `p.k` | 设计问题 |
| 12px | 600 | normal | normal | `span` | C |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `p.note` | 内容为示意 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 6px | 8 |
| 16px | 1 |
| 12px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.1) 0px 20px 50px 0px` | 1 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.card` — 560×175 @ (360, 120)，block，底色 `#FFFFFF`，圆角 16px
  - `div#cells.cells` — 1212×34 @ (34, 596)，grid
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 原来的设计问题
2. 旧问题被划掉，换成新问题（按时间播完，不随滚动停在半途）
3. 画面跟着新问题变化：顺序归位

## Do's and Don'ts

### Do

- 红线只划在文字上，不横穿整个框
- 各阶段错开延迟：划线 0.8s → 新问题 1.4s → 说明 2.2s
- 画面变化（如归位）在新问题出现后再播

### Don't

- 动画进度绑在滚动位置上会停在半途：关键动画按时间播完，滚动只负责触发

## Agent Prompt Guide

**颜色速查：** `#F4F3EF`（背景 / 面），`#FFFFFF`（面 / 区块），`#E8FFEA`（面 / 区块），`#F2F3F5`（面 / 区块），`#1D2129`（文字），`#B5482B`（文字）

```text
做一页「划掉重写」形式的 HTML 演示：分析之后，问题被重新定义。
适用：“从 A 问题变成 B 问题”的认知转变；需求方案被重新表述。
做法：红线只划在文字上，不横穿整个框；各阶段错开延迟：划线 0.8s → 新问题 1.4s → 说明 2.2s；画面变化（如归位）在新问题出现后再播。
避免：动画进度绑在滚动位置上会停在半途：关键动画按时间播完，滚动只负责触发。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F4F3EF;
  --surface-1:#FFFFFF;
  --surface-2:#E8FFEA;
  --surface-3:#F2F3F5;
  --text-1:#1D2129;
  --text-2:#B5482B;
  --text-3:#6B7280;
  --text-4:#A0A6B0;
  --text-5:#00A12A;
  --text-6:#5B3FD6;
  --radius:6px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/strike-rewrite.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：UED 需求分析分享（2.1 字段排序）
