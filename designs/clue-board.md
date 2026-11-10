# 线索板 — Style Reference

> 可平移缩放的线索板：几张不同来源的线索依次聚焦，假设被一条条排除，红线连起来，最后盖章给出结论。数字为示例。

**想说明：** 多条证据拼出一个结论  
**分类：** 样式  
**Theme：** 浅色  
**样例：** `demos/clue-board.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 结论来自几种不同来源的材料
- 证据纠偏、复盘

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Accent · 橙 | `#E8E2D3` | — | 背景 / 面 |
| Surface 1 | `#FFFDF8` | — | 面 / 区块 |
| Surface 2 | `#1F1B16` | — | 面 / 区块 |
| Surface 3 | `#FFFDF8 / 80%` | — | 面 / 区块 |
| Accent · 黄 | `#FFE27A` | — | 面 / 区块 |
| Surface 4 | `#EEE8DC` | — | 面 / 区块 |
| Text 1 | `#7A7163` | `--mut` | 文字 |
| Text 2 | `#4A443B` | — | 文字 |
| Text 3 | `#FFFFFF` | — | 文字 |
| Accent · 红 | `#C8322B` | `--red` | 文字 |
| Accent · 红 | `#FFB3AD` | — | 文字 |
| Accent · 橙 | `#DDD5C5` | — | 描边 |
| Line 1 | `#000000 / 13%` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 46px | 800 | 46px | normal | `div.big` | 2.1s |
| 34px | 700 | normal | normal | `b` | 14% |
| 34px | 700 | 40.8px | normal | `h1` | 谁让用户在8 秒内关掉了仪表板？ |
| 19px | 700 | 25.65px | normal | `h3` | 现象：31% 的用户 8 秒内离 |
| 18px | 400 | normal | normal | `s` | 31% |
| 16px | 400 | normal | normal | `span` | → |
| 15px | 400 | 25.5px | normal | `div.quote` | “一打开二十几个图，我也不知道哪 |
| 14px | 400 | normal | normal | `button, button.start` | ⤢ |
| 13px | 400 | 22.75px | normal | `p` | 新版仪表板上线后，首屏流失明显高 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 2px | 24 |
| 50% | 17 |
| 9px | 4 |
| 14px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.067) 0px 1px 0px 0px, rgba(0, 0, 0, 0.333) 0px 14px 30px -12px` | 6 |
| `rgba(0, 0, 0, 0.333) 0px 10px 20px -10px` | 3 |
| `rgba(0, 0, 0, 0.467) 0px 20px 40px -12px` | 1 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div#vp` — 1280×720 @ (0, 0)，block
  - `div.intro` — 400×160 @ (32, 28)，block
  - `div#mm.mini-map` — 192×112 @ (1064, 24)，block，底色 `#FFFDF8 / 80%`
  - `div.hint` — 276×17 @ (32, 671)，block
  - `div.dock` — 614×54 @ (333, 640)，flex，底色 `#1F1B16`，圆角 14px

## 步骤脚本

1. 案件概览
2. 现象：31% 的用户 8 秒内离开
3. 是不是加载太慢？
4. “不知道先看哪个”
5. 24 个组件，视线没有落点
6. 留存高的看板有什么不同？
7. 问题不是慢，是“没有入口”

## Do's and Don'ts

### Do

- 每张便签写清来源类型（反馈 / 观察 / 材料）
- 先全部钉完再连线
- 结论用一句话盖章

### Don't

- 编造的指标（如“流失 8 秒”）会让整板失去可信度
- 线太多就变成装饰

## Agent Prompt Guide

**颜色速查：** `#E8E2D3`（背景 / 面），`#FFFDF8`（面 / 区块），`#1F1B16`（面 / 区块），`#FFFDF8 / 80%`（面 / 区块），`#FFE27A`（面 / 区块），`#EEE8DC`（面 / 区块）

```text
做一页「线索板」形式的 HTML 演示：多条证据拼出一个结论。
适用：结论来自几种不同来源的材料；证据纠偏、复盘。
做法：每张便签写清来源类型（反馈 / 观察 / 材料）；先全部钉完再连线；结论用一句话盖章。
避免：编造的指标（如“流失 8 秒”）会让整板失去可信度；线太多就变成装饰。
步进：共 7 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `ref-briefly`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#E8E2D3;
  --surface-1:#FFFDF8;
  --surface-2:#1F1B16;
  --surface-3:rgba(255,253,248,0.8);
  --surface-4:#FFE27A;
  --surface-5:#EEE8DC;
  --text-1:#7A7163;
  --text-2:#4A443B;
  --text-3:#FFFFFF;
  --text-4:#C8322B;
  --text-5:#FFB3AD;
  --line-1:#DDD5C5;
  --line-2:rgba(0,0,0,0.13);
  --radius:2px;
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
