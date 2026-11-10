# 声音墙 — Style Reference

> 收集到的声音先漂浮铺开，再按“背后想完成的事”归成几列。

**想说明：** 先打散，再归类  
**分类：** 样式  
**Theme：** 浅色  
**样例：** `demos/voice-wall.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 调研反馈汇总
- 从零散诉求里找主题

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F5F3EE` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#1A1A1A` | — | 面 / 区块 |
| Text 1 | `#8A857C` | `--mut` | 文字 |
| Accent · 橙 | `#E4E0D6` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 40.96px | 700 | 51.2px | normal | `h1` | 这些话，大家应该都很熟。 |
| 14px | 400 | 22.4px | normal | `div.q` | 客户说导入的时候老是出错，能不能 |
| 14px | 700 | normal | normal | `button.on` | 打散 |
| 14px | 400 | normal | normal | `button` | 按来源 |
| 12px | 400 | normal | 1.8px | `small` | 第 0 段 · 开场 · 屏幕  |
| 12px | 400 | 20.4px | normal | `div.tip` | ：先停在「打散」，让大家看 10 |
| 12px | 700 | 20.4px | normal | `b` | 讲法 |
| 12px | 400 | normal | normal | `span` | 经过 CS / 销售转述 |
| 11px | 400 | 17.6px | normal | `small` | — CS 转述 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 16px | 13 |
| 9px | 3 |
| 14px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.267) 0px 6px 18px -10px` | 13 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.hd` — 491×79 @ (64, 29)，block
  - `div#tip.tip` — 280×41 @ (936, 29)，block
  - `div#wall.wall` — 1280×720 @ (0, 0)，block
  - `div.dock` — 266×56 @ (507, 635)，flex，底色 `#1A1A1A`，圆角 14px

## 步骤脚本

1. 打散
2. 按来源归列
3. 按被动 / 主动归列

## Do's and Don'ts

### Do

- 归类依据是想完成的事
- 每张卡写原话或贴近原话
- 归类后每列可再展开

### Don't

- 按来源分列，会和“入口不是互斥分类”冲突

## Agent Prompt Guide

**颜色速查：** `#F5F3EE`（背景 / 面），`#FFFFFF`（面 / 区块），`#1A1A1A`（面 / 区块），`#8A857C`（文字），`#E4E0D6`（描边）

```text
做一页「声音墙」形式的 HTML 演示：先打散，再归类。
适用：调研反馈汇总；从零散诉求里找主题。
做法：归类依据是想完成的事；每张卡写原话或贴近原话；归类后每列可再展开。
避免：按来源分列，会和“入口不是互斥分类”冲突。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `venn`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F5F3EE;
  --surface-1:#FFFFFF;
  --surface-2:#1A1A1A;
  --text-1:#8A857C;
  --line-1:#E4E0D6;
  --radius:16px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/voice-wall.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 Q
