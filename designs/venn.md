# 叠加对比 — Style Reference

> 样本一个个加入，条件自动落进对应的重叠区；三者都有的才是共性。

**想说明：** 多个样本里找共性  
**分类：** 案例展示  
**Theme：** 深色  
**样例：** `demos/venn.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 几个客户 / 场景的对照
- 判断是不是普遍需求

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Accent · 青 | `#5AD0B3 / 8%` | `--teal` | 面 / 区块 |
| Accent · 紫 | `#B9A8FF / 8%` | `--violet` | 面 / 区块 |
| Accent · 橙 | `#FFB547 / 8%` | `--amber` | 面 / 区块 |
| Surface 1 | `#FFFFFF / 12%` | — | 面 / 区块 |
| Text 1 | `#F3F1FF` | `--fg` | 文字 |
| Text 2 | `#9A95A8` | `--mut` | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Accent · 青 | `#5AD0B3` | `--teal` | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 几个样本放在一起， |
| 18px | 500 | 32.4px | normal | `b` | 三个都有：按月汇总 |
| 15px | 400 | 27px | normal | `div.side` | 只在一个样本里出现的，先别当成普 |
| 13px | 400 | normal | normal | `div.ci` | 样本甲 |
| 12px | 400 | normal | normal | `div.it` | 按月汇总 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `p.note` | 内容为示意 · 条目可换成任务  |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 6px | 7 |
| 50% | 3 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div#vn.vn` — 742×534 @ (34, 110)，block
  - `div#sd.side` — 384×65 @ (862, 140)，block
  - `p.note` — 250×16 @ (1010, 640)，block

## 步骤脚本

1. 第一个样本的条件
2. 加入第二个样本，共同条件自动落进重叠区
3. 加入第三个样本
4. 三者都有的，才是共性

## Do's and Don'ts

### Do

- 条目换成任务、数据结构、组织流程等条件
- 一次只加一个样本
- 只在一个样本里出现的条目单独标出

### Don't

- 样本少时不要说“大客户都这样”

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#5AD0B3 / 8%`（面 / 区块），`#B9A8FF / 8%`（面 / 区块），`#FFB547 / 8%`（面 / 区块），`#FFFFFF / 12%`（面 / 区块），`#F3F1FF`（文字）

```text
做一页「叠加对比」形式的 HTML 演示：多个样本里找共性。
适用：几个客户 / 场景的对照；判断是不是普遍需求。
做法：条目换成任务、数据结构、组织流程等条件；一次只加一个样本；只在一个样本里出现的条目单独标出。
避免：样本少时不要说“大客户都这样”。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `voice-wall`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:rgba(90,208,179,0.08);
  --surface-2:rgba(185,168,255,0.08);
  --surface-3:rgba(255,181,71,0.08);
  --surface-4:rgba(255,255,255,0.12);
  --text-1:#F3F1FF;
  --text-2:#9A95A8;
  --text-3:#FFB547;
  --text-4:#B9A8FF;
  --line-1:#5AD0B3;
  --radius:6px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/venn.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 U
