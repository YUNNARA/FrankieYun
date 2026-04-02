document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Reveal ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  // ── Section Nav Highlight ──
  const sectionNavLinks = document.querySelectorAll('.section-nav__link');
  const allSections = document.querySelectorAll('.project, #research');

  function updateActiveNav() {
    let current = '';
    allSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
        current = section.id;
      }
    });

    if (current) {
      sectionNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.target === current) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();


  // ── Smooth Scroll for Section Nav Links ──
  sectionNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        const offset = 140; // nav + section-nav height
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

});
