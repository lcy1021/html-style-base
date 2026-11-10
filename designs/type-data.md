# 数据发现 — Style Reference

> 典型场景：“同一批需求用两种优先级方法排出来不一样”“按钮名称长度的真实分布决定限制多少字”。

**想说明：** 用可追溯的数据呈现差异  
**分类：** 方法  
**Theme：** 浅色  
**样例：** `demos/slope.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 手里有原始数据和方法依据

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F4F3EF` | `--bg` | 背景 / 面 |
| Text 1 | `#1D2129` | `--fg` | 文字 |
| Text 2 | `#6B7280` | `--mut` | 文字 |
| Accent · 橙 | `#B86E00` | `--amber` | 文字 |
| Accent · 紫 | `#6A55D6` | `--violet` | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 同一批需求，两种排序 |
| 13px | 400 | normal | normal | `div.it` | 需求 A |
| 12px | 700 | normal | normal | `h5, h5.on` | 内部评分 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 数据为示意 |
| 11px | 400 | normal | normal | `p.note` | 真实使用时只放真实数据 |

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
  - `div#ch.ch` — 973×520 @ (154, 120)，block
  - `p.note` — 121×16 @ (1139, 640)，block

## 步骤脚本

1. 先按我们的评分排
2. 再看用户的排序：连线交叉
3. 交叉越多，越要回头核对输入

## Do's and Don'ts

### Do

- 统一讲法：先提出数据能回答的问题，再让数据移动
- 主讲形式：数据叙事
- 现成样例：斜率图、权衡模拟器（仅限真实数据）

### Don't

- 没有原始分布不画图
- 分数本身不能代替判断

## Agent Prompt Guide

**颜色速查：** `#F4F3EF`（背景 / 面），`#1D2129`（文字），`#6B7280`（文字），`#B86E00`（文字），`#6A55D6`（文字）

```text
做一页「数据发现」形式的 HTML 演示：用可追溯的数据呈现差异。
适用：手里有原始数据和方法依据。
做法：统一讲法：先提出数据能回答的问题，再让数据移动；主讲形式：数据叙事；现成样例：斜率图、权衡模拟器（仅限真实数据）。
避免：没有原始分布不画图；分数本身不能代替判断。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `ref-pudding`
- `slope`
- `tradeoff`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F4F3EF;
  --text-1:#1D2129;
  --text-2:#6B7280;
  --text-3:#B86E00;
  --text-4:#6A55D6;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/slope.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：案例与演示形式总表 · 五类案例
