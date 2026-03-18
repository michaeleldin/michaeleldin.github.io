/* ============================================
   Michael Eldin — Portfolio JS
   Smooth scroll, nav highlighting, reveal,
   mobile menu
   ============================================ */

(function () {
  'use strict';

  // ── DOM refs ──
  const navbar      = document.getElementById('navbar');
  const hamburger   = document.getElementById('hamburger');
  const navLinks    = document.getElementById('nav-links');
  const navAnchors  = navLinks.querySelectorAll('a[href^="#"]');
  const sections    = document.querySelectorAll('.section, .hero');
  const reveals     = document.querySelectorAll('.reveal');

  // ── Mobile menu toggle ──
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(navLinks.classList.contains('open')));
  });

  // Close mobile menu when a link is clicked
  navAnchors.forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // ── Navbar scroll styling ──
  function handleNavScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ── Active nav link highlighting ──
  function highlightNav() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // ── Scroll reveal (Intersection Observer) ──
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    reveals.forEach(el => el.classList.add('visible'));
  }
})();
