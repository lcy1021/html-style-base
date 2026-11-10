# 假设积木塔 — Style Reference

> 方案搭在几层假设上；点掉一块，依赖它的跟着倒；按“带走多少”排验证顺序。

**想说明：** 假设之间的依赖和验证顺序  
**分类：** 案例展示  
**Theme：** 深色  
**样例：** `demos/block-tower.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 从零开始的方案
- 讨论先验证什么

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Accent · 橙 | `#FFB547` | `--amber` | 面 / 区块 |
| Accent · 青 | `#5AD0B3` | `--teal` | 面 / 区块 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 面 / 区块 |
| Accent · 蓝 | `#4EA1FF` | `--blue` | 面 / 区块 |
| Accent · 红 | `#FF9BB3` | — | 面 / 区块 |
| Text 1 | `#9A95A8` | `--mut` | 文字 |
| Text 2 | `#1D2129` | — | 文字 |
| Text 3 | `#F3F1FF` | `--fg` | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 先验证哪个假设？ |
| 18px | 500 | 32.4px | normal | `b` | 验证顺序 |
| 15px | 400 | 27px | normal | `div.side` | A（带走 4） → B（带走 1 |
| 13px | 400 | normal | normal | `button.bk` | A · 用户每月都要做这件事 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `p.note` | 内容为示意 · 假设 A–E 为 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 6px | 5 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset` | 5 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div#tw.tw` — 520×360 @ (280, 270)，block
  - `div#sd.side` — 358×86 @ (888, 140)，block
  - `p.note` — 167×16 @ (1093, 640)，block

## 步骤脚本

1. 方案建立在几层假设上（积木可以直接点）
2. 抽掉底层假设：上面跟着倒
3. 按“倒得多”排序：先验证最底下的

## Do's and Don'ts

### Do

- 底层放最基础的假设
- 积木可以直接点
- 最后给出验证顺序

### Don't

- 假设是教学示意时必须标出

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#FFB547`（面 / 区块），`#5AD0B3`（面 / 区块），`#B9A8FF`（面 / 区块），`#4EA1FF`（面 / 区块），`#FF9BB3`（面 / 区块）

```text
做一页「假设积木塔」形式的 HTML 演示：假设之间的依赖和验证顺序。
适用：从零开始的方案；讨论先验证什么。
做法：底层放最基础的假设；积木可以直接点；最后给出验证顺序。
避免：假设是教学示意时必须标出。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `growth-tree`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#FFB547;
  --surface-2:#5AD0B3;
  --surface-3:#B9A8FF;
  --surface-4:#4EA1FF;
  --surface-5:#FF9BB3;
  --text-1:#9A95A8;
  --text-2:#1D2129;
  --text-3:#F3F1FF;
  --radius:6px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/block-tower.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 V
