# 假设积木塔 — Style Reference

> 方案搭在几层假设上；点掉一块，依赖它的跟着倒；按“带走多少”排验证顺序。

**想说明：** 假设之间的依赖和验证顺序  
**分类：** 样式  
**Theme：** 浅色  
**样例：** `demos/block-tower.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 从零开始的方案
- 讨论先验证什么

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F5F3EE` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Accent · 蓝 | `#A5D8FF` | — | 面 / 区块 |
| Accent · 橙 | `#FFD8A8` | — | 面 / 区块 |
| Accent · 绿 | `#B2F2BB` | — | 面 / 区块 |
| Surface 2 | `#F0EDE6` | — | 面 / 区块 |
| Text 1 | `#1A1A1A` | — | 文字 |
| Text 2 | `#8A857C` | `--mut` | 文字 |
| Text 3 | `#000000 / 60%` | — | 文字 |
| Accent · 橙 | `#E8590C` | — | 文字 |
| Text 4 | `#000000` | — | 文字 |
| Accent · 橙 | `#E4E0D6` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 48px | 900 | 48px | normal | `div.big` | — |
| 40.96px | 700 | 51.2px | normal | `h1` | 0 到 1 全是假设。点一块积木 |
| 15px | 700 | normal | normal | `h3` | 点击任意一块积木 |
| 14px | 400 | normal | normal | `button, button.p` | 复原 |
| 13px | 700 | 18.2px | normal | `b` | 角色链 |
| 13px | 400 | 18.85px | normal | `div.blk` | 主要用户是区域经理 |
| 13px | 400 | 22.1px | normal | `p` | 看看它错了，上面有多少判断会跟着 |
| 13px | 800 | normal | normal | `i` | 1 |
| 13px | 400 | normal | normal | `span` | 使用者会信任 AI 给的数字 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 8px | 11 |
| 3px | 6 |
| 16px | 2 |
| 10px | 2 |

### Shadows

| Value | 次数 |
|---|---|
| `rgb(26, 26, 26) 3px 3px 0px 0px` | 11 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.hd` — 1280×159 @ (0, 0)，block
  - `div.main` — 1280×641 @ (0, 159)，grid

## 步骤脚本

1. 完整的假设塔
2. 抽掉：使用者会信任 AI 给的数字
3. 抽掉：用户先在看板里发现异常，再追问原因
4. 抽掉：入口嵌在看板里
5. 抽掉：购买决策人是 IT 负责人

## Do's and Don'ts

### Do

- 底层放最基础的假设
- 积木可以直接点
- 最后给出验证顺序

### Don't

- 假设是教学示意时必须标出

## Agent Prompt Guide

**颜色速查：** `#F5F3EE`（背景 / 面），`#FFFFFF`（面 / 区块），`#A5D8FF`（面 / 区块），`#FFD8A8`（面 / 区块），`#B2F2BB`（面 / 区块），`#F0EDE6`（面 / 区块）

```text
做一页「假设积木塔」形式的 HTML 演示：假设之间的依赖和验证顺序。
适用：从零开始的方案；讨论先验证什么。
做法：底层放最基础的假设；积木可以直接点；最后给出验证顺序。
避免：假设是教学示意时必须标出。
步进：共 5 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `growth-tree`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F5F3EE;
  --surface-1:#FFFFFF;
  --surface-2:#A5D8FF;
  --surface-3:#FFD8A8;
  --surface-4:#B2F2BB;
  --surface-5:#F0EDE6;
  --text-1:#1A1A1A;
  --text-2:#8A857C;
  --text-3:rgba(0,0,0,0.6);
  --text-4:#E8590C;
  --text-5:#000000;
  --line-1:#E4E0D6;
  --radius:8px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/block-tower.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 V
