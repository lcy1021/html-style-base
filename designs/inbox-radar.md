# 收件箱与雷达 — Style Reference

> 左右两栏对照：收件箱里需求信封不断落下，点开看背后的问题；雷达持续扫描，扫到的信号点亮。用来讲“被动接需求”和“主动找问题”两种工作方式。

**想说明：** 一个职能的两面：被动接收与主动发现  
**分类：** 样式  
**Theme：** 浅色  
**样例：** `demos/inbox-radar.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 讲职能定位、两种工作方式
- 需要一个持续在动的背景页

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F5F3EE` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#0C1A14` | — | 面 / 区块 |
| Surface 3 | `#F8F9FB` | — | 面 / 区块 |
| Surface 4 | `#0C1A14 / 80%` | — | 面 / 区块 |
| Accent · 绿 | `#2FE07A` | — | 面 / 区块 |
| Text 1 | `#1A1A1A` | — | 文字 |
| Text 2 | `#D6FFE6` | — | 文字 |
| Text 3 | `#8A857C` | `--mut` | 文字 |
| Text 4 | `#C0C4CC` | — | 文字 |
| Accent · 绿 | `#2FE07A / 33%` | — | 描边 |
| Accent · 橙 | `#E4E0D6` | — | 描边 |
| Line 1 | `#E3E6EC` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 40.96px | 700 | 51.2px | normal | `h1` | 不管在哪个阶段，需求到我们手上只 |
| 22px | 400 | normal | normal | `i` | 📨 |
| 20px | 700 | normal | normal | `h2` | 被动：需求找上门 |
| 18px | 700 | normal | normal | `div` | 被动的时候，要能判断 |
| 14px | 700 | normal | normal | `b` | “方案我画好了，你出个高保真。” |
| 13px | 400 | normal | normal | `span` | 点开信封，看看方案背后写了什么 |
| 13px | 700 | normal | normal | `b` | 两条线交叉起来看 |
| 12px | 400 | normal | 1.8px | `small` | 第 1 段 · 1-2 · 第二 |
| 12px | 400 | normal | normal | `div.hide, span` | 背后的问题：这个方案最初想解决什 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 50% | 10 |
| 6px | 3 |
| 20px | 2 |
| 12px | 1 |
| 18px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgb(47, 224, 122) 0px 0px 14px 0px` | 4 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.hd` — 1280×122 @ (0, 0)，flex
  - `div.split` — 1280×440 @ (0, 122)，grid
  - `div.verdict` — 1280×93 @ (0, 562)，grid
  - `div#mx.mx` — 1152×291 @ (64, 684)，block，底色 `#FFFFFF`，圆角 18px

## 步骤脚本

1. 不管在哪个阶段，需求到我们手上只有两种方式。
2. 不管在哪个阶段，需求到我们手上只有两种方式。（续）

## Do's and Don'ts

### Do

- 两边用同一套视觉语言，只换方向
- 收件箱里的条目可以点开看“背后的问题”
- 雷达扫到的点要对应具体信号

### Don't

- 一直在动的元素会抢讲者的话，讲完要能停
- 两边内容量不对等会显得偏向一边

## Agent Prompt Guide

**颜色速查：** `#F5F3EE`（背景 / 面），`#FFFFFF`（面 / 区块），`#0C1A14`（面 / 区块），`#F8F9FB`（面 / 区块），`#0C1A14 / 80%`（面 / 区块），`#2FE07A`（面 / 区块）

```text
做一页「收件箱与雷达」形式的 HTML 演示：一个职能的两面：被动接收与主动发现。
适用：讲职能定位、两种工作方式；需要一个持续在动的背景页。
做法：两边用同一套视觉语言，只换方向；收件箱里的条目可以点开看“背后的问题”；雷达扫到的点要对应具体信号。
避免：一直在动的元素会抢讲者的话，讲完要能停；两边内容量不对等会显得偏向一边。
步进：共 2 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `voice-wall`
- `stageflow`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F5F3EE;
  --surface-1:#FFFFFF;
  --surface-2:#0C1A14;
  --surface-3:#F8F9FB;
  --surface-4:rgba(12,26,20,0.8);
  --surface-5:#2FE07A;
  --text-1:#1A1A1A;
  --text-2:#D6FFE6;
  --text-3:#8A857C;
  --text-4:#C0C4CC;
  --line-1:rgba(47,224,122,0.33);
  --line-2:#E4E0D6;
  --line-3:#E3E6EC;
  --radius:50%;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/inbox-radar.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 S
