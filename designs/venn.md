# 叠加对比 — Style Reference

> 样本一个个加入，条件自动落进对应的重叠区；三者都有的才是共性。

**想说明：** 多个样本里找共性  
**分类：** 样式  
**Theme：** 浅色  
**样例：** `demos/venn.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 几个客户 / 场景的对照
- 判断是不是普遍需求

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F5F3EE` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Accent · 紫 | `#9C36B5 / 20%` | — | 面 / 区块 |
| Text 1 | `#8A857C` | `--mut` | 文字 |
| Text 2 | `#1A1A1A` | — | 文字 |
| Accent · 橙 | `#E4E0D6` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 40.96px | 700 | 51.2px | normal | `h1` | 先问他特殊在哪，再问别人有没有。 |
| 15px | 800 | normal | normal | `span` | 大客户 A |
| 15px | 700 | normal | normal | `b` | ① 一个大客户提了 6 条诉求 |
| 13px | 400 | normal | normal | `div.it` | 多层级拆解 |
| 13px | 400 | 20.8px | normal | `span` | 产品想按它来设计，但这个功能将来 |
| 12px | 400 | normal | 1.8px | `small` | 第 2 段 · 背景篇 · 卖给 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 99px | 6 |
| 14px | 6 |
| 50% | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.267) 0px 4px 10px -6px` | 6 |
| `rgb(26, 26, 26) 4px 4px 0px 0px` | 1 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.hd` — 1280×159 @ (0, 0)，block
  - `div.main` — 1280×697 @ (0, 159)，grid

## 步骤脚本

1. ① 一个大客户提了 6 条诉求
2. ② 找第二个客户：客户 B
3. ③ 再找一个：客户 C
4. ④ 按客户分层加权，不数人头
5. ⑤ 用 KANO 判断性质
6. ⑥ 别忘了沉默的客户

## Do's and Don'ts

### Do

- 条目换成任务、数据结构、组织流程等条件
- 一次只加一个样本
- 只在一个样本里出现的条目单独标出

### Don't

- 样本少时不要说“大客户都这样”

## Agent Prompt Guide

**颜色速查：** `#F5F3EE`（背景 / 面），`#FFFFFF`（面 / 区块），`#9C36B5 / 20%`（面 / 区块），`#8A857C`（文字），`#1A1A1A`（文字），`#E4E0D6`（描边）

```text
做一页「叠加对比」形式的 HTML 演示：多个样本里找共性。
适用：几个客户 / 场景的对照；判断是不是普遍需求。
做法：条目换成任务、数据结构、组织流程等条件；一次只加一个样本；只在一个样本里出现的条目单独标出。
避免：样本少时不要说“大客户都这样”。
步进：共 6 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `voice-wall`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F5F3EE;
  --surface-1:#FFFFFF;
  --surface-2:rgba(156,54,181,0.2);
  --text-1:#8A857C;
  --text-2:#1A1A1A;
  --line-1:#E4E0D6;
  --radius:99px;
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
