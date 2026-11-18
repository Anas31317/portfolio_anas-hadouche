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

// Copie de l'email ; le bouton affiche « Copié » deux secondes
function copyMail(btn) {
  navigator.clipboard.writeText('anas.hadouche@2029.icam.fr').then(function () {
    var en = document.documentElement.lang === 'en';
    btn.textContent = en ? 'Copied' : 'Copié'; btn.classList.add('ok');
    setTimeout(function () { btn.textContent = btn.getAttribute(en ? 'data-en' : 'data-fr'); btn.classList.remove('ok'); }, 2000);
  });
}

// Panneau Contact : le bouton « Contact » du haut l'ouvre sur le côté (sans JS, il garde son lien)
(function () {
  var base = document.currentScript.src.replace(/assets\/theme\.js.*$/, '');
  document.addEventListener('DOMContentLoaded', function () {
    var cta = document.querySelector('.nav-cta');
    if (!cta || typeof HTMLDialogElement === 'undefined') return;
    var d = document.createElement('dialog');
    d.className = 'contact-drawer';
    d.setAttribute('aria-labelledby', 'cd-title');
    d.innerHTML =
      '<div class="cd-head"><h2 id="cd-title">Contact</h2>' +
      '<button class="cd-close" type="button" aria-label="Fermer"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>' +
      '<p class="cd-lead" data-fr="En recherche d\'alternance pour septembre 2027. Je suis en Inde jusqu\'en mai 2027 : les entretiens en visio me conviennent très bien." data-en="Looking for a work-study position from September 2027. I am in India until May 2027, so video interviews suit me perfectly.">En recherche d\'alternance pour septembre 2027. Je suis en Inde jusqu\'en mai 2027 : les entretiens en visio me conviennent très bien.</p>' +
      '<ul class="pc-tags"><li data-fr="Alternance · 2 ans" data-en="Work-study · 2 years">Alternance · 2 ans</li><li data-fr="Dès septembre 2027" data-en="From September 2027">Dès septembre 2027</li><li data-fr="Région toulousaine" data-en="Toulouse area">Région toulousaine</li></ul>' +
      '<div class="pc-grid"> <div class="pc-tile"> <a class="pc-link" href="mailto:anas.hadouche@2029.icam.fr"><span class="pc-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></span><span><small>Email</small><b>anas.hadouche@2029.icam.fr</b></span></a> <button class="pc-copy" type="button" onclick="copyMail(this)" data-fr="Copier" data-en="Copy">Copier</button> </div> <div class="pc-tile"><a class="pc-link" href="tel:+33782266298"><span class="pc-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg></span><span><small data-fr="Téléphone" data-en="Phone">Téléphone</small><b>+33 7 82 26 62 98</b></span></a></div> <div class="pc-tile"><a class="pc-link" href="https://www.linkedin.com/in/anas-hadouche/" target="_blank" rel="noopener"><span class="pc-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/></svg></span><span><small>LinkedIn</small><b>in/anas-hadouche</b></span></a></div> <div class="pc-tile"><a class="pc-link" href="https://github.com/Anas31317" target="_blank" rel="noopener"><span class="pc-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg></span><span><small>GitHub</small><b>Anas31317</b></span></a></div> </div>' +
      '<a class="p-btn main cd-cv" href="' + base + 'assets/pdf/cv_anas_hadouche.pdf" download data-fr="Télécharger le CV" data-en="Download CV">Télécharger le CV</a>';
    if (document.documentElement.lang === 'en') d.querySelectorAll('[data-en]').forEach(function (el) { el.textContent = el.getAttribute('data-en'); });
    document.body.appendChild(d);
    var close = function () { d.classList.add('closing'); setTimeout(function () { d.classList.remove('closing'); d.close(); }, 220); };
    cta.addEventListener('click', function (e) { e.preventDefault(); d.showModal(); });
    d.querySelector('.cd-close').addEventListener('click', close);
    d.addEventListener('click', function (e) { if (e.target === d) close(); }); // clic sur le fond
    d.addEventListener('cancel', function (e) { e.preventDefault(); close(); }); // touche Échap
  });
})();
