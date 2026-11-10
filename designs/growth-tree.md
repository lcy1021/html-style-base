# 需求生长图 — Style Reference

> 从一个诉求长出分支，再依次标记砍掉、延后，剩下的就是 MVP。

**想说明：** 范围怎么收敛到 MVP  
**分类：** 样式  
**Theme：** 深色  
**样例：** `demos/growth-tree.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 从零定义新模块
- 讨论范围和优先级

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Text 1 | `#F3F1FF` | `--fg` | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Text 2 | `#9A95A8` | `--mut` | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 先让想法长出来， |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `p.note` | 内容为示意 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 0 | — |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `svg#sv` — 1212×520 @ (34, 120)，block
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 从一个诉求出发
2. 想法一路长出分支
3. 砍掉：不服务这个任务的
4. 延后：有价值但不是现在
5. 剩下的就是 MVP

## Do's and Don'ts

### Do

- 先让分支全部长出来，不急着评价
- 砍掉 / 延后 / MVP 用三种样式
- 根节点写诉求，不写功能

### Don't

- 没有真实案例时只能标“教学示意”

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#F3F1FF`（文字），`#FFB547`（文字），`#B9A8FF`（文字），`#9A95A8`（文字）

```text
做一页「需求生长图」形式的 HTML 演示：范围怎么收敛到 MVP。
适用：从零定义新模块；讨论范围和优先级。
做法：先让分支全部长出来，不急着评价；砍掉 / 延后 / MVP 用三种样式；根节点写诉求，不写功能。
避免：没有真实案例时只能标“教学示意”。
步进：共 5 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `block-tower`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --text-1:#F3F1FF;
  --text-2:#FFB547;
  --text-3:#B9A8FF;
  --text-4:#9A95A8;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/growth-tree.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 N
