# 标注解读 + 前后滑块 — Style Reference

> 长页案例：三个数字讲卡点 → 在界面上逐点标注设计理由 → 拖动滑块看改版前后 → 翻卡讲关键取舍 → 上线结果。

**想说明：** 每个细节为什么这样设计  
**分类：** 样式  
**Theme：** 浅色  
**样例：** `demos/annotate.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 设计评审、交付说明
- 细节多但每处理由都很短

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#F6F4EF` | `--bg` | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Surface 2 | `#F6F4EF / 90%` | `--bg` | 面 / 区块 |
| Surface 3 | `#1A1A1A` | `--fg` | 面 / 区块 |
| Text 1 | `#6B6B6B` | `--mut` | 文字 |
| Accent · 橙 | `#FF5A1F` | — | 文字 |
| Line 1 | `#E3DFD6` | — | 描边 |

## Tokens — Typography

- **字体栈：** `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 76.8px | 800 | 82.944px | -1.536px | `h1, u` | 让数据资产 |
| 44px | 800 | 44px | normal | `div.n` | 73% |
| 38.4px | 700 | 48px | normal | `h2` | 用户在数据目录里的三个“卡点” |
| 17px | 700 | 29.75px | normal | `h3` | 搜不到 |
| 14px | 400 | 24.5px | normal | `p` | 搜索只匹配表名，业务人员用“销售 |
| 13px | 400 | 22.75px | normal | `a.on, a, aside` | 问题 |
| 13px | 700 | 22.75px | normal | `b` | 交互设计 · 用户研究 |
| 12px | 400 | 21px | normal | `small` | CASE STUDY / 数据目 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 99px | 5 |
| 14px | 3 |

### Shadows

不用阴影，靠底色和描边分层。

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `nav#nav` — 1280×56 @ (0, 0)，flex，底色 `#F6F4EF / 90%`
  - `div.wrap` — 1180×3355 @ (50, 56)，block

## 步骤脚本

1. 让数据资产 找得到、看得懂、敢用
2. 搜不到
3. 搜业务名，也能命中技术表
4. 前后对比
5. 三个关键决策 点击卡片翻面看取舍
6. 上线 8 周后（示例数据）

## Do's and Don'ts

### Do

- 热点编号与右侧说明一一对应，可直接点
- 滑块默认停在中间，讲者可拖
- 前后两张图尺寸、位置完全对齐

### Don't

- 热点超过 5 个就该拆页
- 前后图不对齐，滑块会显得在“抖”

## Agent Prompt Guide

**颜色速查：** `#F6F4EF`（背景 / 面），`#FFFFFF`（面 / 区块），`#F6F4EF / 90%`（面 / 区块），`#1A1A1A`（面 / 区块），`#6B6B6B`（文字），`#FF5A1F`（文字）

```text
做一页「标注解读 + 前后滑块」形式的 HTML 演示：每个细节为什么这样设计。
适用：设计评审、交付说明；细节多但每处理由都很短。
做法：热点编号与右侧说明一一对应，可直接点；滑块默认停在中间，讲者可拖；前后两张图尺寸、位置完全对齐。
避免：热点超过 5 个就该拆页；前后图不对齐，滑块会显得在“抖”。
步进：共 6 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `ref-briefly`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#F6F4EF;
  --surface-1:#FFFFFF;
  --surface-2:rgba(246,244,239,0.9);
  --surface-3:#1A1A1A;
  --text-1:#6B6B6B;
  --text-2:#FF5A1F;
  --line-1:#E3DFD6;
  --radius:99px;
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
