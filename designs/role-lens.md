# 角色镜头 — Style Reference

> 同一条链路，用圆形镜头切换角色视角，各自关心的节点高亮并显示他们的问题。

**想说明：** 同一个界面服务不同的人  
**分类：** 样式  
**Theme：** 深色  
**样例：** `demos/role-lens.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 操作者和负责人关注点不同
- 多角色产品

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF / 5%` | — | 面 / 区块 |
| Surface 2 | `#010000 / 14%` | — | 面 / 区块 |
| Accent · 橙 | `#FFB547` | `--amber` | 面 / 区块 |
| Text 1 | `#F3F1FF` | `--fg` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Text 2 | `#9A95A8` | `--mut` | 文字 |
| Text 3 | `#1D2129` | — | 文字 |
| Line 1 | `#FFFFFF / 12%` | — | 描边 |
| Line 2 | `#FFFFFF / 20%` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 同一个界面， |
| 17px | 400 | 28.9px | normal | `p.say` | 负责人关心：整体是否稳定、投入有 |
| 16px | 400 | normal | normal | `div.arr` | → |
| 15px | 400 | normal | normal | `div.nd` | 数据源 |
| 14px | 400 | normal | normal | `button` | 开发者 |
| 12px | 400 | normal | normal | `small` | 整体稳定吗？ |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `p.note` | 内容为示意 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 12px | 5 |
| 99px | 2 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.who` — 162×38 @ (34, 130)，flex
  - `div#pp.pipe` — 1212×87 @ (34, 200)，flex
  - `p#say.say` — 760×29 @ (34, 601)，block
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 同一条数据链路
2. 镜头切到“开发者”：任务失败、排查上下游
3. 镜头切到“负责人”：稳定、效率、对业务的价值

## Do's and Don'ts

### Do

- 链路保持不动，只换高亮
- 每个角色配一种颜色
- 角色按钮可直接点

### Don't

- 把不同角色的任务强行画成顺序流程

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#FFFFFF / 5%`（面 / 区块），`#010000 / 14%`（面 / 区块），`#FFB547`（面 / 区块），`#F3F1FF`（文字），`#B9A8FF`（文字）

```text
做一页「角色镜头」形式的 HTML 演示：同一个界面服务不同的人。
适用：操作者和负责人关注点不同；多角色产品。
做法：链路保持不动，只换高亮；每个角色配一种颜色；角色按钮可直接点。
避免：把不同角色的任务强行画成顺序流程。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `route-map`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:rgba(255,255,255,0.05);
  --surface-2:rgba(1,0,0,0.14);
  --surface-3:#FFB547;
  --text-1:#F3F1FF;
  --text-2:#B9A8FF;
  --text-3:#9A95A8;
  --text-4:#1D2129;
  --line-1:rgba(255,255,255,0.12);
  --line-2:rgba(255,255,255,0.2);
  --radius:12px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/role-lens.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 O
