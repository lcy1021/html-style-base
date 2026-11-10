# 线索板 — Style Reference

> 证据像便签一样一张张钉到板上，红线把它们连起来，最后盖章给出结论。

**想说明：** 多条证据拼出一个结论  
**分类：** 样式  
**Theme：** 深色  
**样例：** `demos/clue-board.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 结论来自几种不同来源的材料
- 证据纠偏、复盘

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Accent · 橙 | `#2A2118` | — | 面 / 区块 |
| Surface 1 | `#FFFBE8` | — | 面 / 区块 |
| Accent · 橙 | `#2A2118 / 85%` | — | 面 / 区块 |
| Text 1 | `#2B2B2B` | — | 文字 |
| Text 2 | `#F3F1FF` | `--fg` | 文字 |
| Accent · 红 | `#E5483A` | — | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Accent · 橙 | `#A0662A` | — | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 几条证据， |
| 20px | 700 | normal | normal | `div.stamp` | 问题在命名，不在拆分 |
| 13px | 400 | 20.8px | normal | `div.cl` | “每次导完都要手动改文件名。” |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | 17.6px | normal | `small` | 反馈 |
| 11px | 400 | normal | normal | `p.note` | 内容为示意 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 4px | 3 |
| 14px | 1 |
| 6px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.4) 0px 8px 20px 0px` | 3 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div#bd.board` — 1212×524 @ (34, 120)，block，底色 `#2A2118`，圆角 14px
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 一条一条把证据钉上去
2. 第二条证据
3. 第三条证据
4. 红线把证据连起来
5. 盖章：几条证据一起指向的结论

## Do's and Don'ts

### Do

- 每张便签写清来源类型（反馈 / 观察 / 材料）
- 先全部钉完再连线
- 结论用一句话盖章

### Don't

- 编造的指标（如“流失 8 秒”）会让整板失去可信度
- 线太多就变成装饰

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#2A2118`（面 / 区块），`#FFFBE8`（面 / 区块），`#2A2118 / 85%`（面 / 区块），`#2B2B2B`（文字），`#F3F1FF`（文字）

```text
做一页「线索板」形式的 HTML 演示：多条证据拼出一个结论。
适用：结论来自几种不同来源的材料；证据纠偏、复盘。
做法：每张便签写清来源类型（反馈 / 观察 / 材料）；先全部钉完再连线；结论用一句话盖章。
避免：编造的指标（如“流失 8 秒”）会让整板失去可信度；线太多就变成装饰。
步进：共 5 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `ref-briefly`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#2A2118;
  --surface-2:#FFFBE8;
  --surface-3:rgba(42,33,24,0.85);
  --text-1:#2B2B2B;
  --text-2:#F3F1FF;
  --text-3:#E5483A;
  --text-4:#FFB547;
  --text-5:#B9A8FF;
  --text-6:#A0662A;
  --radius:4px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/clue-board.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 D
