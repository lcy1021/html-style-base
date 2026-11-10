# 诊断仪 — Style Reference

> 几个信号各自用滑块调，指针给出“继续补 / 带着假设推进 / 可以推进”。

**想说明：** 分析到什么程度算够  
**分类：** 样式  
**Theme：** 深色  
**样例：** `demos/diagnose.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 讲判断标准
- 现场换一个需求试试

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Text 1 | `#9A95A8` | `--mut` | 文字 |
| Text 2 | `#F3F1FF` | `--fg` | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 分析到什么程度算够， |
| 18px | 400 | normal | normal | `div.out` | 可以推进 |
| 14px | 400 | normal | normal | `span` | 知道这件事服务谁 |
| 14px | 500 | normal | normal | `b` | 85 |
| 13px | 400 | normal | normal | `small` | 再分析，收获也不大了 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `p.note` | 内容为示意 · 刻度只帮助讨论， |

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
  - `div#sg.sg` — 538×252 @ (34, 130)，block
  - `div.gauge` — 380×220 @ (798, 150)，block
  - `div#ot.out` — 380×51 @ (798, 390)，block
  - `p.note` — 207×16 @ (1053, 640)，block

## 步骤脚本

1. 四个信号，各自拖动
2. 信号都不明：继续分析
3. 信号都清楚：可以推进

## Do's and Don'ts

### Do

- 信号名称用问题写
- 刻度只帮助讨论
- 允许多个未知同时存在

### Don't

- 只留一个筛子会和“多个未知共同阻断”冲突
- 把刻度当成算法

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#FFFFFF`（面 / 区块），`#9A95A8`（文字），`#F3F1FF`（文字），`#FFB547`（文字），`#B9A8FF`（文字）

```text
做一页「诊断仪」形式的 HTML 演示：分析到什么程度算够。
适用：讲判断标准；现场换一个需求试试。
做法：信号名称用问题写；刻度只帮助讨论；允许多个未知同时存在。
避免：只留一个筛子会和“多个未知共同阻断”冲突；把刻度当成算法。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `checklist`
- `fill-record`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#FFFFFF;
  --text-1:#9A95A8;
  --text-2:#F3F1FF;
  --text-3:#FFB547;
  --text-4:#B9A8FF;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/diagnose.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 Y
