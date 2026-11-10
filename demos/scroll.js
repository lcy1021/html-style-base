/* 长页样例的“滚动步进”适配：整页滚动的原版案例不用改结构，
   把页面按一屏左右切成若干段，对外提供和 demo.js 一样的 window.DEMO，
   这样首页卡片、详情页自动播放、说明里的步骤列表都能直接驱动它。 */
(() => {
  const se = document.scrollingElement || document.documentElement;
  const vh = () => innerHeight || 600;
  const max = () => Math.max(0, se.scrollHeight - vh());
  const count = () => Math.max(1, Math.ceil(max() / (vh() * 0.8)) + 1);
  const pos = (k, n) => n <= 1 ? 0 : Math.round(max() * k / (n - 1));
  let k = 0;
  function caps() {
    const n = count(), hs = [...document.querySelectorAll('h1,h2,h3,.act,[class*="title"]')].filter(e => e.offsetHeight && e.innerText.trim());
    const out = [], base = [];
    for (let i = 0; i < n; i++) {
      const top = pos(i, n), bot = top + vh();
      const h = hs.find(e => { const y = e.getBoundingClientRect().top + se.scrollTop; return y >= top - 20 && y < bot - 80; });
      const txt = h ? h.innerText.replace(/\s+/g, ' ').trim().slice(0, 28) : '';
      base.push(txt || base[i - 1] || '');
      out.push(txt && txt !== base[i - 1] ? txt : base[i] ? base[i] + '（续）' : '第 ' + (i + 1) + ' 段');
    }
    return out;
  }
  function set(v) {
    const n = count(), nk = Math.max(0, Math.min(n - 1, v)), far = Math.abs(nk - k) > 1;
    k = nk;
    se.style.scrollBehavior = 'auto';
    scrollTo({top: pos(k, n), behavior: far ? 'auto' : 'smooth'});
    if (window.onStep) window.onStep(k);
  }
  let t;
  addEventListener('scroll', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      const n = count(), m = max(), nk = m ? Math.round(se.scrollTop / m * (n - 1)) : 0;
      if (nk !== k) { k = nk; if (window.onStep) window.onStep(k); }
    }, 160);
  }, {passive: true});
  const S = window.STEPS;
  if (S) {                       // 单屏、自带分步的原版：直接接它自己的 go()
    window.DEMO = {set(v) { const n = S.n(); const kk = Math.max(0, Math.min(n - 1, v)); S.go(kk); if (window.onStep) window.onStep(kk); }, get: () => S.get(), get N() { return S.n(); }};
    if (S.caps) document.body.dataset.caps = S.caps().join('|');
    return;
  }
  window.DEMO = {set, get: () => k, get N() { return count(); }, scroll: true};
  const fill = () => { document.body.dataset.caps = caps().join('|'); };
  if (document.readyState === 'complete') fill(); else addEventListener('load', fill);
  fill();
})();
