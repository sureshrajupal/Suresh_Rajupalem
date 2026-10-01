/* =========================================================
   script.js  –  Portfolio interactions
   ========================================================= */

// Initialize EmailJS (free tier - no setup needed beyond this)
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY'); // Get this from emailjs.com

const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 60);
  backTop.classList.toggle('visible', scrollY > 400);
});

const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const existing = document.getElementById('mobile-menu');
    if (existing) {
      existing.remove();
      return;
    }

    const menu = document.createElement('div');
    menu.id = 'mobile-menu';
    menu.style.cssText = `
      position: fixed; inset: 0; top: 64px;
      background: rgba(6, 13, 21, 0.97);
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
      a.style.cssText = 'color:#e2e8f0; font-size:1.5rem; font-weight:600;';
      a.addEventListener('click', () => menu.remove());
      menu.appendChild(a);
    });

    const cvBtn = document.createElement('a');
    cvBtn.href = 'cv.html';
    cvBtn.target = '_blank';
    cvBtn.innerHTML = '<i class="fa-solid fa-file-lines"></i> View Full CV';
    cvBtn.className = 'btn btn-outline';
    cvBtn.style.cssText = 'color:#e2e8f0; font-size:1.1rem; padding:0.6rem 1.4rem; display:inline-flex; gap:0.5rem; align-items:center;';
    cvBtn.addEventListener('click', () => menu.remove());
    menu.appendChild(cvBtn);

    const hireBtn = document.createElement('a');
    hireBtn.href = 'https://forms.gle/1jMVRUAYBetpJEtLA';
    hireBtn.target = '_blank';
    hireBtn.rel = 'noopener noreferrer';
    hireBtn.textContent = 'Hire Me';
    hireBtn.className = 'btn btn-primary';
    hireBtn.addEventListener('click', () => menu.remove());
    menu.appendChild(hireBtn);

    document.body.appendChild(menu);
  });
}

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

const animEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
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

// Contact Form - EmailJS Integration
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const btn = contactForm.querySelector('button[type="submit"]');

    // Validation
    if (!nameInput.value.trim() || !emailInput.value.trim() || !phoneInput.value.trim() || !messageInput.value.trim()) {
      const firstEmpty = [nameInput, emailInput, phoneInput, messageInput].find(input => !input.value.trim());
      firstEmpty && firstEmpty.focus();
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

    try {
      // Send email via EmailJS
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: nameInput.value.trim(),
        from_email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        message: messageInput.value.trim(),
        to_email: 'rajupalemsuresh2002@gmail.com'
      });

      // Success - show brief feedback
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      contactForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        btn.disabled = false;
      }, 3000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      btn.innerHTML = '<i class="fa-solid fa-exclamation-circle"></i> Failed to Send';
      btn.disabled = false;
      
      // Reset after 3 seconds
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      }, 3000);
    }
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

const roleCycleEl = document.getElementById('roleCycle');
if (roleCycleEl) {
  const roles = ['Data Analyst', 'HR Executive', 'Digital Marketer'];
  let roleIndex = 0;

  const cycleRole = () => {
    roleCycleEl.style.transition = 'opacity .4s ease, transform .4s ease';
    roleCycleEl.style.opacity = '0';
    roleCycleEl.style.transform = 'translateY(-8px)';

    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleCycleEl.textContent = roles[roleIndex];
      roleCycleEl.style.transform = 'translateY(8px)';
      setTimeout(() => {
        roleCycleEl.style.opacity = '1';
        roleCycleEl.style.transform = 'translateY(0)';
      }, 50);
    }, 400);
  };

  setInterval(cycleRole, 2500);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
