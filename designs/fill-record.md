# 填入式记录 — Style Reference

> 空白模板逐行填入案例事实，最后浓缩成一句话。

**想说明：** 好的产出长什么样  
**分类：** 样式  
**Theme：** 浅色  
**样例：** `demos/fill-record.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 模板、记录、交付物示例

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F4F3EF` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#EEF3FF` | — | 面 / 区块 |
| Surface 3 | `#FAFBFC` | — | 面 / 区块 |
| Text 1 | `#1D2129` | `--fg` | 文字 |
| Text 2 | `#4E5969` | — | 文字 |
| Accent · 蓝 | `#165DFF` | — | 文字 |
| Accent · 红 | `#B5482B` | — | 文字 |
| Accent · 紫 | `#5B3FD6` | — | 文字 |
| Text 3 | `#6B7280` | `--mut` | 文字 |
| Line 1 | `#F0F1F3` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 不需要长文档， |
| 18px | 400 | 32.4px | normal | `p.one, i.f` | 对于在时遇到的，还需要确认，建议 |
| 14px | 500 | normal | normal | `b` | 原始诉求 |
| 14px | 400 | normal | normal | `span.v` | 导出时按部门生成文件 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `p.note` | 内容为示意 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 5px | 5 |
| 14px | 1 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.1) 0px 20px 50px 0px` | 1 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div#t.t` — 600×258 @ (646, 110)，block，底色 `#FFFFFF`，圆角 14px
  - `p.one.on` — 576×65 @ (34, 150)，block
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 空白模板
2. 填入事实三行
3. 填入下一步三行，再浓缩成一句话

## Do's and Don'ts

### Do

- 先填事实，再填下一步
- 一句话模板里高亮被填入的变量

### Don't

- 推演出来的行要注明是示意

## Agent Prompt Guide

**颜色速查：** `#F4F3EF`（背景 / 面），`#FFFFFF`（面 / 区块），`#EEF3FF`（面 / 区块），`#FAFBFC`（面 / 区块），`#1D2129`（文字），`#4E5969`（文字）

```text
做一页「填入式记录」形式的 HTML 演示：好的产出长什么样。
适用：模板、记录、交付物示例。
做法：先填事实，再填下一步；一句话模板里高亮被填入的变量。
避免：推演出来的行要注明是示意。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F4F3EF;
  --surface-1:#FFFFFF;
  --surface-2:#EEF3FF;
  --surface-3:#FAFBFC;
  --text-1:#1D2129;
  --text-2:#4E5969;
  --text-3:#165DFF;
  --text-4:#B5482B;
  --text-5:#5B3FD6;
  --text-6:#6B7280;
  --line-1:#F0F1F3;
  --radius:5px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/fill-record.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：UED 需求分析分享（3.5）
