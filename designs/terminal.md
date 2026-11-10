# 终端回放 — Style Reference

> 命令逐行回放，# 注释解释每一步；右侧三色区分 AI 提醒、待核实和复盘证据。

**想说明：** 工具 / AI 做了什么，哪些要自己核实  
**分类：** 案例展示  
**Theme：** 深色  
**样例：** `demos/terminal.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 介绍工具或 AI 工作流
- 练习题

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#0A0A0F` | — | 面 / 区块 |
| Text 1 | `#F3F1FF` | `--fg` | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Text 2 | `#6B7280` | — | 文字 |
| Accent · 青 | `#5AD0B3` | `--teal` | 文字 |
| Accent · 红 | `#FF6B5A` | `--red` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Line 1 | `#FFFFFF / 12%` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 工具做了什么， |
| 14px | 400 | 24.5px | normal | `div.l` | $ 需求速拆 "成员搜索支持空格 |
| 14px | 400 | 22.4px | normal | `div.a, div.b, div.c2` | 姓名里可能本身带空格。 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | 17.6px | 0.88px | `small` | AI 提醒 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 10px | 3 |
| 12px | 1 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div#tm.term` — 704×524 @ (34, 120)，block，底色 `#0A0A0F`，圆角 12px
  - `div.brd` — 410×228 @ (836, 130)，block

## 步骤脚本

1. 一条命令，看工具做了什么
2. AI 给出的提醒
3. 需要人核实的部分
4. 复盘时的证据

## Do's and Don'ts

### Do

- 命令和输出按步出现
- 三种颜色固定含义
- 工具名称必须和实际一致

### Don't

- 把 AI 输出直接当结论
- 写错工具名称

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#0A0A0F`（面 / 区块），`#F3F1FF`（文字），`#FFB547`（文字），`#6B7280`（文字），`#5AD0B3`（文字）

```text
做一页「终端回放」形式的 HTML 演示：工具 / AI 做了什么，哪些要自己核实。
适用：介绍工具或 AI 工作流；练习题。
做法：命令和输出按步出现；三种颜色固定含义；工具名称必须和实际一致。
避免：把 AI 输出直接当结论；写错工具名称。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `pipeline`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#0A0A0F;
  --text-1:#F3F1FF;
  --text-2:#FFB547;
  --text-3:#6B7280;
  --text-4:#5AD0B3;
  --text-5:#FF6B5A;
  --text-6:#B9A8FF;
  --line-1:rgba(255,255,255,0.12);
  --radius:10px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/terminal.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 P
