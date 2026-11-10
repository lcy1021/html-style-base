# 章节横移 — Style Reference

> 整屏横向翻页：封面、背景、旅程、洞察、方案、结果、反思七章，滚轮或方向键翻一章，底部章节条显示进度、可直接跳。

**想说明：** 一个完整案例分成几章讲  
**分类：** 样式  
**Theme：** 深色  
**样例：** `demos/chapters.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 一次讲完整个项目的复盘
- 章节之间需要明显的停顿

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0B0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF / 2%` | — | 面 / 区块 |
| Accent · 绿 | `#B4FF4A` | — | 面 / 区块 |
| Accent · 紫 | `#2A2840` | — | 面 / 区块 |
| Accent · 品红 | `#FF7AB6` | — | 面 / 区块 |
| Accent · 紫 | `#8A6CFF` | — | 面 / 区块 |
| Text 1 | `#9A97B5` | `--mut` | 文字 |
| Text 2 | `#F2F0FF` | `--fg` | 文字 |
| Text 3 | `#111111` | — | 文字 |
| Accent · 紫 | `#26243A` | — | 描边 |
| Accent · 绿 | `#B4FF4A / 33%` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 281.6px | 900 | 253.44px | -14.08px | `span` | 0 |
| 102.4px | 900 | 102.4px | -3.072px | `span, em` | 把 3.5 天 |
| 61.952px | 900 | 55.7568px | normal | `small` | 天 |
| 22px | 700 | normal | normal | `b` | 01 |
| 21px | 700 | 29.4px | normal | `h3` | 理解成本是结构性的 |
| 17px | 400 | 30.6px | normal | `p.d` | 一个 UED 团队把 AI 引入 |
| 16px | 700 | normal | normal | `h4` | 结构化解析 |
| 15px | 400 | normal | normal | `span.lab` | PRD → 初稿耗时 |
| 14px | 700 | normal | normal | `b` | 收到 PRD |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 99px | 9 |
| 6px | 6 |
| 50% | 5 |
| 14px | 5 |
| 2px | 3 |
| 4px | 2 |

### Shadows

| Value | 次数 |
|---|---|
| `rgb(255, 122, 182) 0px 0px 18px 0px` | 2 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.brand` — 145×19 @ (115, 36)，block
  - `div.counter` — 66×25 @ (1099, 36)，block
  - `main#track.track` — 1280×720 @ (0, 0)，flex
  - `div.hud` — 1050×26 @ (115, 658)，flex

## 步骤脚本

1. 封面
2. 背景
3. 旅程
4. 洞察
5. 方案
6. 结果
7. 反思

## Do's and Don'ts

### Do

- 每章一屏，只放这一章的结论和一组证据
- 底部章节条始终可见，讲者可以跳回
- 翻页要有锁，避免滚轮一次翻过两章

### Don't

- 章节太多会变成翻 PPT
- 每章信息量不一致时节奏会忽快忽慢

## Agent Prompt Guide

**颜色速查：** `#0B0B12`（背景 / 面），`#FFFFFF / 2%`（面 / 区块），`#B4FF4A`（面 / 区块），`#2A2840`（面 / 区块），`#FF7AB6`（面 / 区块），`#8A6CFF`（面 / 区块）

```text
做一页「章节横移」形式的 HTML 演示：一个完整案例分成几章讲。
适用：一次讲完整个项目的复盘；章节之间需要明显的停顿。
做法：每章一屏，只放这一章的结论和一组证据；底部章节条始终可见，讲者可以跳回；翻页要有锁，避免滚轮一次翻过两章。
避免：章节太多会变成翻 PPT；每章信息量不一致时节奏会忽快忽慢。
步进：共 7 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `scroll-story`
- `ref-column`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0B0B12;
  --surface-1:rgba(255,255,255,0.02);
  --surface-2:#B4FF4A;
  --surface-3:#2A2840;
  --surface-4:#FF7AB6;
  --surface-5:#8A6CFF;
  --text-1:#9A97B5;
  --text-2:#F2F0FF;
  --text-3:#111111;
  --line-1:#26243A;
  --line-2:rgba(180,255,74,0.33);
  --radius:99px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/chapters.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 C
