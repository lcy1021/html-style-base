# 逐级放大 — Style Reference

> 同一张图逐级放大：流程 → 页面 → 表单 → 按钮，每一级配一句理由。

**想说明：** 从流程到按钮，每一级都说得通  
**分类：** 案例展示  
**Theme：** 深色  
**样例：** `demos/zoom-levels.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 宏观与微观的一致性
- 层级 / 视野的变化

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Accent · 紫 | `#15131D` | — | 面 / 区块 |
| Surface 1 | `#0C0B12 / 80%` | `--bg` | 面 / 区块 |
| Text 1 | `#F3F1FF` | `--fg` | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Text 2 | `#9A95A8` | `--mut` | 文字 |
| Accent · 紫 | `#B9A8FF / 50%` | `--violet` | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 从流程到按钮， |
| 15px | 400 | 25.5px | normal | `div.lbl` | 按钮：“导出”紧挨汇总，不藏在更 |
| 15px | 700 | 25.5px | normal | `b` | 4 / 4 |
| 13px | 400 | normal | normal | `div.bx` | 流程 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 9px | 400 | normal | normal | `div.bx` | 按钮 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 10px | 5 |
| 14px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(255, 181, 71, 0.15) 0px 0px 0px 4px` | 1 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.vp` — 1212×524 @ (34, 120)，block，底色 `#15131D`，圆角 14px

## 步骤脚本

1. 流程：一张表经过的四个环节
2. 页面：其中一个环节的页面
3. 表单：页面里的一块
4. 按钮：表单里的一个按钮

## Do's and Don'ts

### Do

- 所有层级画在同一个坐标系里，用缩放推进
- 当前层高亮
- 每级只说一句

### Don't

- 缩放太快会晕
- 层级之间没有因果，就只是动效

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#15131D`（面 / 区块），`#0C0B12 / 80%`（面 / 区块），`#F3F1FF`（文字），`#FFB547`（文字），`#B9A8FF`（文字）

```text
做一页「逐级放大」形式的 HTML 演示：从流程到按钮，每一级都说得通。
适用：宏观与微观的一致性；层级 / 视野的变化。
做法：所有层级画在同一个坐标系里，用缩放推进；当前层高亮；每级只说一句。
避免：缩放太快会晕；层级之间没有因果，就只是动效。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `ripple`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#15131D;
  --surface-2:rgba(12,11,18,0.8);
  --text-1:#F3F1FF;
  --text-2:#FFB547;
  --text-3:#B9A8FF;
  --text-4:#9A95A8;
  --line-1:rgba(185,168,255,0.5);
  --radius:10px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/zoom-levels.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 I
