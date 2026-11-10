# 漫画分镜 — Style Reference

> 四格分镜依次弹出，最后一格翻转成“真正的问题”。

**想说明：** 用户的处境、情绪和时间压力  
**分类：** 案例展示  
**Theme：** 深色  
**样例：** `demos/comic.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 讲一个短的用户故事
- 问题背景需要共情

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#1D2129` | — | 面 / 区块 |
| Accent · 橙 | `#FFB547` | `--amber` | 面 / 区块 |
| Text 1 | `#F3F1FF` | `--fg` | 文字 |
| Text 2 | `#86909C` | — | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Text 3 | `#9A95A8` | `--mut` | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 48px | 400 | normal | normal | `div.sc` | 🧑‍💼 |
| 30px | 400 | 39px | -0.9px | `h1, em` | 用四格漫画， |
| 13px | 400 | 19.5px | normal | `div.bub` | 今天要把报表发给 12 个部门。 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `small, p.note` | 17:30 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 6px | 4 |
| 14px | 4 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.strip` — 1212×520 @ (34, 120)，grid
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 第一格：人物和处境
2. 第二格：遇到卡点
3. 第三格：将就的做法
4. 第四格：结局翻转——真正的问题

## Do's and Don'ts

### Do

- 每格只有一个动作和一句话
- 时间写在格子上
- 最后一格换底色表示翻转

### Don't

- 补造客户对话或戏剧化情节
- 格子太多变成连环画

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#FFFFFF`（面 / 区块），`#1D2129`（面 / 区块），`#FFB547`（面 / 区块），`#F3F1FF`（文字），`#86909C`（文字）

```text
做一页「漫画分镜」形式的 HTML 演示：用户的处境、情绪和时间压力。
适用：讲一个短的用户故事；问题背景需要共情。
做法：每格只有一个动作和一句话；时间写在格子上；最后一格换底色表示翻转。
避免：补造客户对话或戏剧化情节；格子太多变成连环画。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `ref-boat`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#FFFFFF;
  --surface-2:#1D2129;
  --surface-3:#FFB547;
  --text-1:#F3F1FF;
  --text-2:#86909C;
  --text-3:#B9A8FF;
  --text-4:#9A95A8;
  --radius:6px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/comic.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 L
