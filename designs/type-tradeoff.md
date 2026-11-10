# 方案取舍与适用范围 — Style Reference

> 典型场景：“按钮文字限制要不要从 8 字改到 6 字，评估后决定不改”“成员选择器分阶段改版”“只来自一个客户的方案，要不要做成通用能力”。

**想说明：** 约束和证据怎样影响方案选择  
**分类：** 方法  
**Theme：** 深色  
**样例：** `demos/you-decide.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 有多个候选方案
- 方案只在部分场景成立

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Text 1 | `#9A95A8` | `--mut` | 文字 |
| Text 2 | `#F3F1FF` | `--fg` | 文字 |
| Text 3 | `#1D2129` | — | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Accent · 紫 | `#5B4BFF` | — | 文字 |
| Line 1 | `#FFFFFF / 18%` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 换你来定： |
| 16px | 400 | normal | normal | `button.op` | A · 改，统一限制 6 个字 |
| 15px | 400 | 27px | normal | `div.ctx, p.why` | 按钮文字最长 8 个字。有人反馈 |
| 15px | 700 | 27px | normal | `b` | 窄屏下会换行 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | normal | normal | `p.note` | 内容为示意 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 12px | 3 |
| 14px | 1 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.q` — 1212×253 @ (34, 130)，grid
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 先给条件，请大家选
2. 现场举手 / 点一个选项
3. 揭晓最终选择和理由

## Do's and Don'ts

### Do

- 统一讲法：约束与证据 → 候选方案 → 取舍理由 → 适用边界
- 需要比较时并排，不用叠卡
- 现成样例：你来决策、版本时间机器、叠加对比、假设积木塔

### Don't

- 评估后放弃不是“上线后回滚”
- 单个客户的场景不能说成“大客户都这样”

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#FFFFFF`（面 / 区块），`#9A95A8`（文字），`#F3F1FF`（文字），`#1D2129`（文字），`#FFB547`（文字）

```text
做一页「方案取舍与适用范围」形式的 HTML 演示：约束和证据怎样影响方案选择。
适用：有多个候选方案；方案只在部分场景成立。
做法：统一讲法：约束与证据 → 候选方案 → 取舍理由 → 适用边界；需要比较时并排，不用叠卡；现成样例：你来决策、版本时间机器、叠加对比、假设积木塔。
避免：评估后放弃不是“上线后回滚”；单个客户的场景不能说成“大客户都这样”。
步进：共 3 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `you-decide`
- `time-machine`
- `venn`
- `block-tower`
- `growth-tree`
- `ref-column`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#FFFFFF;
  --text-1:#9A95A8;
  --text-2:#F3F1FF;
  --text-3:#1D2129;
  --text-4:#FFB547;
  --text-5:#B9A8FF;
  --text-6:#5B4BFF;
  --line-1:rgba(255,255,255,0.18);
  --radius:12px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/you-decide.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：案例与演示形式总表 · 五类案例
