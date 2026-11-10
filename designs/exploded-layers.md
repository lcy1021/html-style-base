# 爆炸分层 — Style Reference

> 斜放的层板，进场直接展开；讲者逐层聚焦，说明“诉求停在哪一层、要往上补回什么”。

**想说明：** 一句话 / 一个对象背后有好几层  
**分类：** 案例展示  
**Theme：** 深色  
**样例：** `demos/exploded-layers.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 目标 / 任务 / 方案 / 界面 这类层级关系
- 组件的完整状态层
- “表面一层，背后还有几层”的观点

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#000000` | — | 面 / 区块 |
| Accent · 橙 | `#FFB547` | `--amber` | 面 / 区块 |
| Text 1 | `#9A95A8` | `--mut` | 文字 |
| Text 2 | `#F3F1FF` | `--fg` | 文字 |
| Accent · 橙 | `#2A1A00` | — | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Accent · 紫 | `#8B6CFF` | — | 文字 |
| Accent · 青 | `#3FD0E8` | — | 描边 |
| Accent · 绿 | `#5AD08A` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 同一句诉求，可以停在上。 |
| 17px | 500 | normal | normal | `b` | 目标 |
| 13px | 400 | normal | normal | `span, div.pl` | 月底按部门对账，按时交给财务 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `em.tag, p.note` | 诉求停在这里 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 3px | 4 |
| 14px | 4 |
| 99px | 1 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.wrap` — 1212×604 @ (34, 96)，grid
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 进场：四层叠在一起
2. 功能／界面：最终落点
3. 方案：诉求停在这里
4. 任务：用户正在做的事
5. 目标：真正关心的结果
6. 四层一起看：往上补回

## Do's and Don'ts

### Do

- 进场就展开，不要先自动播放合体动画
- 方向键 / 滚轮 / 按钮逐层聚焦，其余层变暗
- 左侧说明和右侧层板一一对应，点说明可跳到该层
- 用“诉求停在这里”之类的标签标出关键层

### Don't

- 自动播放会让讲者失去节奏控制
- 大屏上层板太小：按可用空间缩放
- 层级内容如果是归纳，要注明不是原话

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#000000`（面 / 区块），`#FFB547`（面 / 区块），`#9A95A8`（文字），`#F3F1FF`（文字），`#2A1A00`（文字）

```text
做一页「爆炸分层」形式的 HTML 演示：一句话 / 一个对象背后有好几层。
适用：目标 / 任务 / 方案 / 界面 这类层级关系；组件的完整状态层。
做法：进场就展开，不要先自动播放合体动画；方向键 / 滚轮 / 按钮逐层聚焦，其余层变暗；左侧说明和右侧层板一一对应，点说明可跳到该层；用“诉求停在这里”之类的标签标出关键层。
避免：自动播放会让讲者失去节奏控制；大屏上层板太小：按可用空间缩放；层级内容如果是归纳，要注明不是原话。
步进：共 6 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#000000;
  --surface-2:#FFB547;
  --text-1:#9A95A8;
  --text-2:#F3F1FF;
  --text-3:#2A1A00;
  --text-4:#B9A8FF;
  --text-5:#8B6CFF;
  --line-1:#3FD0E8;
  --line-2:#5AD08A;
  --radius:3px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/exploded-layers.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：UED 需求分析分享（开场）
