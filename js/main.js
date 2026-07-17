/* Game of Grill — Interaktion & Motion
   Vanilla JS, keine Abhängigkeiten. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Jahr im Footer ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Nav: schrumpfen beim Scrollen ---- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('shrunk');
    else nav.classList.remove('shrunk');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile-Menü ---- */
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    var setMenu = function (open) {
      links.classList.toggle('open', open);
      nav.classList.toggle('menu-open', open);
      document.body.classList.toggle('no-scroll', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    };
    burger.addEventListener('click', function () {
      setMenu(!links.classList.contains('open'));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) setMenu(false);
    });
  }

  /* ---- Reveal beim Scrollen ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.16 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Öffnungszeiten: geöffnet? + heutigen Tag markieren ---- */
  (function () {
    var OPEN = 11 * 60, CLOSE = 23 * 60 + 30; // 11:00 – 23:30
    var now = new Date();
    var mins = now.getHours() * 60 + now.getMinutes();
    var isOpen = mins >= OPEN && mins < CLOSE;

    var badge = document.getElementById('openBadge');
    var txt = document.getElementById('openText');
    if (txt) txt.textContent = isOpen ? 'Jetzt geöffnet' : 'Gerade geschlossen';
    if (badge && !isOpen) badge.style.opacity = '.55';

    var today = now.getDay(); // 0=So
    var row = document.querySelector('.hours__row[data-day="' + today + '"]');
    if (row && isOpen) row.classList.add('is-open');
  })();

  /* ---- Aufsteigende Glut (Canvas) — Hero + Foto-Bänder ---- */
  function initEmbers(canvas, mode) {
    var ctx = canvas.getContext('2d');
    var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var parts = [];
    var cap = mode === 'wide' ? 60 : 46;

    function size() {
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn() {
      var x, y;
      if (mode === 'wide') { x = W * Math.random(); y = H * (0.82 + Math.random() * 0.16); }
      else { x = W * (0.32 + Math.random() * 0.36); y = H * (0.62 + Math.random() * 0.2); }
      return {
        x: x, y: y,
        r: 0.6 + Math.random() * 1.8,
        vy: 0.3 + Math.random() * 0.9,
        vx: (Math.random() - 0.5) * 0.4,
        life: 0, max: 60 + Math.random() * 90,
        hue: 30 + Math.random() * 18
      };
    }
    function tick() {
      ctx.clearRect(0, 0, W, H);
      if (parts.length < cap && Math.random() > 0.3) parts.push(spawn());
      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i];
        p.life++; p.y -= p.vy; p.x += p.vx; p.vx += (Math.random() - 0.5) * 0.06;
        var t = p.life / p.max;
        if (t >= 1) { parts.splice(i, 1); continue; }
        var a = Math.sin(t * Math.PI) * (mode === 'wide' ? 0.65 : 0.9);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + p.hue + ',95%,' + (55 + t * 15) + '%,' + a + ')';
        ctx.shadowBlur = 8; ctx.shadowColor = 'rgba(230,150,45,.8)';
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      requestAnimationFrame(tick);
    }
    size();
    window.addEventListener('resize', size);
    requestAnimationFrame(tick);
  }

  if (!reduce) {
    var heroCanvas = document.getElementById('embers');
    if (heroCanvas) initEmbers(heroCanvas, 'center');
    document.querySelectorAll('.feature__embers').forEach(function (c) { initEmbers(c, 'wide'); });
  }
})();
