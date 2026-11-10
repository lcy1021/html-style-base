# 流程管线 — Style Reference

> 步骤一字排开，必做实线、可选虚线，闸门步骤用菱形，逐组点亮。

**想说明：** 一条流程里，哪些必做、哪些按需  
**分类：** 样式  
**Theme：** 浅色  
**样例：** `demos/pipeline.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 日常操作流程
- 人机分工

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F4F3EF` | `--bg` | 背景 / 面 |
| Accent · 紫 | `#B9A8FF / 20%` | — | 面 / 区块 |
| Text 1 | `#1D2129` | `--fg` | 文字 |
| Text 2 | `#6B7280` | `--mut` | 文字 |
| Accent · 橙 | `#B86E00` | `--amber` | 文字 |
| Accent · 紫 | `#6A55D6` | `--violet` | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 流程帮你不遗漏， |
| 16px | 600 | normal | normal | `span` | 1 |
| 13px | 700 | normal | normal | `b` | 收集原始材料 |
| 13px | 400 | 26px | normal | `p.lg` | 实线：每次都做　虚线：做多少由闸 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 50% | 6 |
| 10px | 1 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div#pp.pipe` — 1212×73 @ (34, 150)，flex
  - `p.lg` — 247×26 @ (34, 614)，block

## 步骤脚本

1. 每次都做的步骤
2. 中间有一道闸门
3. 闸门决定后面走多深
4. 整条流程

## Do's and Don'ts

### Do

- 先点亮每次都做的，再点亮闸门，再点亮由闸门决定的

### Don't


## Agent Prompt Guide

**颜色速查：** `#F4F3EF`（背景 / 面），`#B9A8FF / 20%`（面 / 区块），`#1D2129`（文字），`#6B7280`（文字），`#B86E00`（文字），`#6A55D6`（文字）

```text
做一页「流程管线」形式的 HTML 演示：一条流程里，哪些必做、哪些按需。
适用：日常操作流程；人机分工。
做法：先点亮每次都做的，再点亮闸门，再点亮由闸门决定的。
避免：。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F4F3EF;
  --surface-1:rgba(185,168,255,0.2);
  --text-1:#1D2129;
  --text-2:#6B7280;
  --text-3:#B86E00;
  --text-4:#6A55D6;
  --radius:50%;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/pipeline.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：UED 需求分析分享（4.1）
