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
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      nav.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        nav.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
      }
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

  /* ---- Hero: aufsteigende Glut (Canvas) ---- */
  var canvas = document.getElementById('embers');
  if (canvas && !reduce) {
    var ctx = canvas.getContext('2d');
    var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var parts = [];

    function size() {
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn() {
      return {
        x: W * (0.32 + Math.random() * 0.36),
        y: H * (0.62 + Math.random() * 0.2),
        r: 0.6 + Math.random() * 1.8,
        vy: 0.3 + Math.random() * 0.9,
        vx: (Math.random() - 0.5) * 0.4,
        life: 0, max: 60 + Math.random() * 90,
        hue: 30 + Math.random() * 18
      };
    }
    function tick() {
      ctx.clearRect(0, 0, W, H);
      if (parts.length < 46 && Math.random() > 0.3) parts.push(spawn());
      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i];
        p.life++; p.y -= p.vy; p.x += p.vx; p.vx += (Math.random() - 0.5) * 0.06;
        var t = p.life / p.max;
        if (t >= 1) { parts.splice(i, 1); continue; }
        var a = Math.sin(t * Math.PI) * 0.9;
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
})();
