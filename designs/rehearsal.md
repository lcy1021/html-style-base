# 情景预演 — Style Reference

> 左边设计师的逻辑，右边用户的场景；盖章“改！”→ 用户照常操作出错 → 盖章“回退”→ 底部“逻辑上对｜场景上错”。

**想说明：** 逻辑上对、场景上错的反例  
**分类：** 案例展示  
**Theme：** 浅色  
**样例：** `demos/rehearsal.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 主动优化前的验证
- 上线后回退的复盘

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F4F3EF` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#EAF6EC` | — | 面 / 区块 |
| Surface 3 | `#FDF0EF` | — | 面 / 区块 |
| Surface 4 | `#1D2129` | `--fg` | 面 / 区块 |
| Surface 5 | `#EAF1FF` | — | 面 / 区块 |
| Text 1 | `#4E5969` | — | 文字 |
| Text 2 | `#86909C` | — | 文字 |
| Accent · 红 | `#D93A3A` | — | 文字 |
| Accent · 红 | `#B5482B` | — | 文字 |
| Line 1 | `#E6E2DA` | — | 描边 |
| Line 2 | `#EBE8E2` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 主动优化前，先在用户的场景里 |
| 28px | 700 | normal | normal | `div.sum` | 3 个项目 |
| 24px | 800 | normal | normal | `span.stamp` | 改！ |
| 22px | 400 | 35.2px | normal | `p.hand` | “全部”就应该包含所有项目，包括 |
| 19px | 700 | normal | normal | `b` | 逻辑上对 |
| 17px | 800 | normal | normal | `span.stamp` | 上线后回退 |
| 13px | 400 | 19.5px | normal | `div.say` | 怎么混进了归档项目？我归档就是不 |
| 13px | 600 | normal | normal | `div.all` | 全部 |
| 13px | 400 | normal | normal | `div, div.hid, span` | 项目 A |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 18px | 2 |
| 12px | 1 |
| 8px | 1 |
| 14px | 1 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.g` — 1212×490 @ (34, 110)，grid
  - `div.split.on` — 1212×71 @ (34, 587)，grid，圆角 14px
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 先看设计师的推理：逻辑上成立
2. 盖章：照逻辑改了
3. 用户照常操作，结果出乎意料
4. 逻辑上对，场景上错 → 回退

## Do's and Don'ts

### Do

- 反例要演完整：正常 → 出问题 → 对用户的影响
- 用盖章表示决定，用光标 / 气泡表示用户
- 结论条紧跟卡片，不压在画面上

### Don't

- 不要编造金额、数量等具体数据；用示意并注明

## Agent Prompt Guide

**颜色速查：** `#F4F3EF`（背景 / 面），`#FFFFFF`（面 / 区块），`#EAF6EC`（面 / 区块），`#FDF0EF`（面 / 区块），`#1D2129`（面 / 区块），`#EAF1FF`（面 / 区块）

```text
做一页「情景预演」形式的 HTML 演示：逻辑上对、场景上错的反例。
适用：主动优化前的验证；上线后回退的复盘。
做法：反例要演完整：正常 → 出问题 → 对用户的影响；用盖章表示决定，用光标 / 气泡表示用户；结论条紧跟卡片，不压在画面上。
避免：不要编造金额、数量等具体数据；用示意并注明。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F4F3EF;
  --surface-1:#FFFFFF;
  --surface-2:#EAF6EC;
  --surface-3:#FDF0EF;
  --surface-4:#1D2129;
  --surface-5:#EAF1FF;
  --text-1:#4E5969;
  --text-2:#86909C;
  --text-3:#D93A3A;
  --text-4:#B5482B;
  --line-1:#E6E2DA;
  --line-2:#EBE8E2;
  --radius:18px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/rehearsal.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：UED 需求分析分享（2.5）
