/* =============================================
   PORTFOLIO — NASSIM BERRABAH
   main.js
   ============================================= */

// ----- Navbar scroll shadow -----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ----- Burger menu (mobile) -----
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  // Animate burger → X
  const spans = burger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity  = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => {
      s.style.transform = ''; s.style.opacity = '';
    });
  });
});

// ----- Active nav link on scroll -----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

// ----- Generic fade-in -----
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings
      entry.target.style.transitionDelay = (i % 4) * 80 + 'ms';
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => fadeObserver.observe(el));

// ----- Contact form (client-side validation + fetch) -----
const form = document.getElementById('contactForm');
if (form) {
  const fields = {
    name:    { el: document.getElementById('name'),    err: document.getElementById('nameError') },
    email:   { el: document.getElementById('email'),   err: document.getElementById('emailError') },
    message: { el: document.getElementById('message'), err: document.getElementById('messageError') },
  };
  const submitBtn   = document.getElementById('submitBtn');
  const feedback    = document.getElementById('formFeedback');

  function validateField(key) {
    const { el, err } = fields[key];
    let msg = '';
    if (!el.value.trim()) {
      msg = 'Ce champ est requis.';
    } else if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
      msg = 'Adresse email invalide.';
    }
    err.textContent = msg;
    el.classList.toggle('error', !!msg);
    return !msg;
  }

  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('blur', () => validateField(key));
    fields[key].el.addEventListener('input', () => {
      if (fields[key].el.classList.contains('error')) validateField(key);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const valid = Object.keys(fields).map(k => validateField(k)).every(Boolean);
    if (!valid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours…';
    feedback.textContent = '';
    feedback.className = 'form-feedback';

    try {
      const res = await fetch('https://formspree.io/f/myklanae', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name:    fields.name.el.value.trim(),
				email:   fields.email.el.value.trim(),
				message: fields.message.el.value.trim(),
				}),
			});
			const data = await res.json();
			if (res.ok) {
				feedback.textContent = '✓ Message envoyé ! Je te répondrai rapidement.';
				feedback.classList.add('success');
				form.reset();
			} else {
				throw new Error(data.error || 'Erreur envoi');
			}
    } catch (err) {
      feedback.textContent = '✗ ' + (err.message || 'Une erreur est survenue. Réessaie plus tard.');
      feedback.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer le message';
    }
  });
}
