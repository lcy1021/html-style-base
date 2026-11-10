# Moah Studio · 原位展开 — Style Reference

> 三张等大卡片先给名称和一句话；展开时卡片不动，底色反转、图形由线变面、说明从下方分批进入。

**想说明：** 并列概念先概览，再在原位读解释  
**分类：** 参考  
**Theme：** 深色  
**原始参考：** <https://www.moah.studio/>  
**样例：** `demos/inplace-expand.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 方法的几种作用
- 案例分类入口
- 同一组件的几种状态

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Accent · 绿 | `#CAD1B8` | — | 面 / 区块 |
| Text 1 | `#9A95A8` | `--mut` | 文字 |
| Text 2 | `#151719` | — | 文字 |
| Text 3 | `#E7E9DE` | — | 文字 |
| Text 4 | `#F3F1FF` | `--fg` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Line 1 | `#FFFFFF / 10%` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 工具到底帮了什么： |
| 26px | 500 | normal | normal | `h3` | 防遗漏 |
| 19px | 400 | 27.55px | normal | `p` | 保存讨论依据，下一次评审能接着已 |
| 16px | 400 | normal | normal | `span.pm, p` | ＋ |
| 15px | 700 | normal | normal | `h4` | 把经验留下来 |
| 11px | 400 | normal | 1.54px | `p.eb` | 参考 · 原位展开 |
| 11px | 400 | normal | normal | `p.note` | 参考 Moah Studio 的 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 6px | 3 |
| 50% | 3 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `div#rw.row` — 1212×480 @ (34, 150)，grid
  - `p.note` — 262×16 @ (998, 640)，block

## 步骤脚本

1. 三项并列：先给名称和一句价值
2. 展开第一项（也可以直接点卡片）
3. 展开第二项，前一项收回
4. 展开第三项

## Do's and Don'ts

### Do

- 展开后保留短标题
- 分享现场用点击保持展开
- 键盘可开关，减少动效时直接显示

### Don't

- 把完整案例塞进一张卡
- 只靠悬停，指针一移开正文就没了

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#CAD1B8`（面 / 区块），`#9A95A8`（文字），`#151719`（文字），`#E7E9DE`（文字），`#F3F1FF`（文字）

```text
做一页「Moah Studio · 原位展开」形式的 HTML 演示：并列概念先概览，再在原位读解释。
适用：方法的几种作用；案例分类入口。
做法：展开后保留短标题；分享现场用点击保持展开；键盘可开关，减少动效时直接显示。
避免：把完整案例塞进一张卡；只靠悬停，指针一移开正文就没了。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `flip-reveal`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:#CAD1B8;
  --text-1:#9A95A8;
  --text-2:#151719;
  --text-3:#E7E9DE;
  --text-4:#F3F1FF;
  --text-5:#B9A8FF;
  --line-1:rgba(255,255,255,0.1);
  --radius:6px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/inplace-expand.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-09 · 来源：案例交互和样式参考汇总 · 08
