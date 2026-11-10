# Spotify × Instagram · 文字版网格 — Style Reference

> 左侧短章节名定位，右侧正文保持合适行宽；图片需要时跨栏变宽，过程材料放在论证发生的位置。

**想说明：** 长篇案例、文字版的阅读排版  
**分类：** 参考  
**Theme：** 浅色  
**原始参考：** <https://www.jonwong.co/featured/spotify-instagram>  
**样例：** `demos/text-layout.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 分享的文字版
- 完整的案例复盘页

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F4F3EF` | `--bg` | 背景 / 面 |
| Text 1 | `#6B7280` | `--mut` | 文字 |
| Text 2 | `#1D2129` | `--fg` | 文字 |
| Accent · 紫 | `#6A55D6` | `--violet` | 文字 |
| Accent · 橙 | `#B86E00` | `--amber` | 文字 |
| Line 1 | `#FFFFFF / 12%` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 一屏一个观点， |
| 30px | 700 | 40.5px | normal | `h3` | 把方案里没写出来的假设暴露出来 |
| 30px | 400 | 40.5px | -0.9px | `h3, em` | 把方案里暴露出来。 |
| 14px | 400 | 26.6px | normal | `p` | 产品写方案时想的是要有什么功能， |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 |
| 11px | 400 | normal | normal | `small` | 默认 |
| 11px | 400 | 20.9px | 1.54px | `p.e` | 设计师在需求分析里的价值 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 14px | 2 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div.cmp` — 1212×520 @ (34, 120)，grid

## 步骤脚本

1. 左：默认换行、粗体堆叠｜右：均衡换行 + 层级
2. 关键句仍可手动断行

## Do's and Don'ts

### Do

- 骨架：背景与任务 → 发现的问题 → 关键证据 → 分析与取舍 → 当前判断 → 后续验证
- 同级章节间距一致
- 强调色只标判断和证据

### Don't

- 每段换一种装饰
- 把材料都堆到文末

## Agent Prompt Guide

**颜色速查：** `#F4F3EF`（背景 / 面），`#6B7280`（文字），`#1D2129`（文字），`#6A55D6`（文字），`#B86E00`（文字），`#FFFFFF / 12%`（描边）

```text
做一页「Spotify × Instagram · 文字版网格」形式的 HTML 演示：长篇案例、文字版的阅读排版。
适用：分享的文字版；完整的案例复盘页。
做法：骨架：背景与任务 → 发现的问题 → 关键证据 → 分析与取舍 → 当前判断 → 后续验证；同级章节间距一致；强调色只标判断和证据。
避免：每段换一种装饰；把材料都堆到文末。
步进：共 2 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `one-idea`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F4F3EF;
  --text-1:#6B7280;
  --text-2:#1D2129;
  --text-3:#6A55D6;
  --text-4:#B86E00;
  --line-1:rgba(255,255,255,0.12);
  --radius:14px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/text-layout.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-09 · 来源：案例交互和样式参考汇总 · 05
