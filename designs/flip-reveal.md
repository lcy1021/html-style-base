# 先猜再揭晓 — Style Reference

> 卡片正面是问题，先请大家猜，再翻面揭晓。

**想说明：** 让听众参与判断  
**分类：** 案例展示  
**Theme：** 深色  
**样例：** `demos/flip-reveal.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 常见误区、两种做法对比
- 现场互动

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#1D2129` | — | 面 / 区块 |
| Text 1 | `#F3F1FF` | `--fg` | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Text 2 | `#86909C` | — | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 先猜一下：这两种用法， |
| 21px | 700 | 29.4px | normal | `h3` | 模板五格都填满了 |
| 17px | 400 | 27.2px | normal | `p` | 变成了填表：每一格都是猜的。 |
| 14px | 700 | normal | normal | `b` | 不算 |
| 13.3333px | 400 | normal | normal | `small` | 用法一 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 16px | 4 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.cards` — 1212×220 @ (34, 140)，grid

## 步骤脚本

1. 先请大家猜：这算在做判断吗？
2. 揭晓第一张
3. 揭晓第二张（卡片也可以直接点）

## Do's and Don'ts

### Do

- 标题直接是问题
- 翻面内容一句结论 + 一句原因
- 卡片也可以直接点

### Don't


## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#FFFFFF`（面 / 区块），`#1D2129`（面 / 区块），`#F3F1FF`（文字），`#FFB547`（文字），`#B9A8FF`（文字）

```text
做一页「先猜再揭晓」形式的 HTML 演示：让听众参与判断。
适用：常见误区、两种做法对比；现场互动。
做法：标题直接是问题；翻面内容一句结论 + 一句原因；卡片也可以直接点。
避免：。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#FFFFFF;
  --surface-2:#1D2129;
  --text-1:#F3F1FF;
  --text-2:#FFB547;
  --text-3:#B9A8FF;
  --text-4:#86909C;
  --radius:16px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/flip-reveal.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：UED 需求分析分享（4.2）
