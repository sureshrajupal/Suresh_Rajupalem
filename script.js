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

    if (!nameInput.value.trim() || !emailInput.value.trim() || !phoneInput.value.trim() || !messageInput.value.trim()) {
      const firstEmpty = [nameInput, emailInput, phoneInput, messageInput].find(input => !input.value.trim());
      firstEmpty && firstEmpty.focus();
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

    try {
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: nameInput.value.trim(),
        from_email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        message: messageInput.value.trim(),
        to_email: 'rajupalemsuresh2002@gmail.com'
      });

      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      contactForm.reset();
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        btn.disabled = false;
      }, 3000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      btn.innerHTML = '<i class="fa-solid fa-exclamation-circle"></i> Failed to Send';
      btn.disabled = false;
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

// MBA specialization and portfolio-wide Finance-to-Marketing update.
(() => {
  const replacements = [
    ['Finance and Human Resources', 'Human Resources and Marketing'],
    ['Finance & Human Resources', 'Human Resources & Marketing'],
    ['MBA, Finance & HR', 'MBA, HR & Marketing'],
    ['MBA (Finance & HR)', 'MBA (HR & Marketing)'],
    ['Finance', 'Marketing'],
    ['financial', 'marketing'],
    ['Funds Flow Analysis', 'Marketing Campaign Analysis']
  ];

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach(node => {
    let text = node.textContent;
    replacements.forEach(([from, to]) => {
      text = text.replaceAll(from, to);
    });
    node.textContent = text;
  });

  document.querySelectorAll('.edu-spec').forEach(el => {
    el.textContent = ' (HR & Marketing)';
  });

  document.querySelectorAll('.about-highlight').forEach(card => {
    const heading = card.querySelector('h3');
    if (heading && /Marketing/i.test(card.textContent)) {
      heading.textContent = heading.textContent
        .replace(/Finance and Human Resources/gi, 'Human Resources and Marketing')
        .replace(/Finance &amp; HR/gi, 'HR & Marketing')
        .replace(/Finance & HR/gi, 'HR & Marketing')
        .replace(/MBA, Marketing &amp; HR/gi, 'MBA, HR & Marketing')
        .replace(/MBA, Finance & HR/gi, 'MBA, HR & Marketing');
    }
  });

  document.querySelectorAll('.project-card').forEach(card => {
    if (/Marketing Campaign Analysis|Marketing/i.test(card.textContent)) {
      const title = card.querySelector('h3');
      const description = card.querySelector('p');
      const tags = card.querySelector('.project-tags');
      if (title && title.textContent.includes('Marketing Campaign Analysis')) {
        title.textContent = 'Marketing Campaign Analysis';
      }
      if (description && /capital movement|marketing sources/i.test(description.textContent)) {
        description.textContent = 'Reviewed digital marketing campaigns and audience engagement to identify effective channels, performance insights, and opportunities for brand growth.';
      }
      if (tags) {
        tags.innerHTML = '<span class="tag">Marketing</span><span class="tag">Campaign Analysis</span><span class="tag">Academic</span>';
      }
    }
  });

  document.querySelectorAll('.skill-card').forEach(card => {
    if (/Tally Prime|GST Basics|marketing documentation/i.test(card.textContent)) {
      const title = card.querySelector('h4');
      const description = card.querySelector('p');
      if (title) title.textContent = 'Digital Marketing Fundamentals';
      if (description) description.textContent = 'Understanding audience targeting, campaign planning, social media promotion, and digital marketing documentation.';
      const icon = card.querySelector('.skill-icon');
      if (icon) icon.className = 'skill-icon dm-social';
    }
  });
})();
