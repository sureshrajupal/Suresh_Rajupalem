/* ──────────────────────────────────────────────────────────
   script.js  –  Portfolio interactions
   ────────────────────────────────────────────────────────── */

/* ── 1. Navbar scroll effect ── */
const navbar  = document.getElementById('navbar');
const backTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar solid bg on scroll
  navbar.classList.toggle('scrolled', scrollY > 60);

  // Back-to-top button
  backTop.classList.toggle('visible', scrollY > 400);
});

/* ── 2. Hamburger (mobile) ── */
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  const navCta   = document.querySelector('.nav-cta');

  // Simple slide-in overlay
  const existing = document.getElementById('mobile-menu');
  if (existing) {
    existing.remove();
    return;
  }

  const menu = document.createElement('div');
  menu.id = 'mobile-menu';
  menu.style.cssText = `
    position: fixed; inset: 0; top: 64px;
    background: rgba(10,10,15,.97);
    backdrop-filter: blur(16px);
    z-index: 999;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 2rem;
    animation: fadeIn .2s ease;
  `;
  const links = ['About', 'Experience', 'Education', 'Skills', 'Projects', 'Contact'];
  links.forEach(text => {
    const a = document.createElement('a');
    a.href = `#${text.toLowerCase()}`;
    a.textContent = text;
    a.style.cssText = `color:#e2e8f0; font-size:1.5rem; font-weight:600;`;
    a.addEventListener('click', () => menu.remove());
    menu.appendChild(a);
  });

  const cvBtn = document.createElement('a');
  cvBtn.href = 'cv.html';
  cvBtn.download = 'Suresh_Rajupalem_CV.html';
  cvBtn.target = '_blank';
  cvBtn.innerHTML = '<i class="fa-solid fa-file-lines"></i> View Full CV';
  cvBtn.className = 'btn btn-outline';
  cvBtn.style.cssText = 'color:#e2e8f0; font-size:1.1rem; padding: 0.6rem 1.4rem; display:inline-flex; gap:0.5rem; align-items:center;';
  cvBtn.addEventListener('click', () => menu.remove());
  menu.appendChild(cvBtn);

  const hireBtn = document.createElement('a');
  hireBtn.href = 'https://docs.google.com/forms/d/13RzCHbU1k-b4Z_fHk0Ww1aWpX-jpYzcBuL_8Admenig/edit';
  hireBtn.target = '_blank';
  hireBtn.rel = 'noopener noreferrer';
  hireBtn.textContent = 'Hire Me';
  hireBtn.className = 'btn btn-primary';
  hireBtn.addEventListener('click', () => menu.remove());
  menu.appendChild(hireBtn);

  document.body.appendChild(menu);
});

/* ── 3. Smooth active nav highlighting ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const highlightNav = () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#e2e8f0' : '';
  });
};
window.addEventListener('scroll', highlightNav);

/* ── 4. Intersection Observer – scroll-in animations ── */
const animEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children within same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('[data-animate]')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animEls.forEach(el => observer.observe(el));

/* ── 5. Contact form ── */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const btn = contactForm.querySelector('button[type="submit"]');
    const success = document.getElementById('form-success');

    const requiredFields = [nameInput, emailInput, phoneInput, messageInput];
    const firstEmpty = requiredFields.find(input => !input.value.trim());

    if (firstEmpty) {
      firstEmpty.focus();
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();
    const emailRecipient = 'rajupalemsuresh2002@gmail.com';
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing…';

    window.location.href = `mailto:${emailRecipient}?subject=${subject}&body=${body}`;

    success.style.display = 'block';
    success.textContent = '✅ Your email client is opening with the message ready to send.';
    contactForm.reset();
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    btn.disabled = false;
  });
}

/* ── 6. Footer year ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── 7. Role cycling animation for hero subtitle ── */
const roleCycleEl = document.getElementById('roleCycle');
if (roleCycleEl) {
  const roles = ['Data Analyst', 'HR Executive', 'Digital Marketer'];
  let roleIndex = 0;

  const cycleRole = () => {
    // Fade out
    roleCycleEl.style.transition = 'opacity .4s ease, transform .4s ease';
    roleCycleEl.style.opacity = '0';
    roleCycleEl.style.transform = 'translateY(-8px)';

    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleCycleEl.textContent = roles[roleIndex];
      // Fade in
      roleCycleEl.style.transform = 'translateY(8px)';
      setTimeout(() => {
        roleCycleEl.style.opacity = '1';
        roleCycleEl.style.transform = 'translateY(0)';
      }, 50);
    }, 400);
  };

  setInterval(cycleRole, 2500);
}

/* ── 8. CSS animation keyframe injection ── */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
