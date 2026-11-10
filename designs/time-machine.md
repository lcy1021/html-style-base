# 版本时间机器 — Style Reference

> 拖动时间轴，同一个组件原地变形；每一版的改动用小标签标在变化的位置。

**想说明：** 一个组件经历了几版演进  
**分类：** 样式  
**Theme：** 浅色  
**样例：** `demos/time-machine.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 分阶段改版
- 解释“为什么现在长这样”

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F4F3EF` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#F3F1FF` | — | 面 / 区块 |
| Surface 3 | `#E8E3FF` | — | 面 / 区块 |
| Accent · 橙 | `#B86E00` | `--amber` | 面 / 区块 |
| Text 1 | `#1D2129` | `--fg` | 文字 |
| Text 2 | `#6B7280` | `--mut` | 文字 |
| Text 3 | `#86909C` | — | 文字 |
| Accent · 紫 | `#6A55D6` | `--violet` | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 同一个组件， |
| 18px | 500 | 32.4px | normal | `b` | v3 · 按部门分组 |
| 15px | 700 | normal | normal | `h4` | 选择成员 |
| 14px | 400 | normal | normal | `div.it` | 成员 A |
| 14px | 400 | 25.2px | normal | `div.ver` | 分组标题从上方插入，原有行不跳动 |
| 13px | 400 | normal | normal | `span` | 2024 · v1 |
| 12.5px | 400 | normal | normal | `small` | v3 |
| 12px | 400 | normal | normal | `div.grp, span.x` | 产品部 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 8px | 3 |
| 50% | 3 |
| 14px | 1 |
| 99px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.4) 0px 20px 50px 0px` | 1 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.vs` — 560×269 @ (360, 120)，block，底色 `#FFFFFF`，圆角 14px
  - `div#vt.ver` — 307×58 @ (939, 130)，block
  - `div.tl` — 1212×16 @ (34, 620)，flex
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. v1：平铺的成员列表
2. v2：加入头像和已选状态
3. v3：按部门分组（也可以直接拖时间轴）

## Do's and Don'ts

### Do

- 元素原地变形，不整张替换
- 改动标签只在当前版本出现
- 每版配一句改动理由

### Don't

- 把讨论过的方案说成已上线
- 版本太多时只挑关键几版

## Agent Prompt Guide

**颜色速查：** `#F4F3EF`（背景 / 面），`#FFFFFF`（面 / 区块），`#F3F1FF`（面 / 区块），`#E8E3FF`（面 / 区块），`#B86E00`（面 / 区块），`#1D2129`（文字）

```text
做一页「版本时间机器」形式的 HTML 演示：一个组件经历了几版演进。
适用：分阶段改版；解释“为什么现在长这样”。
做法：元素原地变形，不整张替换；改动标签只在当前版本出现；每版配一句改动理由。
避免：把讨论过的方案说成已上线；版本太多时只挑关键几版。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `scroll-story`
- `morph`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F4F3EF;
  --surface-1:#FFFFFF;
  --surface-2:#F3F1FF;
  --surface-3:#E8E3FF;
  --surface-4:#B86E00;
  --text-1:#1D2129;
  --text-2:#6B7280;
  --text-3:#86909C;
  --text-4:#6A55D6;
  --radius:8px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/time-machine.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 E
