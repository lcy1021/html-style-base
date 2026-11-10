# 任务还原 — Style Reference

> 典型场景：“导出时按部门拆文件”“上传后字段顺序乱了”“一份表要经过录入、汇总、审阅、归档”“同一条数据链路，开发者和负责人关心的不一样”。

**想说明：** 把诉求放回人物、材料和上下游工作  
**分类：** 案例场景  
**Theme：** 深色  
**样例：** `demos/route-map.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 收到的是实现方式，需要补回“为什么要这样”
- 涉及多个角色或多个环节

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#0C0B12` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF / 5%` | — | 面 / 区块 |
| Text 1 | `#F3F1FF` | `--fg` | 文字 |
| Accent · 橙 | `#FFB547` | `--amber` | 文字 |
| Accent · 紫 | `#B9A8FF` | `--violet` | 文字 |
| Accent · 红 | `#FF6B5A` | `--red` | 文字 |
| Accent · 青 | `#5AD0B3` | `--teal` | 文字 |
| Text 2 | `#9A95A8` | `--mut` | 文字 |
| Line 1 | `#FFFFFF / 12%` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 30px | 400 | 39px | -0.9px | `h1, em` | 一份表格， |
| 15px | 400 | 25.5px | normal | `span` | 只看“导出一张表”，看不到这些 |
| 11px | 400 | normal | 1.54px | `p.eb` | 示例 · 去业务化 |
| 11px | 400 | 18.7px | 1.1px | `small` | 这一站的痛点 |
| 11px | 400 | normal | normal | `p.note` | 内容为示意 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 12px | 2 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `div.stage` — 1280×664 @ (0, 0)，block
  - `svg` — 1212×200 @ (34, 150)，block
  - `div.card` — 1212×82 @ (34, 554)，grid
  - `p.note` — 55×16 @ (1205, 640)，block

## 步骤脚本

1. 先给整条线路
2. 第一站：记录
3. 第二站：汇总
4. 第三站：审阅
5. 第四站：归档（站点也可以直接点）
6. 结论：每一站都对结果提了要求

## Do's and Don'ts

### Do

- 统一讲法：先给整体关系，再逐段补回人物、材料与上下游
- 主讲形式：结构概览 + 固定演示区；故事完整时用故事性讲法
- 现成样例：滚动叙事、线路图、角色镜头、三拍递进开场

### Don't

- 不要把不同角色的任务画成一条顺序流程
- 未核实的关系标“待确认”，不画成已确认流程

## Agent Prompt Guide

**颜色速查：** `#0C0B12`（背景 / 面），`#FFFFFF / 5%`（面 / 区块），`#F3F1FF`（文字），`#FFB547`（文字），`#B9A8FF`（文字），`#FF6B5A`（文字）

```text
做一页「任务还原」形式的 HTML 演示：把诉求放回人物、材料和上下游工作。
适用：收到的是实现方式，需要补回“为什么要这样”；涉及多个角色或多个环节。
做法：统一讲法：先给整体关系，再逐段补回人物、材料与上下游；主讲形式：结构概览 + 固定演示区；故事完整时用故事性讲法；现成样例：滚动叙事、线路图、角色镜头、三拍递进开场。
避免：不要把不同角色的任务画成一条顺序流程；未核实的关系标“待确认”，不画成已确认流程。
步进：共 6 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `ref-column`
- `scroll-story`
- `route-map`
- `role-lens`
- `case-intro`
- `ref-boat`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#0C0B12;
  --surface-1:rgba(255,255,255,0.05);
  --text-1:#F3F1FF;
  --text-2:#FFB547;
  --text-3:#B9A8FF;
  --text-4:#FF6B5A;
  --text-5:#5AD0B3;
  --text-6:#9A95A8;
  --line-1:rgba(255,255,255,0.12);
  --radius:12px;
  --ease:cubic-bezier(.3,.8,.2,1);
}
```

### 复用这个样例

```html
<!-- 复制 demos/route-map.html 和 demos/demo.css、demos/demo.js -->
<body data-steps="N" data-caps="第一步说明|第二步说明">
  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>
  <script src="demo.js"></script>
</body>
```

---
收录：2026-11-10 · 来源：案例与演示形式总表 · 五类案例
