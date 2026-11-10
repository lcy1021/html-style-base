# 冰山下潜 — Style Reference

> 方案露在水面上；每下潜一层是一个可以去确认的问题，右侧深度按钮可直接跳转。

**想说明：** 一个现成方案背后还有哪些没问清的问题  
**分类：** 样式  
**Theme：** 深色  
**样例：** `demos/iceberg.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 拿到现成方案 / PRD 时的追问
- “看到的只是一角”的观点

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Accent · 蓝 | `#2D5576` | — | 背景 / 面 |
| Surface 1 | `#FFFFFF / 85%` | — | 面 / 区块 |
| Surface 2 | `#1D2129` | — | 面 / 区块 |
| Text 1 | `#FFFFFF` | — | 文字 |
| Accent · 红 | `#B5482B` | — | 文字 |
| Text 2 | `#9A95A8` | `--mut` | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1` | 拿到的方案，只是露出水面的一角。 |
| 20px | 700 | normal | normal | `h4` | 哪些已经定了，哪些还能调？ |
| 13px | 400 | normal | normal | `p, button, button.on` | 先分清能讨论的空间 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `p.note` | 内容为示意 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 99px | 4 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div#w.world` — 1280×1584 @ (0, -821)，block
  - `nav#rail.rail` — 88×164 @ (1172, 278)，grid
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 水面：你拿到的只是方案
2. 下潜一层：最初想解决什么问题
3. 再下潜：哪些已定、哪些还能调
4. 最深一层：方案里没写出来的假设

## Do's and Don'ts

### Do

- 水面上放一句具体的原话
- 每层一个问题 + 一句说明
- 最深一层接到下一个案例

### Don't

- 层数不要太多，4–5 层足够

## Agent Prompt Guide

**颜色速查：** `#2D5576`（背景 / 面），`#FFFFFF / 85%`（面 / 区块），`#1D2129`（面 / 区块），`#FFFFFF`（文字），`#B5482B`（文字），`#9A95A8`（文字）

```text
做一页「冰山下潜」形式的 HTML 演示：一个现成方案背后还有哪些没问清的问题。
适用：拿到现成方案 / PRD 时的追问；“看到的只是一角”的观点。
做法：水面上放一句具体的原话；每层一个问题 + 一句说明；最深一层接到下一个案例。
避免：层数不要太多，4–5 层足够。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#2D5576;
  --surface-1:rgba(255,255,255,0.85);
  --surface-2:#1D2129;
  --text-1:#FFFFFF;
  --text-2:#B5482B;
  --text-3:#9A95A8;
  --radius:99px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/iceberg.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：UED 需求分析分享（2.4）
