# 诊断仪 — Style Reference

> 几个信号各自用滑块调，指针给出“继续补 / 带着假设推进 / 可以推进”。

**想说明：** 分析到什么程度算够  
**分类：** 样式  
**Theme：** 浅色  
**样例：** `demos/diagnose.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 讲判断标准
- 现场换一个需求试试

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F5F3EE` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#FFF8E6` | — | 面 / 区块 |
| Surface 3 | `#1A1A1A` | — | 面 / 区块 |
| Text 1 | `#8A857C` | `--mut` | 文字 |
| Text 2 | `#000000` | — | 文字 |
| Text 3 | `#555555` | — | 文字 |
| Accent · 橙 | `#E67700` | — | 文字 |
| Accent · 橙 | `#E4E0D6` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 40.96px | 700 | 51.2px | normal | `h1` | 做到什么程度算够？看四个信号，而 |
| 30px | 900 | normal | normal | `div.v` | 轻量确认 |
| 14px | 600 | normal | normal | `div.l` | 影响范围 |
| 14px | 400 | 23.8px | normal | `div.d, div.q` | 挑一个会改变决定的未知去确认，其 |
| 14px | 700 | 23.8px | normal | `b` | 现在缺的信息，会不会改变我们马上 |
| 13px | 400 | normal | normal | `button, button.on` | 改一个按钮文案 |
| 12px | 400 | normal | 1.8px | `small` | 第 3 段 · 不同背景下，什么 |
| 12px | 400 | normal | normal | `span, p` | 中 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 99px | 4 |
| 22px | 1 |
| 12px | 1 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.hd` — 1280×159 @ (0, 0)，block
  - `section.sec` — 1152×527 @ (64, 181)，block

## 步骤脚本

1. 做到什么程度算够？ 看四个信号，而不是看时间够不够。
2. 不同场景下，“够了”长什么样
3. 不同场景下，“够了”长什么样（续）
4. 好的分析，浓缩成一句话

## Do's and Don'ts

### Do

- 信号名称用问题写
- 刻度只帮助讨论
- 允许多个未知同时存在

### Don't

- 只留一个筛子会和“多个未知共同阻断”冲突
- 把刻度当成算法

## Agent Prompt Guide

**颜色速查：** `#F5F3EE`（背景 / 面），`#FFFFFF`（面 / 区块），`#FFF8E6`（面 / 区块），`#1A1A1A`（面 / 区块），`#8A857C`（文字），`#000000`（文字）

```text
做一页「诊断仪」形式的 HTML 演示：分析到什么程度算够。
适用：讲判断标准；现场换一个需求试试。
做法：信号名称用问题写；刻度只帮助讨论；允许多个未知同时存在。
避免：只留一个筛子会和“多个未知共同阻断”冲突；把刻度当成算法。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `checklist`
- `fill-record`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F5F3EE;
  --surface-1:#FFFFFF;
  --surface-2:#FFF8E6;
  --surface-3:#1A1A1A;
  --text-1:#8A857C;
  --text-2:#000000;
  --text-3:#555555;
  --text-4:#E67700;
  --line-1:#E4E0D6;
  --radius:99px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/diagnose.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 Y
