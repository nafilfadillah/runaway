/* ===========================
   RUNAWAY STUDIO — script.js
=========================== */

/* ── PARTICLES ─────────────────── */
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function createParticles() {
    particles = [];
    const count = Math.floor(W / 12);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: rand(0, W), y: rand(0, H),
        r: rand(0.5, 2),
        dx: rand(-0.3, 0.3), dy: rand(-0.3, 0.3),
        alpha: rand(0.1, 0.5)
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(189,154,46,${p.alpha})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
})();

/* ── PRELOADER ──────────────────── */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) {
    pre.style.opacity = '0';
    setTimeout(() => pre.style.display = 'none', 700);
  }
});

/* ── SCROLL PROGRESS BAR ────────── */
window.addEventListener('scroll', () => {
  const prog = document.getElementById('progress');
  if (prog) {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    prog.style.width = scrolled + '%';
  }

  /* top button */
  const btn = document.getElementById('topBtn');
  if (btn) btn.classList.toggle('show', window.scrollY > 400);

  /* active nav link on scroll */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    const bottom = top + sec.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-menu a[href="#${sec.id}"]`);
      if (active) active.classList.add('active');
    }
  });
});

/* ── TOP BUTTON ─────────────────── */
const topBtn = document.getElementById('topBtn');
if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── TYPING EFFECT ──────────────── */
const typingEl = document.getElementById('typing');
if (typingEl) {
  const texts = ['Wedding Photography', 'Cinematic Videography', 'Graduation Moments', 'Commercial Branding'];
  let i = 0, j = 0, del = false;
  function type() {
    const current = texts[i];
    typingEl.textContent = del ? current.substring(0, j--) : current.substring(0, j++);
    if (!del && j === current.length + 1) { del = true; setTimeout(type, 1200); return; }
    if (del && j === 0) { del = false; i = (i + 1) % texts.length; }
    setTimeout(type, del ? 60 : 100);
  }
  type();
}

/* ── PORTFOLIO FILTER ───────────── */
const filterBtns = document.querySelectorAll('.portfolio-filter button');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.textContent.trim().toLowerCase();

    portfolioItems.forEach(item => {
      const itemCat = (item.dataset.category || '').toLowerCase();
      if (cat === 'all' || itemCat === cat) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn .4s ease';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

/* ── FAQ ACCORDION ──────────────── */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    faqItems.forEach(f => {
      f.classList.remove('open');
      f.querySelector('.faq-answer').style.maxHeight = null;
      f.querySelector('.fas').classList.replace('fa-minus', 'fa-plus');
    });
    if (!isOpen) {
      item.classList.add('open');
      item.querySelector('.faq-answer').style.maxHeight =
        item.querySelector('.faq-answer').scrollHeight + 'px';
      item.querySelector('.fas').classList.replace('fa-plus', 'fa-minus');
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

    const text = `Halo Runaway Studio! 👋\n\nSaya ingin booking sesi:\n\n*Nama:* ${name}\n*Email:* ${email}\n*Jenis Event:* ${event}\n*Pesan:* ${message}\n\nMohon infonya ya, terima kasih!`;
    const url = `https://wa.me/6285774447910?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}

/* ── LIGHTBOX ───────────────────── */
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox?.querySelector('img');
const closeBtn = document.getElementById('closeLightbox');

document.querySelectorAll('.portfolio-item img').forEach(img => {
  img.addEventListener('click', () => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
    setTimeout(() => lightbox.classList.add('active'), 10);
  });
});

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    setTimeout(() => lightbox.style.display = 'none', 400);
  });
}

if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      setTimeout(() => lightbox.style.display = 'none', 400);
    }
  });
}

/* ── MOBILE MENU ────────────────── */
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.querySelector('.nav-menu');
if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
  });
}

/* ── FADE IN ANIMATION ──────────── */
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity:0; transform:scale(.96); } to { opacity:1; transform:scale(1); } }`;
document.head.appendChild(style);
