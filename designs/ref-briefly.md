# SayBriefly · 判断与依据并排 — Style Reference

> 先用日常工作场景建立语境；判断放左边，原始材料放右边，关键差异用笔触高亮。

**想说明：** 让结论能被核对  
**分类：** 参考  
**Theme：** 浅色  
**原始参考：** <https://saybriefly.com/>  
**样例：** `demos/evidence-pair.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 证据纠偏：原来的判断 → 材料片段 → 关键差异 → 修正后的判断

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#FCFAF5` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#E9E3FF` | — | 面 / 区块 |
| Surface 3 | `#F6F4EE` | — | 面 / 区块 |
| Accent · 绿 | `#173300` | — | 文字 |
| Text 1 | `#1D2129` | `--fg` | 文字 |
| Text 2 | `#6B7280` | `--mut` | 文字 |
| Accent · 橙 | `#C26A00` | — | 文字 |
| Text 3 | `#7A6A9A` | — | 文字 |
| Accent · 紫 | `#7A5CFF` | — | 文字 |
| Accent · 橙 | `#E8E2D4` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 结论旁边， |
| 15px | 400 | 27px | normal | `div.step, div.msg, mark` | 原来的判断：搜索框用空格分隔多个 |
| 15px | 600 | 27px | normal | `div.fix` | 修正后：先整体匹配，再拆分匹配。 |
| 11px | 400 | normal | 1.54px | `p.eb` | 参考 · 判断与依据并排 |
| 11px | 400 | 19.8px | 1.1px | `small` | 判断 |
| 11px | 400 | normal | normal | `p.note` | 参考 SayBriefly 的并 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 16px | 2 |
| 10px | 2 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.pair` — 1212×510 @ (34, 130)，grid
  - `p.note` — 202×16 @ (1058, 640)，block

## 步骤脚本

1. 左边原来的判断，右边原始材料
2. 材料片段出现
3. 高亮关键差异
4. 修正后的判断

## Do's and Don'ts

### Do

- 高亮只指向引起判断变化的那几个字
- 插图讲语境，界面材料讲具体行为
- 不同来源的材料用同一套结构

### Don't

- 氛围插画代替真实证据
- 材料没有去标识

## Agent Prompt Guide

**颜色速查：** `#FCFAF5`（背景 / 面），`#FFFFFF`（面 / 区块），`#E9E3FF`（面 / 区块），`#F6F4EE`（面 / 区块），`#173300`（文字），`#1D2129`（文字）

```text
做一页「SayBriefly · 判断与依据并排」形式的 HTML 演示：让结论能被核对。
适用：证据纠偏：原来的判断 → 材料片段 → 关键差异 → 修正后的判断。
做法：高亮只指向引起判断变化的那几个字；插图讲语境，界面材料讲具体行为；不同来源的材料用同一套结构。
避免：氛围插画代替真实证据；材料没有去标识。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `clue-board`
- `annotate`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#FCFAF5;
  --surface-1:#FFFFFF;
  --surface-2:#E9E3FF;
  --surface-3:#F6F4EE;
  --text-1:#173300;
  --text-2:#1D2129;
  --text-3:#6B7280;
  --text-4:#C26A00;
  --text-5:#7A6A9A;
  --text-6:#7A5CFF;
  --line-1:#E8E2D4;
  --radius:16px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/evidence-pair.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-09 · 来源：案例交互和样式参考汇总 · 07
