# 对话回放 — Style Reference

> 群聊式回放：消息逐条打出，可暂停、调速、跳到关键节点，把一个需求从模糊到说清的过程还原出来。

**想说明：** 需求怎样在对话里被问清楚  
**分类：** 样式  
**Theme：** 浅色  
**样例：** `demos/chat-replay.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 讲追问方法
- 沟通推进的示范

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#ECEEF1` | `--bg` | 背景 / 面 |
| Surface 1 | `#F7F8FA` | — | 面 / 区块 |
| Surface 2 | `#FFFFFF` | — | 面 / 区块 |
| Surface 3 | `#E8EAEE` | — | 面 / 区块 |
| Surface 4 | `#1D2129` | — | 面 / 区块 |
| Surface 5 | `#86909C` | `--mut` | 面 / 区块 |
| Text 1 | `#000000` | — | 文字 |
| Line 1 | `#E5E6EB` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 24px | 700 | 32.4px | normal | `h1` | “两个看板的销售额对不上”——一 |
| 15px | 700 | normal | normal | `b` | 【需求】销售额口径对齐 |
| 13px | 400 | 23.4px | normal | `p, div.empty` | 按时间顺序回放项目群的真实对话。 |
| 13px | 600 | normal | normal | `span` | Day 1 · 抛出问题 |
| 13px | 400 | normal | normal | `span, div.av, button.pri` | Day 3 · 用户访谈 |
| 12px | 400 | normal | normal | `span` | 5 人 |
| 11px | 400 | normal | 1.65px | `small` | CASE · 需求澄清 · 示例 |
| 11px | 400 | normal | normal | `i` | PM |
| 11px | 500 | normal | 1.65px | `h4` | 设计师笔记 · 自动从关键节点提 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 50% | 8 |
| 8px | 7 |
| 99px | 1 |
| 4px | 1 |
| 2px | 1 |
| 10px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.05) 0px 2px 8px 0px` | 1 |
| `rgba(0, 0, 0, 0.04) 0px 1px 2px 0px` | 1 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.app` — 1280×720 @ (0, 0)，grid

## 步骤脚本

1. 单步

## Do's and Don'ts

### Do

- 只放推动理解的几句
- 关键句高亮，笔记同步出现
- 页面标明“示范，不是会议原话”

### Don't

- 把示范对话当成真实记录
- 对话太长，听众跟不上

## Agent Prompt Guide

**颜色速查：** `#ECEEF1`（背景 / 面），`#F7F8FA`（面 / 区块），`#FFFFFF`（面 / 区块），`#E8EAEE`（面 / 区块），`#1D2129`（面 / 区块），`#86909C`（面 / 区块）

```text
做一页「对话回放」形式的 HTML 演示：需求怎样在对话里被问清楚。
适用：讲追问方法；沟通推进的示范。
做法：只放推动理解的几句；关键句高亮，笔记同步出现；页面标明“示范，不是会议原话”。
避免：把示范对话当成真实记录；对话太长，听众跟不上。
步进：共 1 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `case-intro`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#ECEEF1;
  --surface-1:#F7F8FA;
  --surface-2:#FFFFFF;
  --surface-3:#E8EAEE;
  --surface-4:#1D2129;
  --surface-5:#86909C;
  --text-1:#000000;
  --line-1:#E5E6EB;
  --radius:50%;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/chat-replay.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 G
