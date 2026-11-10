# Column · 结构概览 + 固定演示区 — Style Reference

> 顶部一张结构图收拢一次；往下读时左边是短段文字，右边演示区位置不动、内容随段落换模型，整组讲完一起退出。

**想说明：** 先理解整体关系，再逐段解释  
**分类：** 外部参考  
**Theme：** 深色  
**原始参考：** <https://column.com/>  
**样例：** `demos/sticky-stage.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 任务还原：人物、材料、上下游
- 路径与状态的分段讲解

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#011821` | — | 背景 / 面 |
| Accent · 青 | `#C1E8EF / 8%` | — | 面 / 区块 |
| Accent · 青 | `#C1E8EF` | — | 面 / 区块 |
| Accent · 青 | `#C1E8EF / 10%` | — | 面 / 区块 |
| Text 1 | `#FFFFFF / 60%` | — | 文字 |
| Text 2 | `#FFFFFF / 40%` | — | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Accent · 青 | `#C1E8EF / 40%` | — | 描边 |
| Accent · 青 | `#C1E8EF / 12%` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 先看整体关系， |
| 22px | 500 | normal | normal | `h3` | 这份材料经过四层。 |
| 15px | 400 | 27px | normal | `p` | 先把角色和中间环节都摆出来，后面 |
| 14px | 400 | normal | normal | `div.fl, span.hi, span` | → |
| 13px | 400 | normal | normal | `div.ly` | 使用方 |
| 11px | 400 | normal | 1.54px | `p.eb` | 参考 · 结构概览 + 分段讲解 |
| 11px | 400 | normal | normal | `p.note` | 参考 Column 首页的讲解结 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 8px | 6 |
| 10px | 1 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.rt` — 691×520 @ (555, 110)，block，圆角 10px
  - `p.note` — 211×16 @ (1049, 640)，block

## 步骤脚本

1. 顶部先给整体结构
2. 结构收拢：中间环节变少
3. 左边讲第一段，右边固定区换成对应示意
4. 第二段：同一个容器，换一种模型

## Do's and Don'ts

### Do

- 左侧每个判断对应右侧一次变化
- 演示区只在一个模块内固定
- 同一容器可以换不同的示意模型
- 窄屏改成“一段说明 + 一张图”纵向配对

### Don't

- 照搬深色细字，投影上看不清
- 把产品链接做成像切换标签

## Agent Prompt Guide

**颜色速查：** `#011821`（背景 / 面），`#C1E8EF / 8%`（面 / 区块），`#C1E8EF`（面 / 区块），`#C1E8EF / 10%`（面 / 区块），`#FFFFFF / 60%`（文字），`#FFFFFF / 40%`（文字）

```text
做一页「Column · 结构概览 + 固定演示区」形式的 HTML 演示：先理解整体关系，再逐段解释。
适用：任务还原：人物、材料、上下游；路径与状态的分段讲解。
做法：左侧每个判断对应右侧一次变化；演示区只在一个模块内固定；同一容器可以换不同的示意模型；窄屏改成“一段说明 + 一张图”纵向配对。
避免：照搬深色细字，投影上看不清；把产品链接做成像切换标签。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `scroll-story`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#011821;
  --surface-1:rgba(193,232,239,0.08);
  --surface-2:#C1E8EF;
  --surface-3:rgba(193,232,239,0.1);
  --text-1:rgba(255,255,255,0.6);
  --text-2:rgba(255,255,255,0.4);
  --text-3:#FFB547;
  --text-4:#B9A8FF;
  --line-1:rgba(193,232,239,0.4);
  --line-2:rgba(193,232,239,0.12);
  --radius:8px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/sticky-stage.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-09 · 来源：案例交互和样式参考汇总 · 03
