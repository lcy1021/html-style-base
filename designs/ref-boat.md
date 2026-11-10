# The Boat · 故事性案例 — Style Reference

> 先让读者进入处境，文字随场景逐段出现；远景和局部分镜交替，节奏有松有紧。

**想说明：** 有人物、处境、转折的案例  
**分类：** 参考  
**Theme：** 浅色  
**原始参考：** <https://www.sbs.com.au/theboat/>  
**样例：** `demos/comic.html`  

下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。

## 适用场景

- 有完整过程材料的案例：处境 → 卡点 → 新证据 → 改变判断 → 后续动作

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#FFF8E7` | — | 背景 / 面 |
| Surface 1 | `#FFFFFF` | — | 面 / 区块 |
| Accent · 红 | `#FF4D4D` | — | 面 / 区块 |
| Surface 2 | `#141414` | — | 面 / 区块 |
| Accent · 黄 | `#FFE14D` | — | 文字 |

## Tokens — Typography

- **字体栈：** `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`
- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。

### Type Scale

| Size | Weight | Line height | Letter spacing | 用在 | 示例 |
|---|---|---|---|---|---|
| 102.4px | 900 | 107.52px | -2.048px | `h1` | 周一早上九点十五分 |
| 28px | 700 | normal | normal | `b` | 小陈 |
| 20px | 900 | 24px | normal | `div.burst` | 用户故事! |
| 18px | 500 | 32.4px | normal | `p` | 用户画像只写“区域经理，关注业绩 |
| 14px | 900 | normal | 2.8px | `div.ep` | EPISODE 01 · 示例内 |
| 13px | 400 | normal | normal | `div` | 👩‍💼区域经理 · 管 12 |

## Tokens — Spacing & Shapes

### Border Radius

| Value | 次数 |
|---|---|
| 0 | — |

### Shadows

| Value | 次数 |
|---|---|
| `rgb(20, 20, 20) 4px 4px 0px 0px` | 2 |

### Layout

- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。
- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。
- 主体元素（最后一步）：
  - `section.cover` — 1280×662 @ (0, 0)，flex
  - `div.page` — 1180×1621 @ (50, 662)，block

## 步骤脚本

1. 周一早上 九点十五分
2. 第一幕 现在的周一
3. 第二幕 如果……
4. 这则漫画里藏着 3 个设计需求

## Do's and Don'ts

### Do

- 同一个人物 / 对象贯穿始终
- 证据出现的位置就展示材料
- 背景简短，转折留时间

### Don't

- 补造客户对话或戏剧化情节
- 单纯的步骤清单不需要这种形式

## Agent Prompt Guide

**颜色速查：** `#FFF8E7`（背景 / 面），`#FFFFFF`（面 / 区块），`#FF4D4D`（面 / 区块），`#141414`（面 / 区块），`#FFE14D`（文字）

```text
做一页「The Boat · 故事性案例」形式的 HTML 演示：有人物、处境、转折的案例。
适用：有完整过程材料的案例：处境 → 卡点 → 新证据 → 改变判断 → 后续动作。
做法：同一个人物 / 对象贯穿始终；证据出现的位置就展示材料；背景简短，转折留时间。
避免：补造客户对话或戏剧化情节；单纯的步骤清单不需要这种形式。
步进：共 4 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。
```

## 相关条目

- `comic`

## Quick Start

### CSS Custom Properties

```css
:root{
  --canvas:#FFF8E7;
  --surface-1:#FFFFFF;
  --surface-2:#FF4D4D;
  --surface-3:#141414;
  --text-1:#FFE14D;
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
收录：2026-11-09 · 来源：案例交互和样式参考汇总 · 06
