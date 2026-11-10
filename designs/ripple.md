# 涟漪层级 — Style Reference

> 同心圆可点，侧栏只显示当前层的信号和案例；底部比例条随层级变化。

**想说明：** 对象 / 视野一圈一圈变大  
**分类：** 案例展示  
**Theme：** 深色  
**样例：** `demos/ripple.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 分析对象逐层扩大
- 影响范围、成长路径

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF / 6%` | — | 面 / 区块 |
| Accent · 蓝 | `#1D2238` | — | 面 / 区块 |
| Surface 2 | `#FFE4C2` | — | 面 / 区块 |
| Text 1 | `#9A95A8` | `--mut` | 文字 |
| Text 2 | `#F3F1FF` | `--fg` | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Text 3 | `#E6ECFF` | — | 文字 |
| Accent · 橙 | `#5A3300` | — | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 分析对象， |
| 28px | 500 | normal | normal | `h2` | 使用模式 |
| 14px | 400 | 23.8px | normal | `p` | 这类用户的实际用法，和产品的默认 |
| 12px | 400 | normal | 1.2px | `small` | 层级 04 |
| 12px | 700 | 28px | normal | `em` | 有人直接提 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `div.ratio, p.note` | 越往外，越依赖没说出口的需求 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 12px | 1 |
| 8px | 1 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `svg#rp` — 589×556 @ (38, 100)，block
  - `div.panel` — 580×124 @ (666, 226)，block
  - `div.ratio` — 580×50 @ (666, 596)，block
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 最内层：单个功能
2. 往外：模块
3. 再往外：路径
4. 最外层：使用模式

## Do's and Don'ts

### Do

- 圆环可点直接跳层
- 侧栏只放当前层，避免五列并排挤小字
- 没有案例的外层留空并注明待补

### Don't


## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#FFFFFF / 6%`（面 / 区块），`#1D2238`（面 / 区块），`#FFE4C2`（面 / 区块），`#9A95A8`（文字），`#F3F1FF`（文字）

```text
做一页「涟漪层级」形式的 HTML 演示：对象 / 视野一圈一圈变大。
适用：分析对象逐层扩大；影响范围、成长路径。
做法：圆环可点直接跳层；侧栏只放当前层，避免五列并排挤小字；没有案例的外层留空并注明待补。
避免：。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:rgba(255,255,255,0.06);
  --surface-2:#1D2238;
  --surface-3:#FFE4C2;
  --text-1:#9A95A8;
  --text-2:#F3F1FF;
  --text-3:#FFB547;
  --text-4:#B9A8FF;
  --text-5:#E6ECFF;
  --text-6:#5A3300;
  --radius:12px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/ripple.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：UED 需求分析分享（5.1）
