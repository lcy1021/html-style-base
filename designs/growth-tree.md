# 需求生长图 — Style Reference

> 从一个诉求长出分支，再依次标记砍掉、延后，剩下的就是 MVP。

**想说明：** 范围怎么收敛到 MVP  
**分类：** 样式  
**Theme：** 浅色  
**样例：** `demos/growth-tree.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 从零定义新模块
- 讨论范围和优先级

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#FBF7F0` | `--bg` | 背景 / 面 |
| Surface 1 | `#2B2622` | — | 面 / 区块 |
| Surface 2 | `#FFFFFF` | — | 面 / 区块 |
| Text 1 | `#968B7E` | `--mut` | 文字 |
| Text 2 | `#000000` | — | 文字 |
| Accent · 橙 | `#E0D5C5` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 700 | 39px | normal | `h1` | “做一个 AI 分析助手”是怎么 |
| 16px | 700 | 24px | normal | `span.t` | 老板：做一个 AI 分析助手 |
| 15px | 700 | normal | normal | `b` | 原始需求 |
| 14px | 400 | 25.2px | normal | `p` | 一句话需求，经过 4 步：发散、 |
| 14px | 600 | normal | normal | `button, button.p` | 上一步 |
| 14px | 700 | normal | normal | `h4` | 📌 MVP 范围（v1.0） |
| 13px | 700 | normal | normal | `i` | 0 |
| 12px | 400 | normal | 1.8px | `small` | CASE · 需求分析 · 示例 |
| 12px | 400 | 20.4px | normal | `span` | 只有一句话。此时任何方案都是猜测 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 50% | 5 |
| 21px | 2 |
| 24px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(107, 85, 51, 0.4) 0px 6px 18px -8px` | 1 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.wrap` — 1280×836 @ (0, 0)，grid

## 步骤脚本

1. 原始需求
2. 发散：四个追问维度
3. 追问：每个维度展开
4. 收敛：砍掉与延后
5. 定义 MVP

## Do's and Don'ts

### Do

- 先让分支全部长出来，不急着评价
- 砍掉 / 延后 / MVP 用三种样式
- 根节点写诉求，不写功能

### Don't

- 没有真实案例时只能标“教学示意”

## Agent Prompt Guide

**颜色速查：** `#FBF7F0`（背景 / 面），`#2B2622`（面 / 区块），`#FFFFFF`（面 / 区块），`#968B7E`（文字），`#000000`（文字），`#E0D5C5`（描边）

```text
做一页「需求生长图」形式的 HTML 演示：范围怎么收敛到 MVP。
适用：从零定义新模块；讨论范围和优先级。
做法：先让分支全部长出来，不急着评价；砍掉 / 延后 / MVP 用三种样式；根节点写诉求，不写功能。
避免：没有真实案例时只能标“教学示意”。
步进：共 5 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `block-tower`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#FBF7F0;
  --surface-1:#2B2622;
  --surface-2:#FFFFFF;
  --text-1:#968B7E;
  --text-2:#000000;
  --line-1:#E0D5C5;
  --radius:50%;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/growth-tree.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 N
