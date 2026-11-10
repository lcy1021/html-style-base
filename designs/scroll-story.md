# 滚动叙事 — Style Reference

> 画面固定在一侧，文字一段段经过；同一个画面依次标出问题、原地变成方案、写出完成标准。

**想说明：** 一个界面从现状走到方案  
**分类：** 样式  
**Theme：** 深色  
**样例：** `demos/scroll-story.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 单个界面的改版说明
- “现状 → 问题 → 方案 → 标准”的完整讲述

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#F3F1FF` | `--fg` | 面 / 区块 |
| Accent · 紫 | `#5B4BFF` | — | 面 / 区块 |
| Text 1 | `#9A95A8` | `--mut` | 文字 |
| Text 2 | `#1D2129` | — | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Text 3 | `#4E5969` | — | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Line 1 | `#E5E6EB` | — | 描边 |
| Line 2 | `#C9CDD4` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 同一个画面， |
| 22px | 500 | 30.8px | normal | `h3` | 导出时，只能选“合并”或“拆分” |
| 15px | 400 | 27px | normal | `p` | 右边是现在的导出设置。先让大家看 |
| 15px | 700 | normal | normal | `h4` | 导出报表 |
| 14px | 400 | normal | normal | `div.row` | 合并为一个文件 |
| 13px | 400 | normal | normal | `span` | 文件名：部门 + 月份 |
| 12px | 400 | normal | 1.2px | `small` | 现状 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `p.note` | 内容为示意 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 8px | 3 |
| 50% | 3 |
| 6px | 2 |
| 14px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.4) 0px 20px 50px 0px` | 1 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.scr` — 691×520 @ (555, 110)，block，底色 `#FFFFFF`，圆角 14px
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 画面固定在右边，文字一段段滚过
2. 第二段：同一个画面，标出问题
3. 第三段：画面原地变成方案
4. 第四段：方案的完成标准

## Do's and Don'ts

### Do

- 画面只保留一个，状态在原位变化
- 每段文字对应画面的一次变化
- 最后一段写成用户能检查的结果

### Don't

- 每段都换一张新图，听众会失去参照
- 方案段直接跳到高保真，看不出改了哪里

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#FFFFFF`（面 / 区块），`#F3F1FF`（面 / 区块），`#5B4BFF`（面 / 区块），`#9A95A8`（文字），`#1D2129`（文字）

```text
做一页「滚动叙事」形式的 HTML 演示：一个界面从现状走到方案。
适用：单个界面的改版说明；“现状 → 问题 → 方案 → 标准”的完整讲述。
做法：画面只保留一个，状态在原位变化；每段文字对应画面的一次变化；最后一段写成用户能检查的结果。
避免：每段都换一张新图，听众会失去参照；方案段直接跳到高保真，看不出改了哪里。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `time-machine`
- `ref-column`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#FFFFFF;
  --surface-2:#F3F1FF;
  --surface-3:#5B4BFF;
  --text-1:#9A95A8;
  --text-2:#1D2129;
  --text-3:#FFB547;
  --text-4:#4E5969;
  --text-5:#B9A8FF;
  --line-1:#E5E6EB;
  --line-2:#C9CDD4;
  --radius:8px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/scroll-story.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 A
