# 清单逐条打勾 — Style Reference

> 标准逐条打勾，每条下面挂“本例”的事实，最后亮出结论。

**想说明：** 一套判断标准  
**分类：** 样式  
**Theme：** 浅色  
**样例：** `demos/checklist.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- “做到什么程度算够”
- 评审 / 验收标准

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F4F3EF` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#F5F7FA` | — | 面 / 区块 |
| Accent · 蓝 | `#165DFF` | — | 面 / 区块 |
| Accent · 绿 | `#00B42A` | — | 面 / 区块 |
| Text 1 | `#4E5969` | — | 文字 |
| Text 2 | `#1D2129` | `--fg` | 文字 |
| Text 3 | `#86909C` | — | 文字 |
| Accent · 红 | `#B5482B` | — | 文字 |
| Accent · 紫 | `#5B3FD6` | — | 文字 |
| Line 1 | `#F0F1F3` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 26px | 400 | 33.8px | normal | `h2, em` | 三条都满足， |
| 17px | 700 | normal | normal | `b` | 现有依据，能支持当前取舍 |
| 16px | 400 | normal | normal | `i` | ✓ |
| 16px | 600 | normal | normal | `div.go` | 可以推进 → |
| 15px | 600 | normal | normal | `div.hd` | 够了吗？ |
| 14px | 400 | 25.2px | normal | `p` | 标准挂在具体案例上讲，每条下面放 |
| 13px | 400 | normal | normal | `small` | 两个任务已分清，用户本来就有替代 |
| 13px | 600 | normal | normal | `em` | 本例 |
| 12px | 400 | normal | normal | `span` | 三条都打勾，就可以推进 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 50% | 3 |
| 9px | 3 |
| 18px | 1 |
| 99px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(29, 33, 41, 0.12) 0px 24px 60px 0px` | 1 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.side` — 384×128 @ (34, 267)，block
  - `div.card` — 560×396 @ (686, 133)，block，底色 `#FFFFFF`，圆角 18px
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 标准一：现有依据够不够
2. 标准二：未知有没有处理办法
3. 标准三：再补信息会不会改变决定
4. 三条都满足：可以推进

## Do's and Don'ts

### Do

- 标准放在案例之后讲，挂上本例事实
- 标题一行，说明放进浅底标签块
- 卡片宽度按 vw，大屏不要被缩窄

### Don't

- 只把标准做成三行小字，页面上看不见重点

## Agent Prompt Guide

**颜色速查：** `#F4F3EF`（背景 / 面），`#FFFFFF`（面 / 区块），`#F5F7FA`（面 / 区块），`#165DFF`（面 / 区块），`#00B42A`（面 / 区块），`#4E5969`（文字）

```text
做一页「清单逐条打勾」形式的 HTML 演示：一套判断标准。
适用：“做到什么程度算够”；评审 / 验收标准。
做法：标准放在案例之后讲，挂上本例事实；标题一行，说明放进浅底标签块；卡片宽度按 vw，大屏不要被缩窄。
避免：只把标准做成三行小字，页面上看不见重点。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F4F3EF;
  --surface-1:#FFFFFF;
  --surface-2:#F5F7FA;
  --surface-3:#165DFF;
  --surface-4:#00B42A;
  --text-1:#4E5969;
  --text-2:#1D2129;
  --text-3:#86909C;
  --text-4:#B5482B;
  --text-5:#5B3FD6;
  --line-1:#F0F1F3;
  --radius:50%;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/checklist.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：UED 需求分析分享（3.2）
