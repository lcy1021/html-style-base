"""从每个小样例的实际渲染结果量出样式 token，生成 designs/<id>.md 与 data/designs.js。
用法：python3 gen_design.py <仓库根目录>"""
import json, sys, re, subprocess, colorsys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(sys.argv[1]).resolve()
P = json.loads(subprocess.check_output(['node', '-e', "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.PATTERNS))", str(ROOT/'data/patterns.js')]))

JS = r"""() => {
 const N = window.DEMO ? DEMO.N : 1; if (window.DEMO) DEMO.set(N-1);
 return new Promise(res => setTimeout(() => {
  const vis = e => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width>0 && r.height>0 && cs.visibility!=='hidden' && +cs.opacity>0.05 && r.bottom>0 && r.top<innerHeight; };
  const els = [...document.querySelectorAll('body *')].filter(e => !['SCRIPT','STYLE','LINK','svg','path','g','line','circle','rect','text'].includes(e.tagName) && vis(e));
  const inCtrl = e => !!e.closest('.ctrl');
  const els2 = els.filter(e => !inCtrl(e));
  const bg = {}, fg = {}, bd = {}, rad = {}, sh = {}, ty = {}, fam = {};
  const add = (o,k,v=1) => { o[k]=(o[k]||0)+v; };
  const bcs = getComputedStyle(document.body);
  add(bg, bcs.backgroundColor, innerWidth*innerHeight);
  els2.forEach(e => {
   const cs = getComputedStyle(e), r = e.getBoundingClientRect(), a = r.width*r.height, c = inCtrl(e);
   if (cs.backgroundColor && !/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor)) add(bg, cs.backgroundColor, a);
   const bw = parseFloat(cs.borderTopWidth)||parseFloat(cs.borderLeftWidth);
   if (bw>0 && cs.borderStyle!=='none' && !/rgba\(0, 0, 0, 0\)/.test(cs.borderTopColor)) add(bd, cs.borderTopColor+' · '+bw+'px '+cs.borderTopStyle, 1);
   if (cs.borderTopLeftRadius!=='0px') add(rad, cs.borderTopLeftRadius, 1);
   if (cs.boxShadow!=='none') add(sh, cs.boxShadow, 1);
   const own = [...e.childNodes].some(n => n.nodeType===3 && n.textContent.trim());
   if (own) {
     add(fg, cs.color, e.innerText.length);
     add(fam, cs.fontFamily, 1);
     const key = [cs.fontSize, cs.fontWeight, cs.lineHeight, cs.letterSpacing].join('|');
     ty[key] = ty[key] || {n:0, tags:new Set(), sample:'', ctrl:c};
     ty[key].n++; ty[key].tags.add(e.tagName.toLowerCase()+(e.className&&typeof e.className==='string'?'.'+e.className.split(' ')[0]:''));
     if (!ty[key].sample) ty[key].sample = [...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join('').slice(0,16);
     if (!c) ty[key].ctrl=false;
   }
  });
  const vars = {}; for (const k of ['--bg','--fg','--mut','--violet','--amber','--teal','--red','--blue']) { const v = bcs.getPropertyValue(k).trim(); if (v) vars[k]=v; }
  const comps = [...document.body.children].filter(e => !['SCRIPT','STYLE'].includes(e.tagName) && !e.classList.contains('ctrl') && vis(e)).map(e => { const cs=getComputedStyle(e), r=e.getBoundingClientRect(); return {sel: e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(typeof e.className==='string'&&e.className?'.'+e.className.trim().split(/\s+/).join('.'):''), x:Math.round(r.left), y:Math.round(r.top), w:Math.round(r.width), h:Math.round(r.height), bg:cs.backgroundColor, radius:cs.borderTopLeftRadius, pos:cs.position, display:cs.display, kids:e.children.length}; });
  res({N, caps:(document.body.dataset.caps||'').split('|').filter(Boolean), theme: bcs.backgroundColor, vars, bg, fg, bd, rad, sh, fam, comps,
       ty:Object.entries(ty).map(([k,v])=>({k, n:v.n, tags:[...v.tags].slice(0,4), sample:v.sample, ctrl:v.ctrl})), title: document.title});
 }, 1600));
}"""

def rgb(s):
    m = re.findall(r'[\d.]+', s)
    if len(m) < 3: return None
    r,g,b = [int(float(x)) for x in m[:3]]; a = float(m[3]) if len(m) > 3 else 1
    return r,g,b,a
def hexa(s):
    t = rgb(s)
    if not t: return s
    r,g,b,a = t
    h = f'#{r:02X}{g:02X}{b:02X}'
    return h if a >= 0.995 else f'{h} / {round(a*100)}%'
def lum(s):
    t = rgb(s); 
    if not t: return 0
    r,g,b,_ = t; return (0.2126*r+0.7152*g+0.0722*b)/255
def hue_name(s):
    t = rgb(s); r,g,b,_ = t
    h,l,sat = colorsys.rgb_to_hls(r/255,g/255,b/255)
    if sat < .2 or l < .08 or l > .88: return '中性'
    d = h*360
    for lim,n in [(15,'红'),(45,'橙'),(70,'黄'),(165,'绿'),(200,'青'),(240,'蓝'),(290,'紫'),(340,'品红'),(361,'红')]:
        if d < lim: return n

def tokname(hexv, vars_):
    for k,v in vars_.items():
        if hexa(v) == hexv or v.upper() == hexv: return f'`{k}`'
    return '—'

def md_for(p, d):
    L = []
    w = L.append
    dark = lum(d['theme']) < .5 if d else True
    w(f"# {p['title']} — Style Reference\n")
    w(f"> {p['summary']}\n")
    w(f"**想说明：** {p['intent']}  ")
    w(f"**分类：** {p['category']}  ")
    if d: w(f"**Theme：** {'深色' if dark else '浅色'}  ")
    if p.get('url'): w(f"**原始参考：** <{p['url']}>  ")
    if p.get('demo'): w(f"**样例：** `{p['demo']}`  ")
    w('')
    if d:
        w("下列数值从本库样例在 1280 × 720 视口、最后一步时的实际渲染中量出（`getComputedStyle`），不是原始参考网站的取值。改成自己的案例时，按内容替换颜色和文字，保留层级比例。\n")
    else:
        w("这条是文字经验，没有样例，所以没有样式 token；下面只保留做法和提示词。\n")
    w("## 适用场景\n"); [w(f"- {x}") for x in p.get('when', [])]; w('')
    if d:
        # colors
        w("## Tokens — Colors\n"); w("| Name | Value | Token | Role |"); w("|---|---|---|---|")
        rows, seen = [], set()
        for c,a in sorted(d['bg'].items(), key=lambda x:-x[1])[:6]:
            h = hexa(c)
            if h in seen: continue
            seen.add(h); rows.append((h, '背景 / 面' if not rows else '面 / 区块'))
        for c,a in sorted(d['fg'].items(), key=lambda x:-x[1])[:6]:
            h = hexa(c)
            if h in seen: continue
            seen.add(h); rows.append((h, '文字'))
        for c,_ in sorted(d['bd'].items(), key=lambda x:-x[1])[:4]:
            h = hexa(c.split(' · ')[0])
            if h in seen: continue
            seen.add(h); rows.append((h, '描边'))
        rc = {}
        for i,(h,role) in enumerate(rows):
            hv = h.split(' ')[0]; hn = hue_name('rgb('+','.join(str(int(hv[j:j+2],16)) for j in (1,3,5))+')')
            base = {'背景 / 面':'Canvas','面 / 区块':'Surface','文字':'Text','描边':'Line'}[role]
            nm = base if hn=='中性' else f'Accent · {hn}'
            if role!='背景 / 面' and hn=='中性': rc[base]=rc.get(base,0)+1; nm = f'{base} {rc[base]}'
            w(f"| {nm} | `{h}` | {tokname(h.split(' / ')[0], d['vars'])} | {role} |")
        w('')
        # typography
        w("## Tokens — Typography\n")
        fam = sorted(d['fam'].items(), key=lambda x:-x[1])[0][0] if d['fam'] else '—'
        w(f"- **字体栈：** `{fam}`")
        w("- **说明：** 中文优先系统字体（PingFang SC / 微软雅黑），不引外部字体，离线也能显示。\n")
        w("### Type Scale\n"); w("| Size | Weight | Line height | Letter spacing | 用在 | 示例 |"); w("|---|---|---|---|---|---|")
        ty = sorted(d['ty'], key=lambda t: -float(t['k'].split('|')[0][:-2]))
        for t in ty[:9]:
            sz, wt, lh, ls = t['k'].split('|')
            tag = ', '.join(t['tags'][:3]) + (' （控制条）' if t['ctrl'] else '')
            w(f"| {sz} | {wt} | {lh} | {ls} | `{tag}` | {t['sample'].replace('|','/')} |")
        w('')
        w("## Tokens — Spacing & Shapes\n")
        w("### Border Radius\n"); w("| Value | 次数 |"); w("|---|---|")
        for v,n in sorted(d['rad'].items(), key=lambda x:-x[1])[:6]: w(f"| {v} | {n} |")
        if not d['rad']: w("| 0 | — |")
        w(''); w("### Shadows\n")
        if d['sh']:
            w("| Value | 次数 |"); w("|---|---|")
            for v,n in sorted(d['sh'].items(), key=lambda x:-x[1])[:4]: w(f"| `{v}` | {n} |")
        else: w("不用阴影，靠底色和描边分层。")
        w(''); w("### Layout\n")
        w("- 舞台：`position:fixed; inset:0 0 56px; padding:28px 34px`，标题区在左上。")
        w("- 底部步进控制条高 56px：← / 步数 / 本步说明 / 重播 / 下一步。")
        w("- 主体元素（最后一步）：")
        for c in d['comps'][:8]:
            w(f"  - `{c['sel']}` — {c['w']}×{c['h']} @ ({c['x']}, {c['y']})，{c['display']}{'，底色 `'+hexa(c['bg'])+'`' if not re.search(r'rgba\(0, 0, 0, 0\)', c['bg']) else ''}{'，圆角 '+c['radius'] if c['radius']!='0px' else ''}")
        w('')
        w("## 步骤脚本\n")
        for i,c in enumerate(d['caps'] or ['单步']): w(f"{i+1}. {c}")
        w('')
    w("## Do's and Don'ts\n"); w("### Do\n"); [w(f"- {x}") for x in p.get('how', [])]; w(''); w("### Don't\n"); [w(f"- {x}") for x in p.get('pitfalls', [])]; w('')
    w("## Agent Prompt Guide\n")
    if d:
        w("**颜色速查：** " + '，'.join(f"`{h}`（{r}）" for h,r in rows[:6]) + '\n')
    when = '；'.join(p.get('when', [])[:2])
    w("```text")
    w(f"做一页「{p['title']}」形式的 HTML 演示：{p['intent']}。")
    w(f"适用：{when}。")
    w("做法：" + '；'.join(p.get('how', [])) + '。')
    w("避免：" + '；'.join(p.get('pitfalls', [])) + '。')
    if d: w(f"步进：共 {d['N']} 步，← → / 空格 / 滚轮推进，底部控制条显示每步说明。内容用示意并在角落标“内容为示意”。")
    w("```\n")
    if p.get('related'):
        w("## 相关条目\n"); [w(f"- `{r}`") for r in p['related']]; w('')
    if d:
        w("## Quick Start\n"); w("### CSS Custom Properties\n"); w("```css"); w(":root{")
        names = ['--canvas','--surface-1','--surface-2','--surface-3','--surface-4','--surface-5']
        bi = ti = bo = 0
        for h,role in rows:
            hv = h.split(' / ')[0] if ' / ' not in h else 'rgba('+','.join(str(int(h[j:j+2],16)) for j in (1,3,5))+','+str(round(int(h.split(' / ')[1][:-1])/100,2))+')'
            if role.startswith('背景'): w(f"  --canvas:{hv};")
            elif role.startswith('面'): bi+=1; w(f"  --surface-{bi}:{hv};")
            elif role=='文字': ti+=1; w(f"  --text-{ti}:{hv};")
            else: bo+=1; w(f"  --line-{bo}:{hv};")
        if d['rad']: w(f"  --radius:{sorted(d['rad'].items(), key=lambda x:-x[1])[0][0]};")
        w("  --ease:cubic-bezier(.3,.8,.2,1);"); w("}"); w("```\n")
        w("### 复用这个样例\n"); w("```html")
        w(f"<!-- 复制 {p['demo']} 和 demos/demo.css、demos/demo.js -->")
        w('<body data-steps="N" data-caps="第一步说明|第二步说明">')
        w('  <div data-s="1">第 1 步起出现</div>  <div data-s="0-1">只在 0–1 步出现</div>')
        w('  <script src="demo.js"></script>'); w('</body>'); w("```")
    w(f"\n---\n收录：{p.get('added','—')} · 来源：{p.get('source','—')}")
    return '\n'.join(L) + '\n'

out = ROOT/'designs'; out.mkdir(exist_ok=True)
allmd = {}
with sync_playwright() as pw:
    b = pw.chromium.launch(args=['--use-gl=swiftshader'])
    pg = b.new_page(viewport={'width':1280,'height':720})
    cache = {}
    for p in P:
        d = None
        if p.get('demo'):
            if p['demo'] not in cache:
                pg.goto((ROOT/p['demo']).as_uri()); pg.wait_for_timeout(400)
                cache[p['demo']] = pg.evaluate(JS)
            d = cache[p['demo']]
        md = md_for(p, d)
        (out/f"{p['id']}.md").write_text(md, encoding='utf-8')
        allmd[p['id']] = md
    # 首页卡片封面：960×600 视口、最后一步、隐藏底部控制条
    cov = ROOT/'covers'; cov.mkdir(exist_ok=True)
    cp = b.new_page(viewport={'width':960,'height':600}, device_scale_factor=0.75)
    for demo in sorted({p['demo'] for p in P if p.get('demo')}):
        cp.goto((ROOT/demo).as_uri()); cp.wait_for_timeout(500)
        cp.evaluate("()=>{ if(window.DEMO){ let i=0; const t=setInterval(()=>{ DEMO.set(++i); if(i>=DEMO.N-1) clearInterval(t) },120) } }")
        cp.wait_for_timeout(2200)
        cp.add_style_tag(content='.ctrl{display:none!important}.stage{bottom:0!important}')
        cp.wait_for_timeout(200)
        cp.screenshot(path=str(cov/(Path(demo).stem + '.jpg')), type='jpeg', quality=78)
    b.close()
(ROOT/'data/designs.js').write_text('/* 自动生成：python3 tools/gen_design.py . 不要手改 */\nwindow.DESIGNS = ' + json.dumps(allmd, ensure_ascii=False) + ';\n', encoding='utf-8')
print(len(allmd), 'designs')
