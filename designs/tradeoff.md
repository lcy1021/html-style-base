# 权衡模拟器 — Style Reference

> 滑块控制一个参数，两条曲线同时变化，右侧读数实时更新。

**想说明：** 两个指标此消彼长  
**分类：** 案例展示  
**Theme：** 深色  
**样例：** `demos/tradeoff.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 有真实分布数据的参数取舍

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Text 1 | `#F3F1FF` | `--fg` | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Text 2 | `#9A95A8` | `--mut` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Accent · 青 | `#5AD0B3` | `--teal` | 文字 |
| Accent · 红 | `#FF6B5A` | `--red` | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 限制越严， |
| 26px | 500 | 49.4px | normal | `b` | 50% |
| 15px | 400 | 28.5px | normal | `div.t, div.r` | 会换行的场景 |
| 13px | 400 | normal | normal | `div.ctl, span` | 字数上限 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示意曲线 · 不是真实数据 |

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
  - `div.g` — 768×450 @ (34, 120)，block
  - `div.ctl` — 768×19 @ (34, 625)，flex
  - `div.rd` — 358×156 @ (888, 140)，block

## 步骤脚本

1. 两个指标此消彼长
2. 拖动滑块，看平衡点怎么移动
3. 只用在有真实数据的时候

## Do's and Don'ts

### Do

- 坐标轴写清方向
- 读数和曲线同时变
- 没有真实数据时页面必须标“示意曲线”

### Don't

- 用拟合曲线冒充真实数据
- 曲线太多读不过来

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#FFFFFF`（面 / 区块），`#F3F1FF`（文字），`#FFB547`（文字），`#9A95A8`（文字），`#B9A8FF`（文字）

```text
做一页「权衡模拟器」形式的 HTML 演示：两个指标此消彼长。
适用：有真实分布数据的参数取舍。
做法：坐标轴写清方向；读数和曲线同时变；没有真实数据时页面必须标“示意曲线”。
避免：用拟合曲线冒充真实数据；曲线太多读不过来。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `slope`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#FFFFFF;
  --text-1:#F3F1FF;
  --text-2:#FFB547;
  --text-3:#9A95A8;
  --text-4:#B9A8FF;
  --text-5:#5AD0B3;
  --text-6:#FF6B5A;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/tradeoff.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 J
