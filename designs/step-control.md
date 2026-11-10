# 讲者掌握节奏的步进 — Style Reference

> 同一页里拦截方向键 / 滚轮 / 下一页按钮，先走完小步再翻页，可后退；进场前预先复位。

**想说明：** 多拍讲解的页面，讲者控制节奏  
**分类：** 页面过渡  
**Theme：** 深色  
**样例：** `demos/case-intro.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 任何需要分步讲解的页面

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#FFFFFF / 5%` | — | 面 / 区块 |
| Accent · 橙 | `#FFB547` | `--amber` | 面 / 区块 |
| Surface 3 | `#F4F1FF` | — | 面 / 区块 |
| Text 1 | `#F3F1FF` | `--fg` | 文字 |
| Text 2 | `#1D2129` | — | 文字 |
| Text 3 | `#9A95A8` | `--mut` | 文字 |
| Accent · 橙 | `#2A1A00` | — | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Accent · 紫 | `#B9A8FF / 30%` | `--violet` | 描边 |
| Line 1 | `#E5E6EB` | — | 描边 |
| Accent · 紫 | `#5B3FD6` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 开始设计前，先问 |
| 26px | 400 | 33.8px | normal | `h2, em` | 财务每月要按部门 |
| 22px | 700 | 30.8px | normal | `b` | “导出时，每个部门生成一个文件。 |
| 20px | 400 | 30px | normal | `p.lit` | 照字面理解，改动就是这一个选项。 |
| 18px | 400 | normal | normal | `div.q` | 这些文件，？ |
| 18px | 700 | normal | normal | `b` | 给谁 |
| 16px | 400 | 28.8px | normal | `p` | 需要材料时，会在报表里筛出全部门 |
| 15px | 700 | normal | normal | `h4` | 导出报表 |
| 14px | 400 | normal | normal | `div.opt` | 合并为一个文件 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 8px | 4 |
| 14px | 3 |
| 12px | 3 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.4) 0px 20px 50px 0px` | 2 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.slot.a.on` — 1212×590 @ (34, 110)，grid
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 第一拍：案例背景——这是谁、在做什么
2. 第二拍：照字面理解，改动只是一个选项
3. 第三拍：动手之前，先问三个问题

## Do's and Don'ts

### Do

- 元素用 data-s 指定出现的步数
- 滚轮一次一步，加 600ms 节流
- 离开页面时就复位到第一步，避免进场闪烁

### Don't

- 自动播放无法暂停
- 进场后才复位，会先闪出上次的状态

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#FFFFFF`（面 / 区块），`#FFFFFF / 5%`（面 / 区块），`#FFB547`（面 / 区块），`#F4F1FF`（面 / 区块），`#F3F1FF`（文字）

```text
做一页「讲者掌握节奏的步进」形式的 HTML 演示：多拍讲解的页面，讲者控制节奏。
适用：任何需要分步讲解的页面。
做法：元素用 data-s 指定出现的步数；滚轮一次一步，加 600ms 节流；离开页面时就复位到第一步，避免进场闪烁。
避免：自动播放无法暂停；进场后才复位，会先闪出上次的状态。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#FFFFFF;
  --surface-2:rgba(255,255,255,0.05);
  --surface-3:#FFB547;
  --surface-4:#F4F1FF;
  --text-1:#F3F1FF;
  --text-2:#1D2129;
  --text-3:#9A95A8;
  --text-4:#2A1A00;
  --text-5:#B9A8FF;
  --line-1:rgba(185,168,255,0.3);
  --line-2:#E5E6EB;
  --line-3:#5B3FD6;
  --radius:8px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/case-intro.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：UED 需求分析分享
