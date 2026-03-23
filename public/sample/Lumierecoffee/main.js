document.addEventListener('DOMContentLoaded', () => {

  // ─── Scroll reveal ───────────────────────────────────────────────
  const srObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        srObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-sr]').forEach(el => srObserver.observe(el));

  // ─── Sticky nav ──────────────────────────────────────────────────
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ─── Mobile hamburger menu ────────────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  function toggleMenu(open) {
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    toggleMenu(!isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // ─── Smooth scroll for anchor links ──────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─── Highlight today's hours row ─────────────────────────────────
  const dayNames = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  const today    = dayNames[new Date().getDay()];
  document.querySelectorAll('.hours-table tr').forEach(row => {
    const dayCell = row.querySelector('td:first-child');
    if (dayCell && dayCell.textContent.trim().toLowerCase() === today) {
      row.classList.add('today-row');
    }
  });

  // ─── Hero image subtle parallax ──────────────────────────────────
  const heroImg = document.querySelector('.hero-img img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const sy = window.scrollY;
      if (sy < window.innerHeight) {
        heroImg.style.transform = `translateY(${sy * 0.12}px)`;
      }
    }, { passive: true });
  }
});
