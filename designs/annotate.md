# 标注解读 + 前后滑块 — Style Reference

> 在界面上点出编号热点，右侧逐条写理由；最后用可拖动的滑块看改版前后。

**想说明：** 每个细节为什么这样设计  
**分类：** 案例展示  
**Theme：** 深色  
**样例：** `demos/annotate.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 设计评审、交付说明
- 细节多但每处理由都很短

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#F3F1FF` | `--fg` | 面 / 区块 |
| Surface 3 | `#F2F3F5` | — | 面 / 区块 |
| Accent · 橙 | `#FFB547` | `--amber` | 面 / 区块 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 面 / 区块 |
| Text 1 | `#1D2129` | — | 文字 |
| Text 2 | `#4E5969` | — | 文字 |
| Text 3 | `#9A95A8` | `--mut` | 文字 |
| Accent · 紫 | `#5B4BFF` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 每个细节， |
| 14px | 700 | normal | normal | `h4` | 新建项目 · 改版前 |
| 14px | 400 | normal | normal | `div.ln` | 项目名称 |
| 14px | 400 | 22.4px | normal | `li.cur` | 必填写在标签上，不等提交后才报错 |
| 14px | 700 | 22.4px | normal | `b` | 1 |
| 13px | 700 | normal | normal | `div.hot` | 1 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `p.note` | 内容为示意 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 8px | 6 |
| 50% | 3 |
| 14px | 2 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(255, 181, 71, 0.25) 0px 0px 0px 6px` | 3 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div#wrap.wrap` — 717×510 @ (34, 120)，block
  - `ul.side` — 410×142 @ (836, 130)，block
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 点出每一处设计的理由
2. 逐个热点讲解（热点也可以直接点）
3. 拖动滑块，看改版前后

## Do's and Don'ts

### Do

- 热点编号与右侧说明一一对应，可直接点
- 滑块默认停在中间，讲者可拖
- 前后两张图尺寸、位置完全对齐

### Don't

- 热点超过 5 个就该拆页
- 前后图不对齐，滑块会显得在“抖”

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#FFFFFF`（面 / 区块），`#F3F1FF`（面 / 区块），`#F2F3F5`（面 / 区块），`#FFB547`（面 / 区块），`#B9A8FF`（面 / 区块）

```text
做一页「标注解读 + 前后滑块」形式的 HTML 演示：每个细节为什么这样设计。
适用：设计评审、交付说明；细节多但每处理由都很短。
做法：热点编号与右侧说明一一对应，可直接点；滑块默认停在中间，讲者可拖；前后两张图尺寸、位置完全对齐。
避免：热点超过 5 个就该拆页；前后图不对齐，滑块会显得在“抖”。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `ref-briefly`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#FFFFFF;
  --surface-2:#F3F1FF;
  --surface-3:#F2F3F5;
  --surface-4:#FFB547;
  --surface-5:#B9A8FF;
  --text-1:#1D2129;
  --text-2:#4E5969;
  --text-3:#9A95A8;
  --line-1:#5B4BFF;
  --radius:8px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/annotate.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：演示形式库 B
