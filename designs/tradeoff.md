# 权衡模拟器 — Style Reference

> 滑块控制一个参数，两条曲线同时变化，右侧读数实时更新。

**想说明：** 两个指标此消彼长  
**分类：** 样式  
**Theme：** 浅色  
**样例：** `demos/tradeoff.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 有真实分布数据的参数取舍

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#FAFAFA` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#F9F9FB` | — | 面 / 区块 |
| Text 1 | `#1C1C1E` | — | 文字 |
| Text 2 | `#48484A` | — | 文字 |
| Text 3 | `#8E8E93` | `--mut` | 文字 |
| Accent · 紫 | `#5E5CE6` | — | 文字 |
| Accent · 绿 | `#34C759` | — | 文字 |
| Accent · 红 | `#FF3B30` | — | 文字 |
| Line 1 | `#E5E5EA` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 64px | 700 | 71.68px | -1.28px | `h1, span.a, span.b` | 数据表格该有多“密”？和给出了相 |
| 18px | 400 | 32.4px | normal | `p` | 下面是一个可以自己动手的模拟器。 |
| 15px | 700 | normal | normal | `b` | 表格实时预览 |
| 14.4px | 600 | normal | normal | `div.c` | 门店 |
| 14.4px | 400 | normal | normal | `div.c, span.up, span.dn` | 杭州西湖 |
| 13px | 600 | normal | normal | `small` | CASE · 信息密度设计 ·  |
| 12px | 400 | normal | normal | `span` | 一屏 8 行 · 4 列 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 20px | 2 |
| 14px | 2 |
| 12px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.06) 0px 1px 3px 0px, rgba(0, 0, 0, 0.2) 0px 20px 50px -30px` | 2 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `section.hero` — 1200×388 @ (0, 0)，block
  - `section.lab` — 1280×749 @ (0, 388)，grid

## 步骤脚本

1. 数据表格该有多“密”？ 新手和专家给出了相反的答案。
2. 数据表格该有多“密”？ 新手和专家给出了相反的答案。（续）
3. 最终答案不是选一个点，而是默认标准 + 让用户自己切换。

## Do's and Don'ts

### Do

- 坐标轴写清方向
- 读数和曲线同时变
- 没有真实数据时页面必须标“示意曲线”

### Don't

- 用拟合曲线冒充真实数据
- 曲线太多读不过来

## Agent Prompt Guide

**颜色速查：** `#FAFAFA`（背景 / 面），`#FFFFFF`（面 / 区块），`#F9F9FB`（面 / 区块），`#1C1C1E`（文字），`#48484A`（文字），`#8E8E93`（文字）

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
  --canvas:#FAFAFA;
  --surface-1:#FFFFFF;
  --surface-2:#F9F9FB;
  --text-1:#1C1C1E;
  --text-2:#48484A;
  --text-3:#8E8E93;
  --text-4:#5E5CE6;
  --text-5:#34C759;
  --text-6:#FF3B30;
  --line-1:#E5E5EA;
  --radius:20px;
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
