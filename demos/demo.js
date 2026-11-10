/* 步进引擎：<body data-steps="N">；元素用 data-s="2" 表示第 2 步出现（"1-3" 表示 1 到 3 步可见），
   body 上同步 data-step 与 s0…sN 累积类；data-caps 每步一句说明（用 | 分隔）。
   键盘 ← → / 空格、滚轮、按钮都能推进；window.onStep(step) 可挂自定义逻辑。 */
(() => {
  const b = document.body, N = +b.dataset.steps || 1;
  const caps = (b.dataset.caps || '').split('|');
  const bar = document.createElement('div'); bar.className = 'ctrl';
  bar.innerHTML = '<button type="button" data-d="-1" aria-label="上一步">←</button><span class="n"></span><span class="cap"></span><button type="button" data-d="0">重播</button><button type="button" class="pri" data-d="1">下一步 →</button>';
  b.appendChild(bar);
  const n = bar.querySelector('.n'), cap = bar.querySelector('.cap');
  let k = 0;
  const show = (el, s) => {
    const r = el.dataset.s.split('-').map(Number), lo = r[0], hi = r.length > 1 ? r[1] : Infinity;
    const on = s >= lo && s <= hi; el.classList.toggle('on', on); el.setAttribute('aria-hidden', String(!on));
  };
  const set = v => {
    k = Math.max(0, Math.min(N - 1, v)); b.dataset.step = k;
    for (let i = 0; i < N; i++) b.classList.toggle('s' + i, i <= k);
    document.querySelectorAll('[data-s]').forEach(el => show(el, k));
    n.textContent = `${k + 1} / ${N}`; cap.textContent = caps[k] || '';
    if (window.onStep) window.onStep(k);
  };
  bar.addEventListener('click', e => { const d = e.target.closest('button'); if (!d) return; const v = +d.dataset.d; set(v === 0 ? 0 : k + v); });
  addEventListener('keydown', e => { if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); set(k + 1); } if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); set(k - 1); } });
  let lock = 0; addEventListener('wheel', e => { const t = performance.now(); if (t < lock || Math.abs(e.deltaY) < 20) return; lock = t + 600; set(k + (e.deltaY > 0 ? 1 : -1)); }, {passive: true});
  window.DEMO = {set, get: () => k, N};
  requestAnimationFrame(() => set(0));
})();
