/* ===========================
   RUNAWAY STUDIO — script.js
   Version 2.0 — Full Upgrade
=========================== */

/* ── PAGE TRANSITION ────────────── */
const transitionEl = document.createElement('div');
transitionEl.id = 'page-transition';
transitionEl.style.cssText = `
  position:fixed;inset:0;
  background:linear-gradient(135deg,#b8962e,#d4af37);
  z-index:999998;
  transform:translateY(100%);
  transition:transform .5s cubic-bezier(.77,0,.18,1);
  pointer-events:none;
`;
document.body.appendChild(transitionEl);

window.addEventListener('load', () => {
  transitionEl.style.transform = 'translateY(-100%)';
  setTimeout(() => { transitionEl.style.transform = 'translateY(-110%)'; }, 600);
});

document.addEventListener('click', e => {
  const link = e.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || link.target === '_blank') return;
  e.preventDefault();
  transitionEl.style.transform = 'translateY(0)';
  setTimeout(() => { window.location.href = href; }, 480);
});

/* ── PRELOADER ──────────────────── */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (!pre) return;
  setTimeout(() => {
    pre.style.opacity = '0';
    setTimeout(() => pre.remove(), 700);
  }, 400);
});

/* ── PARTICLES ──────────────────── */
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function rand(a, b) { return Math.random() * (b - a) + a; }

  function init() {
    particles = [];
    const n = Math.floor(W / 14);
    for (let i = 0; i < n; i++) {
      particles.push({ x: rand(0,W), y: rand(0,H), r: rand(.4,1.8), dx: rand(-.25,.25), dy: rand(-.25,.25), a: rand(.08,.4) });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const isDark = document.body.classList.contains('dark-mode');
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? `rgba(212,175,55,${p.a})` : `rgba(184,150,46,${p.a * .7})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }

  resize(); init(); draw();
  window.addEventListener('resize', () => { resize(); init(); });
})();

/* ── NAVBAR SHRINK ON SCROLL ────── */
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  /* shrink */
  if (navbar) {
    navbar.classList.toggle('scrolled', y > 60);
    /* hide on scroll down, show on scroll up */
    if (y > lastScroll && y > 120) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScroll = y;
  }

  /* progress bar */
  const prog = document.getElementById('progress');
  if (prog) {
    const pct = (y / (document.body.scrollHeight - window.innerHeight)) * 100;
    prog.style.width = pct + '%';
  }

  /* top button */
  const btn = document.getElementById('topBtn');
  if (btn) btn.classList.toggle('show', y > 400);

  /* active nav link */
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const btm = top + sec.offsetHeight;
    if (y >= top && y < btm) {
      document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-menu a[href="#${sec.id}"]`);
      if (match) match.classList.add('active');
    }
  });
});

/* ── TOP BUTTON ─────────────────── */
const topBtn = document.getElementById('topBtn');
if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── TYPING EFFECT ──────────────── */
const typingEl = document.getElementById('typing');
if (typingEl) {
  const texts = ['Wedding Photography', 'Cinematic Videography', 'Graduation Moments', 'Commercial Branding', 'Drone Aerial'];
  let i = 0, j = 0, del = false;
  function type() {
    const cur = texts[i];
    typingEl.textContent = del ? cur.slice(0, j--) : cur.slice(0, j++);
    if (!del && j === cur.length + 1) { del = true; setTimeout(type, 1400); return; }
    if (del && j === 0) { del = false; i = (i + 1) % texts.length; }
    setTimeout(type, del ? 55 : 95);
  }
  type();
}

/* ── COUNTER ANIMATION ──────────── */
function animateCounter(el) {
  const target = el.textContent.trim();
  const num = parseFloat(target.replace(/[^0-9.]/g, ''));
  const suffix = target.replace(/[0-9.]/g, '');
  if (!num) return;
  let start = 0;
  const duration = 1800;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    const current = Math.floor(eased * num);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.about-grid h3').forEach(el => animateCounter(el));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.about-grid').forEach(el => counterObserver.observe(el));

/* ── PORTFOLIO FILTER ───────────── */
const filterBtns = document.querySelectorAll('.portfolio-filter button');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = (btn.dataset.filter || btn.textContent.trim()).toLowerCase();
    portfolioItems.forEach(item => {
      const itemCat = (item.dataset.category || '').toLowerCase();
      const show = cat === 'all' || itemCat === cat;
      item.style.transition = 'opacity .35s ease, transform .35s ease';
      if (show) {
        item.style.opacity = '0'; item.style.transform = 'scale(.95)';
        item.style.display = 'block';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          item.style.opacity = '1'; item.style.transform = 'scale(1)';
        }));
      } else {
        item.style.opacity = '0'; item.style.transform = 'scale(.95)';
        setTimeout(() => { item.style.display = 'none'; }, 350);
      }
    });
  });
});

/* ── FAQ ACCORDION ──────────────── */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-question')?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(f => {
      f.classList.remove('open');
      f.querySelector('.faq-answer').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      item.querySelector('.faq-answer').style.maxHeight = item.querySelector('.faq-answer').scrollHeight + 'px';
    }
  });
});

/* ── CONTACT FORM → WHATSAPP ────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('contactName')?.value.trim() || '';
    const email   = document.getElementById('contactEmail')?.value.trim() || '';
    const event   = document.getElementById('contactEvent')?.value.trim() || '';
    const message = document.getElementById('contactMessage')?.value.trim() || '';
    const text = `Halo Runaway Studio! 👋\n\nSaya ingin menghubungi kalian:\n\n*Nama:* ${name}\n*Email:* ${email || '-'}\n*Jenis Event:* ${event || '-'}\n*Pesan:* ${message || '-'}\n\nMohon responnya, terima kasih! 🙏`;
    window.open(`https://wa.me/6285774447910?text=${encodeURIComponent(text)}`, '_blank');
  });
}

/* ── BOOKING FORM → WHATSAPP ────── */
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    const name     = document.getElementById('bookName')?.value.trim() || '';
    const phone    = document.getElementById('bookPhone')?.value.trim() || '';
    const email    = document.getElementById('bookEmail')?.value.trim() || '';
    const service  = document.getElementById('bookService')?.value || '';
    const date     = document.getElementById('bookDate')?.value || '';
    const location = document.getElementById('bookLocation')?.value.trim() || '';
    const notes    = document.getElementById('bookNotes')?.value.trim() || '';
    const text = `Halo Runaway Studio! 📸\n\nSaya ingin request booking:\n\n*Nama:* ${name}\n*WhatsApp:* ${phone}\n*Email:* ${email || '-'}\n*Layanan:* ${service}\n*Tanggal:* ${date || '-'}\n*Lokasi:* ${location || '-'}\n*Catatan:* ${notes || '-'}\n\nMohon konfirmasinya! 🙏`;
    window.open(`https://wa.me/6285774447910?text=${encodeURIComponent(text)}`, '_blank');
    window.location.href = 'thankyou.html';
  });
}

/* ── LIGHTBOX ───────────────────── */
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox?.querySelector('img');
const lbClose = document.getElementById('closeLightbox');

document.querySelectorAll('.portfolio-item img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    if (!lightbox || !lbImg) return;
    lbImg.src = img.src;
    lightbox.style.display = 'flex';
    requestAnimationFrame(() => lightbox.classList.add('active'));
  });
});

function closeLightbox() {
  lightbox?.classList.remove('active');
  setTimeout(() => { if (lightbox) lightbox.style.display = 'none'; }, 350);
}
lbClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ── MOBILE MENU ────────────────── */
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.querySelector('.nav-menu');
if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    const open = navMenu.style.display === 'flex';
    navMenu.style.cssText = open
      ? 'display:none'
      : `display:flex;flex-direction:column;position:fixed;top:80px;left:0;right:0;background:var(--white,#faf7f2);padding:20px;gap:8px;border-bottom:1px solid var(--border2,rgba(0,0,0,.07));z-index:9998;box-shadow:0 10px 30px rgba(0,0,0,.1);`;
  });
  /* close menu on link click */
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { navMenu.style.display = 'none'; });
  });
}

/* ── DARK / LIGHT MODE ──────────── */
const darkToggle = document.getElementById('darkToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedMode = localStorage.getItem('rw_mode');

function applyMode(dark) {
  document.body.classList.toggle('dark-mode', dark);
  if (darkToggle) {
    darkToggle.innerHTML = dark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    darkToggle.title = dark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }
  localStorage.setItem('rw_mode', dark ? 'dark' : 'light');
}

applyMode(savedMode ? savedMode === 'dark' : prefersDark);
darkToggle?.addEventListener('click', () => applyMode(!document.body.classList.contains('dark-mode')));

/* ── SMOOTH IMAGE LOAD ──────────── */
document.querySelectorAll('img').forEach(img => {
  img.style.transition = 'opacity .4s ease';
  if (!img.complete) {
    img.style.opacity = '0';
    img.addEventListener('load', () => { img.style.opacity = '1'; });
  }
});
