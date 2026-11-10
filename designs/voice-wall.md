# 声音墙 — Style Reference

> 收集到的声音先漂浮铺开，再按“背后想完成的事”归成几列。

**想说明：** 先打散，再归类  
**分类：** 样式  
**Theme：** 深色  
**样例：** `demos/voice-wall.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 调研反馈汇总
- 从零散诉求里找主题

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Text 1 | `#1D2129` | — | 文字 |
| Text 2 | `#86909C` | — | 文字 |
| Text 3 | `#9A95A8` | `--mut` | 文字 |
| Text 4 | `#F3F1FF` | `--fg` | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 先听见所有声音， |
| 13px | 400 | normal | 1.04px | `div.col` | 找得到 |
| 13px | 400 | 19.5px | normal | `div.v` | 搜不到上周的文件 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | 16.5px | normal | `i` | 声音 1 |
| 11px | 400 | normal | normal | `p.note` | 内容为示意 · 归类依据是“想完 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 10px | 8 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.3) 0px 6px 16px 0px` | 8 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div#wl.wall` — 1212×524 @ (34, 120)，block
  - `p.note` — 239×16 @ (1021, 640)，block

## 步骤脚本

1. 先把听到的声音打散铺开
2. 再按“背后想完成的事”归成几列

## Do's and Don'ts

### Do

- 归类依据是想完成的事
- 每张卡写原话或贴近原话
- 归类后每列可再展开

### Don't

- 按来源分列，会和“入口不是互斥分类”冲突

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#FFFFFF`（面 / 区块），`#1D2129`（文字），`#86909C`（文字），`#9A95A8`（文字），`#F3F1FF`（文字）

```text
做一页「声音墙」形式的 HTML 演示：先打散，再归类。
适用：调研反馈汇总；从零散诉求里找主题。
做法：归类依据是想完成的事；每张卡写原话或贴近原话；归类后每列可再展开。
避免：按来源分列，会和“入口不是互斥分类”冲突。
步进：共 2 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `venn`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#FFFFFF;
  --text-1:#1D2129;
  --text-2:#86909C;
  --text-3:#9A95A8;
  --text-4:#F3F1FF;
  --text-5:#FFB547;
  --text-6:#B9A8FF;
  --radius:10px;
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
