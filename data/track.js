/*
 * 匿名统计：浏览、DESIGN.md 下载 / 复制、提示词复制、搜索词。
 * - 访客 id 是本机随机生成的一串字符，不含任何个人信息；
 * - 用 sendBeacon 在后台发送，失败也不影响页面；
 * - 统计服务地址改这里的 ENDPOINT；设为空字符串即关闭统计。
 */
(() => {
  const ENDPOINT = window.HSB_ENDPOINT ?? 'https://fineuedesign.com/e';
  const off = !ENDPOINT || location.protocol === 'file:' || navigator.doNotTrack === '1';
  let v = '';
  try { v = localStorage.getItem('hsb_v') || ''; if (!/^[a-z0-9]{16}$/.test(v)) { v = Array.from(crypto.getRandomValues(new Uint8Array(8)), b => b.toString(16).padStart(2, '0')).join(''); localStorage.setItem('hsb_v', v); } } catch (e) { v = ''; }
  const d = matchMedia('(max-width: 760px)').matches ? 'm' : 'd';
  window.HSBTrack = (t, data = {}) => {
    if (off) return;
    const body = JSON.stringify({ t, v, d, ...data });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain' }))) return;
      fetch(ENDPOINT, { method: 'POST', body, keepalive: true, mode: 'cors', headers: { 'Content-Type': 'text/plain' } }).catch(() => {});
    } catch (e) { /* 统计失败不影响使用 */ }
  };
})();
