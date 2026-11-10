# 斜率图 — Style Reference

> 左右两列排序，连线交叉越多分歧越大；可再按分组重排。

**想说明：** 两种排序 / 两种结果对不上  
**分类：** 样式  
**Theme：** 深色  
**样例：** `demos/slope.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 两种工具 / 两类人给出的排序对比

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Text 1 | `#F3F1FF` | `--fg` | 文字 |
| Text 2 | `#9A95A8` | `--mut` | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 同一批需求，两种排序 |
| 13px | 400 | normal | normal | `div.it` | 需求 A |
| 12px | 700 | normal | normal | `h5, h5.on` | 内部评分 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 数据为示意 |
| 11px | 400 | normal | normal | `p.note` | 真实使用时只放真实数据 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 0 | — |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div#ch.ch` — 973×520 @ (154, 120)，block
  - `p.note` — 121×16 @ (1139, 640)，block

## 步骤脚本

1. 先按我们的评分排
2. 再看用户的排序：连线交叉
3. 交叉越多，越要回头核对输入

## Do's and Don'ts

### Do

- 先只显示一列，再连线
- 交叉大的线换色

### Don't

- 只用真实数据；没有数据就不要用这个形式

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#F3F1FF`（文字），`#9A95A8`（文字），`#FFB547`（文字），`#B9A8FF`（文字）

```text
做一页「斜率图」形式的 HTML 演示：两种排序 / 两种结果对不上。
适用：两种工具 / 两类人给出的排序对比。
做法：先只显示一列，再连线；交叉大的线换色。
避免：只用真实数据；没有数据就不要用这个形式。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --text-1:#F3F1FF;
  --text-2:#9A95A8;
  --text-3:#FFB547;
  --text-4:#B9A8FF;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/slope.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：UED 需求分析分享（4.2）
