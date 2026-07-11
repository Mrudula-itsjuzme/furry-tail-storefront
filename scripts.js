/* Furry Tail — prototype-v3.9 shared scripts */
(function () {
  'use strict';

  /* Scroll-reveal IntersectionObserver
   * Handles both [data-reveal] (single element) and
   * [data-stagger] (marks the parent as visible, CSS stagger handles children) */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal], [data-stagger]').forEach(function (el) {
    io.observe(el);
  });

  /* Nav scroll shadow */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Homepage product still-life: subtle pointer depth on desktop */
  var hero = document.querySelector('.hero');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (hero && !reduceMotion) {
    hero.addEventListener('pointermove', function (e) {
      if (window.innerWidth < 900) return;
      var rect = hero.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
      var y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
      hero.style.setProperty('--hero-x', x.toFixed(2));
      hero.style.setProperty('--hero-y', y.toFixed(2));
    });
    hero.addEventListener('pointerleave', function () {
      hero.style.setProperty('--hero-x', '0');
      hero.style.setProperty('--hero-y', '0');
    });
  }

  /* PDP accordion — native details/summary is functional without JS.
   * This only adds a keyboard shortcut for power users. */
  document.querySelectorAll('.pdp__accordion').forEach(function (acc) {
    var toggle = acc.querySelector('.pdp__accordion-toggle');
    if (!toggle) return;
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        acc.open = !acc.open;
      }
    });
  });

  /* Newsletter form — prototype, no real submission */
  document.querySelectorAll('.newsletter__form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input  = form.querySelector('.newsletter__input');
      var submit = form.querySelector('.newsletter__submit');
      if (input && input.value.trim()) {
        submit.textContent = 'Thank you';
        submit.style.background = '#6B8F71';
        input.value    = '';
        input.disabled = true;
        submit.disabled = true;
      }
    });
  });

  /* Contact form — prototype, no real submission */
  document.querySelectorAll('form.contact-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.btn--primary');
      if (btn) {
        btn.textContent = 'Message sent';
        btn.style.background = '#6B8F71';
        btn.disabled = true;
      }
    });
  });

})();
