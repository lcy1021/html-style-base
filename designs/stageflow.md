# 阶段曲线 stageflow — Style Reference

> 上方阶段曲线，下方左边构成 / 流向，右边本阶段问题 + 主要关注的需求；按阶段推进。

**想说明：** 不同阶段关注点不同  
**分类：** 案例展示  
**Theme：** 深色  
**样例：** `demos/stageflow.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 产品阶段、项目阶段、成长阶段

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF / 5%` | — | 面 / 区块 |
| Surface 2 | `#FFFFFF` | — | 面 / 区块 |
| Accent · 橙 | `#E8692A` | — | 面 / 区块 |
| Accent · 蓝 | `#2F7BE0` | — | 面 / 区块 |
| Surface 3 | `#6F6A7A` | — | 面 / 区块 |
| Text 1 | `#F3F1FF` | `--fg` | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Text 2 | `#9A95A8` | `--mut` | 文字 |
| Text 3 | `#1D2129` | — | 文字 |
| Text 4 | `#86909C` | — | 文字 |
| Line 1 | `#FFFFFF / 35%` | — | 描边 |
| Line 2 | `#FFFFFF / 10%` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 产品走到哪个阶段， |
| 19px | 700 | 26.6px | normal | `h4` | 改动会怎样影响已有配置和习惯？ |
| 14px | 400 | normal | normal | `li` | 对存量的影响 |
| 13px | 700 | normal | normal | `b` | 起步期 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `span, small, p.note` | 内部假设 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 50% | 3 |
| 9px | 3 |
| 14px | 2 |
| 10px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(185, 168, 255, 0.25) 0px 0px 0px 7px` | 1 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.cv` — 1126×90 @ (77, 110)，block
  - `div.body` — 1212×408 @ (34, 240)，grid
  - `p.note` — 132×16 @ (1128, 640)，block

## 步骤脚本

1. 阶段 1：靠假设推进
2. 阶段 2：常用任务能直接完成
3. 阶段 3：存量与迁移成本

## Do's and Don'ts

### Do

- 曲线推进 + 节点点亮
- 每个阶段一个问题 + 三条关注点（标对应章节）
- 构成比例没有统计依据时只写多 / 中 / 少，注明示意趋势

### Don't

- 待补、讲者片段不要放在主画面
- 问题卡别用 1fr 撑满，避免大片空白
- 小屏时关注点改成横排只留标题

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#FFFFFF / 5%`（面 / 区块），`#FFFFFF`（面 / 区块），`#E8692A`（面 / 区块），`#2F7BE0`（面 / 区块），`#6F6A7A`（面 / 区块）

```text
做一页「阶段曲线 stageflow」形式的 HTML 演示：不同阶段关注点不同。
适用：产品阶段、项目阶段、成长阶段。
做法：曲线推进 + 节点点亮；每个阶段一个问题 + 三条关注点（标对应章节）；构成比例没有统计依据时只写多 / 中 / 少，注明示意趋势。
避免：待补、讲者片段不要放在主画面；问题卡别用 1fr 撑满，避免大片空白；小屏时关注点改成横排只留标题。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:rgba(255,255,255,0.05);
  --surface-2:#FFFFFF;
  --surface-3:#E8692A;
  --surface-4:#2F7BE0;
  --surface-5:#6F6A7A;
  --text-1:#F3F1FF;
  --text-2:#FFB547;
  --text-3:#9A95A8;
  --text-4:#1D2129;
  --text-5:#86909C;
  --line-1:rgba(255,255,255,0.35);
  --line-2:rgba(255,255,255,0.1);
  --radius:50%;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/stageflow.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：UED 需求分析分享（一、产品阶段）
