# 角色镜头 — Style Reference

> 顶部是三个角色的一句话诉求，下面是同一个首页，切换角色时默认展开的模块随之变化，最后用矩阵总结。

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
| Canvas | `#111111` | — | 背景 / 面 |
| Surface 1 | `#F4EFE6` | — | 面 / 区块 |
| Accent · 蓝 | `#0F172A` | — | 面 / 区块 |
| Surface 2 | `#ECFDF5` | — | 面 / 区块 |
| Surface 3 | `#FFFFFF` | — | 面 / 区块 |
| Surface 4 | `#FBF8F2` | — | 面 / 区块 |
| Text 1 | `#1D2129` | — | 文字 |
| Text 2 | `#86909C` | — | 文字 |
| Accent · 绿 | `#064E3B` | — | 文字 |
| Text 3 | `#E2E8F0` | — | 文字 |
| Accent · 橙 | `#2A1F14` | — | 文字 |
| Accent · 绿 | `#00B42A` | — | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 72px | 400 | normal | normal | `div.av` | 👔 |
| 42px | 700 | 48.3px | -0.84px | `h2` | 刘总 |
| 30px | 700 | normal | -0.6px | `b.n` | 4,820 万 |
| 20px | 600 | 32px | normal | `blockquote` | “我不需要图表，我需要知道今天有 |
| 18px | 600 | normal | normal | `i` | 👔 |
| 16px | 700 | normal | normal | `b` | 需要你关注的 2 件事 |
| 15px | 400 | normal | normal | `div.role` | 销售总监 · 每天看 2 分钟 |
| 14px | 600 | normal | normal | `button.on, button` | 管理者 |
| 13px | 400 | normal | normal | `div.alert, span, span.ok` | ⚠️ 华东区毛利率连续 3 周下 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 99px | 19 |
| 50% | 12 |
| 12px | 5 |
| 6px | 5 |
| 8px | 4 |
| 18px | 3 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.06) 0px 1px 3px 0px` | 5 |
| `rgba(0, 0, 0, 0.4) 0px 40px 80px -30px` | 3 |
| `rgba(0, 0, 0, 0.333) 0px 20px 40px -14px` | 1 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div#stage.stage` — 1280×720 @ (0, 0)，block
  - `nav#lens.lens` — 354×64 @ (463, 630)，flex，底色 `#FFFFFF / 93%`，圆角 99px

## 步骤脚本

1. 刘总
2. 三个视角，不是三套产品。 同一套组件，按角色调整“默认展
3. 三个视角，不是三套产品。 同一套组件，按角色调整“默认展（续）

## Do's and Don'ts

### Do

- 链路保持不动，只换高亮
- 每个角色配一种颜色
- 角色按钮可直接点

### Don't

- 把不同角色的任务强行画成顺序流程

## Agent Prompt Guide

**颜色速查：** `#111111`（背景 / 面），`#F4EFE6`（面 / 区块），`#0F172A`（面 / 区块），`#ECFDF5`（面 / 区块），`#FFFFFF`（面 / 区块），`#FBF8F2`（面 / 区块）

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
  --canvas:#111111;
  --surface-1:#F4EFE6;
  --surface-2:#0F172A;
  --surface-3:#ECFDF5;
  --surface-4:#FFFFFF;
  --surface-5:#FBF8F2;
  --text-1:#1D2129;
  --text-2:#86909C;
  --text-3:#064E3B;
  --text-4:#E2E8F0;
  --text-5:#2A1F14;
  --text-6:#00B42A;
  --radius:99px;
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
