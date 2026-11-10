# 方案取舍与适用范围 — Style Reference

> 典型场景：“按钮文字限制要不要从 8 字改到 6 字，评估后决定不改”“成员选择器分阶段改版”“只来自一个客户的方案，要不要做成通用能力”。

**想说明：** 约束和证据怎样影响方案选择  
**分类：** 方法  
**Theme：** 浅色  
**样例：** `demos/you-decide.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 有多个候选方案
- 方案只在部分场景成立

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F1EFE9` | `--bg` | 背景 / 面 |
| Accent · 品红 | `#FF6FAE` | — | 面 / 区块 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Accent · 黄 | `#FFD43B` | — | 面 / 区块 |
| Text 1 | `#111111` | — | 文字 |
| Accent · 紫 | `#3B3BFF` | `--blue` | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 166.4px | 900 | 158.08px | -6.656px | `span.ch` | 如 |
| 18px | 400 | 32.4px | normal | `p` | 这次改版中我们做了 3 轮 A/ |
| 16px | 900 | 20.8px | normal | `div.sticker` | 先选再看答案 ↓ |
| 16px | 700 | normal | normal | `a.cta` | 开始第 1 轮 → |
| 13px | 400 | normal | normal | `span` | 你与用户一致 |
| 13px | 700 | normal | normal | `b.mono` | 0/3 |
| 13px | 700 | normal | 1.3px | `small.mono` | CASE · 数据导入引导改版  |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 50% | 4 |
| 14px | 2 |

### Shadows

| Value | 次数 |
|---|---|
| `rgb(17, 17, 17) 5px 5px 0px 0px` | 2 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div#score.score.box` — 214×43 @ (1049, 18)，flex，底色 `#FFFFFF`，圆角 14px
  - `section.hero` — 1280×720 @ (0, 0)，flex

## 步骤脚本

1. 如果是你， 会怎么选？
2. 新用户第一次进入，数据集列表是空的
3. 导入时，系统需要用户确认字段类型
4. 导入时，系统需要用户确认字段类型（续）
5. 导入失败了，怎么告诉用户？
6. 三轮测试， 一条原则：把下一步放到用户眼前。
7. 三轮测试， 一条原则：把下一步放到用户眼前。（续）

## Do's and Don'ts

### Do

- 统一讲法：约束与证据 → 候选方案 → 取舍理由 → 适用边界
- 需要比较时并排，不用叠卡
- 现成样例：你来决策、版本时间机器、叠加对比、假设积木塔

### Don't

- 评估后放弃不是“上线后回滚”
- 单个客户的场景不能说成“大客户都这样”

## Agent Prompt Guide

**颜色速查：** `#F1EFE9`（背景 / 面），`#FF6FAE`（面 / 区块），`#FFFFFF`（面 / 区块），`#FFD43B`（面 / 区块），`#111111`（文字），`#3B3BFF`（文字）

```text
做一页「方案取舍与适用范围」形式的 HTML 演示：约束和证据怎样影响方案选择。
适用：有多个候选方案；方案只在部分场景成立。
做法：统一讲法：约束与证据 → 候选方案 → 取舍理由 → 适用边界；需要比较时并排，不用叠卡；现成样例：你来决策、版本时间机器、叠加对比、假设积木塔。
避免：评估后放弃不是“上线后回滚”；单个客户的场景不能说成“大客户都这样”。
步进：共 7 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
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
  --canvas:#F1EFE9;
  --surface-1:#FF6FAE;
  --surface-2:#FFFFFF;
  --surface-3:#FFD43B;
  --text-1:#111111;
  --text-2:#3B3BFF;
  --radius:50%;
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
