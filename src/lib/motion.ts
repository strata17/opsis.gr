// Scroll-triggered motion. Content is fully visible without this script; with reduced motion it never runs.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const parse = (s: string) => {
  const m = s.match(/^([^\d]*)([\d.]+(?:,\d+)?)(.*)$/);
  if (!m) return null;
  const digits = m[2].replace(/\./g, '').replace(',', '.');
  const decimals = m[2].includes(',') ? m[2].split(',')[1].length : 0;
  return { pre: m[1], value: parseFloat(digits), decimals, post: m[3] };
};
const fmt = (n: number, d: number) => n.toLocaleString('el-GR', { minimumFractionDigits: d, maximumFractionDigits: d });

function countUp(el: HTMLElement) {
  const p = parse(el.textContent ?? '');
  if (!p || !isFinite(p.value)) return;
  const final = el.textContent!;
  el.setAttribute('aria-label', final);
  const start = performance.now(), dur = 1100;
  const tick = (t: number) => {
    const k = Math.min(1, (t - start) / dur);
    const e = 1 - Math.pow(2, -10 * k); // expo out
    el.textContent = k < 1 ? `${p.pre}${fmt(p.value * e, p.decimals)}${p.post}` : final;
    if (k < 1) requestAnimationFrame(tick); else el.removeAttribute('aria-label');
  };
  requestAnimationFrame(tick);
}

if (!reduce && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      const el = en.target as HTMLElement;
      io.unobserve(el);
      el.classList.add('in');
      if (el.matches('[data-count]')) countUp(el);
      el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
    }
  }, { threshold: 0.35 });
  document.querySelectorAll('[data-reveal], [data-count]:not([data-reveal] [data-count])').forEach((el) => io.observe(el));
}

// Sidenotes: hovering or focusing a reference lights its note, and the note lights its reference.
document.querySelectorAll<HTMLAnchorElement>('.ref a').forEach((a) => {
  const note = document.getElementById(a.getAttribute('href')!.slice(1));
  if (!note) return;
  const on = () => { a.classList.add('lit'); note.classList.add('lit'); };
  const off = () => { a.classList.remove('lit'); note.classList.remove('lit'); };
  for (const el of [a, note]) {
    el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off);
  }
  a.addEventListener('focus', on); a.addEventListener('blur', off);
});
