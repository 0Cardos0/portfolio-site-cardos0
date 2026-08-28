document.addEventListener('DOMContentLoaded', () => {

  // ---- Ano no rodapé ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Tema claro/escuro (em memória, sem localStorage) ----
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  themeToggle?.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    root.setAttribute('data-theme', isLight ? 'dark' : 'light');
  });

  // ---- Menu mobile ----
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  menuToggle?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha o menu ao clicar em um link (mobile)
  mainNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle?.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // ---- Filtro de projetos ----
  const filterBar = document.getElementById('filter-bar');
  const projectCards = document.querySelectorAll('.project-card');

  filterBar?.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filterBar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !matches);
    });
  });

  // ---- Header: sombra sutil ao rolar ----
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
  });

});
