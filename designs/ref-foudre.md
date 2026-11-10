# Agence Foudre · 叠卡递进 — Style Reference

> 一张卡先稳定可读，下一张从下方上来盖住它，旧卡留下边缘；并列内容改用横向浏览。

**想说明：** 有先后关系的步骤和认知修正  
**分类：** 外部参考  
**Theme：** 浅色  
**原始参考：** <https://www.agencefoudre.com/>  
**样例：** `demos/stack-cards.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 分析步骤递进
- 初始假设 → 反例 → 修正

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#FCE5DF` | `--bg` | 背景 / 面 |
| Accent · 绿 | `#1F4D3A` | — | 面 / 区块 |
| Accent · 品红 | `#DB3C8A` | — | 面 / 区块 |
| Text 1 | `#6B5D58` | `--mut` | 文字 |
| Text 2 | `#FFF8F6` | — | 文字 |
| Text 3 | `#1F2A24` | `--fg` | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 72px | 800 | 72px | normal | `b` | 01 |
| 30px | 400 | 39px | -0.9px | `h1, em` | 每一步建立在上一步上， |
| 24px | 700 | normal | normal | `h3` | 补回任务 |
| 15px | 400 | 27px | normal | `p.lf` | 左边保留这组步骤的总标题，中间只 |
| 14px | 400 | 23.8px | normal | `p` | 这份诉求在什么工作里出现？ |
| 14px | 400 | 25.2px | normal | `p.rt` | 适合有先后关系的步骤；需要同时比 |
| 11px | 400 | normal | 1.54px | `p.eb` | 参考 · 叠卡递进 |
| 11px | 400 | normal | normal | `p.note` | 参考 Agence Foudre |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 24px | 4 |

### Shadows

| Value | 次数 |
|---|---|
| `rgba(0, 0, 0, 0.18) 0px 18px 40px 0px` | 4 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `p.lf` — 307×54 @ (34, 150)，block
  - `div.deck` — 330×480 @ (475, 110)，block
  - `p.rt` — 282×50 @ (964, 150)，block
  - `p.note` — 218×16 @ (1043, 640)，block

## 步骤脚本

1. 第一张卡稳定可读
2. 第二张从下面上来，盖住上一张，旧卡留边
3. 第三张
4. 最后一张：整组讲完再离开

## Do's and Don'ts

### Do

- 短标题 + 大序号 + 一小段说明
- 当前卡读完再让下一张进来
- 并列用横向，递进用叠放

### Don't

- 需要同时比较细节时，叠卡会遮住前项
- 不要整套搬品牌粉绿和夸张字体

## Agent Prompt Guide

**颜色速查：** `#FCE5DF`（背景 / 面），`#1F4D3A`（面 / 区块），`#DB3C8A`（面 / 区块），`#6B5D58`（文字），`#FFF8F6`（文字），`#1F2A24`（文字）

```text
做一页「Agence Foudre · 叠卡递进」形式的 HTML 演示：有先后关系的步骤和认知修正。
适用：分析步骤递进；初始假设 → 反例 → 修正。
做法：短标题 + 大序号 + 一小段说明；当前卡读完再让下一张进来；并列用横向，递进用叠放。
避免：需要同时比较细节时，叠卡会遮住前项；不要整套搬品牌粉绿和夸张字体。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `checklist`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#FCE5DF;
  --surface-1:#1F4D3A;
  --surface-2:#DB3C8A;
  --text-1:#6B5D58;
  --text-2:#FFF8F6;
  --text-3:#1F2A24;
  --radius:24px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/stack-cards.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-09 · 来源：案例交互和样式参考汇总 · 04
