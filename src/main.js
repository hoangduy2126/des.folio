import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ===================== CURSOR ===================== */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  gsap.to(cursor, { x: mx, y: my, duration: 0 });
  gsap.to(trail,  { x: mx, y: my, duration: 0.12 });
});

document.querySelectorAll('a, button, .tool-chip, .work-card, .social-link, .timeline-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

/* ===================== TYPEWRITER ===================== */
const roles = [
  'UI / UX Designer_',
  'Brand Identity Designer_',
  'Visual Storyteller_',
  'Motion Designer_',
  'Creative Director_',
];
let roleIdx = 0, charIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeLoop() {
  const current = roles[roleIdx];
  tw.textContent = deleting ? current.slice(0, charIdx--) : current.slice(0, ++charIdx);
  if (!deleting && charIdx === current.length) {
    setTimeout(() => { deleting = true; typeLoop(); }, 1800);
    return;
  }
  if (deleting && charIdx === 0) {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

/* ===================== PIXEL AVATAR CANVAS ===================== */
// Avatar removed — hero is now centered text-only

/* ===================== NAV SCROLL ===================== */
ScrollTrigger.create({
  start: 80,
  onEnter: () => document.getElementById('nav').style.boxShadow = '0 4px 16px rgba(0,0,0,.08)',
  onLeaveBack: () => document.getElementById('nav').style.boxShadow = 'none',
});

/* ===================== HERO ENTRANCE ===================== */
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTl
  .from('#heroTag',   { y: 20, opacity: 0, duration: .6 })
  .from('.name-line', { y: 60, opacity: 0, duration: .7, stagger: .12 }, '-=.3')
  .from('#heroRole',  { y: 20, opacity: 0, duration: .5 }, '-=.2')
  .from('#heroCta',   { y: 20, opacity: 0, duration: .5 }, '-=.2');




/* ===================== SCROLL ANIMATIONS ===================== */
// Bento cells fade-in on scroll
gsap.utils.toArray('.bento-cell').forEach((cell, i) => {
  gsap.from(cell, {
    scrollTrigger: { trigger: cell, start: 'top 88%' },
    y: 30, opacity: 0, duration: .65, delay: i * .07, ease: 'power2.out'
  });
});

// Work cards
gsap.utils.toArray('.work-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 90%' },
    y: 20, opacity: 0, duration: .5, delay: i * .08, ease: 'power2.out'
  });
});



// Skill bars animate when visible
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.skill-fill').forEach(fill => {
      const pct = fill.dataset.pct;
      gsap.to(fill, { width: pct + '%', duration: 1.3, ease: 'power2.out', delay: .1 });
    });
    skillObserver.unobserve(e.target);
  });
}, { threshold: 0.3 });
document.querySelectorAll('.cell-skills').forEach(g => skillObserver.observe(g));

/* ===================== PARALLAX GRID BG ===================== */
gsap.to('.hero-grid-bg', {
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  y: 60, ease: 'none'
});

/* ===================== CONTACT FORM ===================== */
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = document.getElementById('formSubmit');
  const original = btn.innerHTML;
  btn.innerHTML = '<span class="btn-text">SENT ✓</span>';
  btn.style.background = '#00c853';
  btn.style.borderColor = '#00c853';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.style.borderColor = '';
    document.getElementById('contactForm').reset();
  }, 3000);
});

/* ===================== TOPBAR CLOCK ===================== */
const MONTHS    = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const DAYS_FULL = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

function buildTopbarCalendar(now) {
  const cal = document.getElementById('tbCal');
  if (!cal) return;

  const y = now.getFullYear(), m = now.getMonth(), day = now.getDate();
  const firstDay    = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const daysInPrev  = new Date(y, m, 0).getDate();

  cal.innerHTML = '';

  // Month label
  const lbl = document.createElement('span');
  lbl.className = 'topbar-cal-day hdr';
  lbl.textContent = MONTHS[m];
  lbl.style.width = '24px';
  lbl.style.color = '#3d3bff';
  cal.appendChild(lbl);

  // Day-of-week headers
  ['S','M','T','W','T','F','S'].forEach(d => {
    const el = document.createElement('span');
    el.className = 'topbar-cal-day hdr';
    el.textContent = d;
    cal.appendChild(el);
  });

  // Prev-month tail
  for (let i = firstDay - 1; i >= 0; i--) {
    const el = document.createElement('span');
    el.className = 'topbar-cal-day other-month';
    el.textContent = daysInPrev - i;
    cal.appendChild(el);
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement('span');
    el.className = 'topbar-cal-day' + (d === day ? ' today' : '');
    el.textContent = d;
    cal.appendChild(el);
  }

  // Next-month fill (only first row overflow)
  const total = firstDay + daysInMonth;
  const rem = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let d = 1; d <= rem; d++) {
    const el = document.createElement('span');
    el.className = 'topbar-cal-day other-month';
    el.textContent = d;
    cal.appendChild(el);
  }
}

function updateTopbarClock() {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
  let h = now.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const hh = String(h).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  const digits = document.getElementById('tbDigits');
  if (digits) digits.innerHTML = `${hh}<span class="topbar-colon">:</span>${mm}<span class="topbar-colon">:</span>${ss}`;

  const ampmEl = document.getElementById('tbAmpm');
  if (ampmEl) ampmEl.textContent = ampm;

  const dateEl = document.getElementById('tbDate');
  if (dateEl) dateEl.textContent = `${DAYS_FULL[now.getDay()]} · ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

  // Rebuild calendar grid once per minute (or on first call)
  if (now.getSeconds() === 0 || !document.getElementById('tbCal')?.children.length) {
    buildTopbarCalendar(now);
  }
}

updateTopbarClock();
setInterval(updateTopbarClock, 1000);

// Topbar entrance animation (slides up from bottom)
gsap.from('#topbar', { y: 34, opacity: 0, duration: .5, delay: .1, ease: 'power2.out' });
const logo = document.querySelector('.nav-logo');
function glitchLogo() {
  gsap.timeline()
    .to(logo, { skewX: 8, duration: .05 })
    .to(logo, { skewX: -8, duration: .05 })
    .to(logo, { skewX: 0, duration: .05 });
}
setInterval(glitchLogo, 4000);

/* ===================== HORIZONTAL MARQUEE on WORKS hover ===================== */
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card.querySelector('.work-card-accent'), { width: 100, height: 100, duration: .25, ease: 'power1.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card.querySelector('.work-card-accent'), { width: 80, height: 80, duration: .25, ease: 'power1.out' });
  });
});

/* ===================== SHOWCASE CARD — exact-width hover ===================== */
// Computes width = rowHeight × imageAspectRatio so object-fit:cover
// fills edge-to-edge with zero letterboxing and zero top/bottom cropping.
document.querySelectorAll('.sc-card').forEach(card => {
  const img = card.querySelector('img');
  const bar = card.querySelector('.sc-bar');

  const expand = () => {
    const rowH  = card.closest('.showcase-track-wrap').offsetHeight;
    const barH  = bar ? bar.offsetHeight : 0;
    const imgH  = rowH - barH;
    const ratio = img.naturalWidth / img.naturalHeight || 1;
    const w     = Math.min(Math.round(imgH * ratio), 700);
    card.style.width = w + 'px';
  };

  if (img.complete && img.naturalWidth) {
    card.addEventListener('mouseenter', expand);
  } else {
    img.addEventListener('load', () => card.addEventListener('mouseenter', expand));
  }
  card.addEventListener('mouseleave', () => { card.style.width = ''; });
});


/* ===================== NAV LINKS hover pixel flash ===================== */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    gsap.fromTo(link, { letterSpacing: '.2em' }, { letterSpacing: '.12em', duration: .3, ease: 'power2.out' });
  });
});

/* ===================== SMOOTH SCROLL ===================== */
const NAV_H = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();

    const targetY = target.getBoundingClientRect().top + window.scrollY - NAV_H;

    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: false },
      duration: 1.1,
      ease: 'power3.inOut',
    });
  });
});
