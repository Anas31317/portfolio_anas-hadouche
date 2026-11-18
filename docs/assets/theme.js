// Mode clair / sombre : choix gardé sur l'appareil, sinon celui du système.
(function () {
  var root = document.documentElement, saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'dark' : 'light';
  window.toggleTheme = function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  };
})();

// Sections qui apparaissent au défilement (sans JS, tout reste visible)
document.addEventListener('DOMContentLoaded', function () {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('shown'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.p-sec, .proj-section, section').forEach(function (el) {
    if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('reveal'); io.observe(el); }
  });
});
