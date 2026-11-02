/* ParogluMedia V14 — Beyond the Frame. No third-party JavaScript dependencies. */
(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const rootAssets = '../';
  const remoteAssets = 'https://raw.githubusercontent.com/paroglu/paroglumedia/main/';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Prefer the owner's existing local repository assets; use the public repository as fallback
  // when this preview is opened without the rest of the repo.
  const attachAsset = (node, file, attribute) => {
    let remoteTried = false;
    node.addEventListener('error', () => {
      if (remoteTried) return;
      remoteTried = true;
      if (attribute === 'poster') node.setAttribute('poster', remoteAssets + file);
      else if (attribute === 'src') node.src = remoteAssets + file;
    });
    node.setAttribute(attribute, rootAssets + file);
  };
  $$('[data-asset]').forEach(node => attachAsset(node, node.dataset.asset, 'src'));
  $$('[data-poster]').forEach(node => node.setAttribute('poster', rootAssets + node.dataset.poster));
  // Video fallbacks are intentionally not attempted on autoplay failure; this avoids a heavy
  // download from remote GitHub when the original video is missing.
  $$('[data-video]').forEach(node => { node.src = rootAssets + node.dataset.video; });

  const intro = $('#intro');
  const finishIntro = () => { intro?.classList.add('is-done'); };
  if (reducedMotion) finishIntro();
  else window.setTimeout(finishIntro, 1150);

  const nav = $('#siteHeader');
  const progress = $('#scrollProgress');
  let scrollRaf = false;
  const updateScroll = () => {
    const y = window.scrollY;
    nav?.classList.toggle('scrolled', y > 35);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? Math.min(100, y / max * 100) : 0}%`;
    scrollRaf = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollRaf) { scrollRaf = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  window.addEventListener('resize', updateScroll);
  updateScroll();

  const reveal = $$('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); io.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });
    reveal.forEach(el => io.observe(el));
  } else reveal.forEach(el => el.classList.add('in-view'));

  const menuToggle = $('#mobileToggle');
  const mobileMenu = $('#mobileMenu');
  const closeMenu = () => {
    mobileMenu?.classList.remove('is-open');
    mobileMenu?.setAttribute('inert', '');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Menüyü aç');
    document.body.classList.remove('menu-open');
  };
  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    if (!open) { closeMenu(); return; }
    mobileMenu?.removeAttribute('inert');
    mobileMenu?.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Menüyü kapat');
    document.body.classList.add('menu-open');
  });
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // Live client-side category filters.
  const cards = $$('.work-card');
  const buttons = $$('.filter-btn');
  buttons.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    buttons.forEach(b => {
      const active = b === button;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    cards.forEach(card => {
      const show = category === 'all' || card.dataset.category === category;
      card.hidden = !show;
      if (show) { visible += 1; card.classList.add('in-view'); }
    });
    $('#filterEmpty').hidden = Boolean(visible);
  }));

  const featureVideo = $('#featureVideo');
  if (featureVideo && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting || reducedMotion || document.hidden) featureVideo.pause();
      else featureVideo.play().catch(() => {});
    }), { threshold: .15 });
    videoObserver.observe(featureVideo);
  }

  // Full film uses the existing video from the same repository; audio starts only after a click.
  const dialog = $('#filmDialog');
  const fullFilm = $('#fullFilm');
  const openFilm = $('#openFilm');
  const closeFilm = $('#closeFilm');
  openFilm?.addEventListener('click', () => {
    if (!dialog || !fullFilm) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    featureVideo?.pause();
    fullFilm.play().catch(() => {});
  });
  const hideFilm = () => { fullFilm?.pause(); fullFilm.currentTime = 0; dialog?.close?.(); };
  closeFilm?.addEventListener('click', hideFilm);
  dialog?.addEventListener('click', e => { if (e.target === dialog) hideFilm(); });
  dialog?.addEventListener('close', () => { fullFilm?.pause(); });
  fullFilm?.addEventListener('error', () => { const error = $('#filmError'); if (error) error.hidden = false; });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) featureVideo?.pause();
  });
})();
