// Visionneuse de captures : un onglet par groupe, une image à la fois, miniatures.
// Données : <script type="application/json" class="tbv-data"> dans chaque .tbv
// (tableau de groupes, chaque groupe = tableau de {src, fr, en}).
document.querySelectorAll('.tbv').forEach(box => {
  const groups = JSON.parse(box.querySelector('.tbv-data').textContent);
  const main = box.querySelector('.tbv-main'), cap = box.querySelector('.tbv-caption'), thumbs = box.querySelector('.tbv-thumbs');
  const prev = box.querySelector('.prev'), next = box.querySelector('.next');
  const lang = () => (typeof currentLang !== 'undefined' ? currentLang : 'fr');
  let g = 0, i = 0;
  if (groups.length < 2) box.classList.add('tbv-single');
  function render() {
    const it = groups[g][i];
    main.src = it.src; main.alt = it[lang()]; cap.textContent = it[lang()];
    thumbs.innerHTML = '';
    groups[g].forEach((t, k) => {
      const im = document.createElement('img'); im.src = t.src; im.alt = t[lang()];
      if (k === i) im.classList.add('active');
      im.onclick = () => { i = k; render(); }; thumbs.appendChild(im);
    });
    thumbs.style.display = groups[g].length > 1 ? 'flex' : 'none';
    prev.hidden = next.hidden = groups[g].length < 2;
  }
  box.querySelectorAll('.tbv-tab').forEach(b => b.onclick = () => {
    box.querySelectorAll('.tbv-tab').forEach(x => x.classList.toggle('active', x === b));
    g = +b.dataset.g; i = 0; render();
  });
  prev.onclick = () => { i = (i - 1 + groups[g].length) % groups[g].length; render(); };
  next.onclick = () => { i = (i + 1) % groups[g].length; render(); };
  document.querySelectorAll('.nav-lang button').forEach(b => b.addEventListener('click', () => setTimeout(render, 0)));
  render();
});
