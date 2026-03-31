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
  const projectSections = document.querySelectorAll('.project');

  function updateActiveNav() {
    let current = '';
    projectSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      // If the section spans across the top 40% of viewport
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

  // ── Mockup Tab Switching (Clone App Experience) ──
  const mockups = document.querySelectorAll('.phone-mockup');
  mockups.forEach(mockup => {
    const tabs = mockup.querySelectorAll('.mockup-tab');
    const screenImg = mockup.querySelector('.mockup-img');
    const screenContainer = mockup.querySelector('.phone-mockup__screen');

    if (tabs.length > 0 && screenImg) {
      tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Remove active class from all tabs in THIS mockup only
          tabs.forEach(t => t.classList.remove('active'));
          // Add active class to clicked tab
          tab.classList.add('active');

          // Transition Image (Fade in/out feel if possible with CSS, here just direct src change)
          const targetSrc = tab.getAttribute('data-src');
          if (targetSrc) {
            screenImg.style.opacity = '0.4'; // Quick visual feedback
            setTimeout(() => {
                screenImg.src = targetSrc;
                screenImg.style.opacity = '1';
                // Reset scroll for the new view
                if (screenContainer) screenContainer.scrollTop = 0;
            }, 50);
          }
        });
      });
    }
  });



});
