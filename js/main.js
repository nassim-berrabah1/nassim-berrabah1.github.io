/* ================================================
   NASSIM BERRABAH — PORTFOLIO
   main.js — Fish, SPA navigation, animations
   ================================================ */

'use strict';

/* ── DATA ── */
const PROJECTS = [
  {
    id: 'powerbi',
    icon: '📊',
    title: 'Dashboard Power BI — Santé mentale',
    short: 'Tableau de bord multi-pages sur un dataset Lifestyle & Mental Health.',
    desc: `Ce projet explore les liens entre mode de vie et santé mentale à travers un tableau de bord Power BI interactif et multi-pages. Les données proviennent d'un dataset public de 5 000 entrées sur des indicateurs lifestyle.`,
    features: [
      'Tableau de bord multi-pages avec navigation fluide',
      'Mesures DAX personnalisées pour les KPIs',
      'Table de dimension calendrier simulée',
      'Visualisations : cartes, graphiques, matrices',
      'Filtres croisés dynamiques entre les pages',
    ],
    tags: ['Power BI', 'DAX', 'Data viz', 'ETL'],
    github: 'https://github.com/nassim-berrabah1/dashboard-powerbi-santemental',
    screenshots: ['assets/dashboard/dashboard1.png', 'assets/dashboard/dashboard2.png'],
    color: '#7c6fff',
  },
  {
    id: 'SonicSound',
    icon: '🎵',
    title: 'SonicSound — Supervision audio',
    short: 'Application web de supervision de lecteurs audio en Vue.js + Laravel.',
    desc: `SoniSound est une application web complète permettant la supervision et le contrôle de lecteurs audio distants. Le backend REST en Laravel expose des endpoints pour gérer les états des lecteurs, tandis que Vue.js offre une interface réactive en temps réel.`,
    features: [
      'Interface de supervision en temps réel avec Vue.js',
      'Backend REST sécurisé avec Laravel',
      'Intégration WordPress pour le CMS frontal',
      'Authentification utilisateur et gestion des rôles',
      'Historique des lectures et statistiques',
    ],
    tags: ['Vue.js', 'Laravel', 'WordPress', 'REST API', 'PHP'],
    github: 'https://github.com/nassim-berrabah1/SonicSound',
    screenshots: ['assets/supervision/super1.jpeg', 'assets/supervision/super2.jpeg', 'assets/supervision/super3.jpeg', 'assets/supervision/super4.jpeg'],
    color: '#ff6b9d',
  },
  {
    id: 'reseaux',
    icon: '📈',
    title: 'Analyse réseaux sociaux',
    short: 'Visualisations comparatives Europe vs Asie sur 5 000 utilisateurs.',
    desc: `Analyse exploratoire d'un dataset de 5 000 utilisateurs de réseaux sociaux. Le projet compare les comportements numériques entre utilisateurs européens et asiatiques à travers des visualisations avancées : radar, violin plot et diverging bar chart.`,
    features: [
      'Nettoyage et préparation des données avec Pandas',
      'Comparaison Europe vs Asie sur 12 indicateurs',
      'Radar chart pour profils multi-dimensionnels',
      'Violin plot pour distribution des comportements',
      'Diverging chart pour analyse des écarts',
    ],
    tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Data Analysis'],
    github: 'https://github.com/nassim-berrabah1/analyse-dataset-reseaux-sociaux',
    screenshots: ['assets/dataset/dataset1.png', 'assets/dataset/dataset2.png', 'assets/dataset/dataset3.png'],
    color: '#6ef08a',
  },
  {
    id: 'snake',
    icon: '🐍',
    title: 'Snake Game',
    short: 'Jeu Snake en Python sur interface graphique avec menu et 3 terrains.',
    desc: `Implémentation du jeu Snake en Python, entièrement jouable sur interface graphique python. Le projet met en avant la gestion d'état, la boucle de jeu, et l'UX en mode console avec gestion du score, plusieurs niveaux de difficulté et un écran de game over stylisé.`,
    features: [
      'Menu de démarrage interactif en ASCII art',
      '3 terrains de jeu avec obstacles différents',
      'Score en temps réel affiché dans l\'interface',
      'Niveaux de difficulté (vitesse de la boucle)',
      'Écran Game Over avec récapitulatif de session',
    ],
    tags: ['Python', 'Terminal', 'Game Dev', 'VS Code'],
    github: 'https://github.com/nassim-berrabah1/SnakeGame',
    screenshots: ['assets/snake/snake1.png', 'assets/snake/snake2.png', 'assets/snake/snake3.png', 'assets/snake/snake4.png'],
    color: '#ffd86b',
  },
];

/* ── SPA NAVIGATION ── */
function initNav() {
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-link');
  const burger = document.getElementById('burger');
  const navLinksContainer = document.getElementById('navLinks');
  const navbar = document.getElementById('navbar');

  function showPage(pageId) {
    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    const page = document.getElementById('page-' + pageId);
    if (page) {
      page.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => triggerReveal(), 100);
    }

    navLinks.forEach(l => {
      if (l.dataset.page === pageId) l.classList.add('active');
    });

    // close mobile menu
    navLinksContainer.classList.remove('open');

    // update hash
    history.pushState({}, '', '#' + pageId);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showPage(link.dataset.page);
    });
  });

  // Handle internal links (hero CTAs, etc.)
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-page-link]');
    if (el) {
      e.preventDefault();
      showPage(el.dataset.pageLink);
    }
  });

  // Burger
  if (burger) {
    burger.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });
  }

  // Scroll navbar
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Init from hash
  const hash = location.hash.slice(1) || 'accueil';
  showPage(hash);
}

/* ── SCROLL REVEAL ── */
function triggerReveal() {
  const els = document.querySelectorAll('.page.active .reveal:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(el => observer.observe(el));
}

/* ── SKILL BARS ── */
function animateSkillBars() {
  const fills = document.querySelectorAll('.skill-fill[data-width]');
  fills.forEach(fill => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fill.style.width = fill.dataset.width + '%';
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(fill);
  });
}

/* ── CV PREVIEW MODAL ── */
function initCVModal() {
  const overlay = document.getElementById('cvPreviewOverlay');
  const closeBtn = document.getElementById('cvPreviewClose');

  document.getElementById('btnPreviewCV')?.addEventListener('click', () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* ── PROJECT MODAL ── */
let currentProject = null;
let currentTab = 'desc';

function openProjectModal(id) {
  const project = PROJECTS.find(p => p.id === id);
  if (!project) return;
  currentProject = project;

  const overlay = document.getElementById('projectModalOverlay');

  // Populate sidebar
  document.getElementById('modalSideIcon').textContent = project.icon;
  document.getElementById('modalSideTitle').textContent = project.title;
  document.getElementById('modalSideDesc').textContent = project.short;

  const tagsEl = document.getElementById('modalSideTags');
  tagsEl.innerHTML = project.tags.map(t => `<span class="tag">${t}</span>`).join('');

  // Populate main content
  renderModalTab('desc', project);
  setModalTab('desc');

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderModalTab(tab, project) {
  if (tab === 'desc') {
    document.getElementById('modalTabDesc').innerHTML = `
      <p class="modal-desc-text">${project.desc}</p>
      <h4 style="font-size:.8rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:12px;">Fonctionnalités</h4>
      <ul class="modal-features">
        ${project.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <a href="${project.github}" target="_blank" rel="noopener" class="modal-gh-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
        Voir sur GitHub
      </a>
    `;
  } else if (tab === 'screenshots') {
    document.getElementById('modalTabScreenshots').innerHTML = `
      <div class="modal-screenshots">
        ${project.screenshots.map(s => `
          <img src="${s}" alt="Capture du projet" loading="lazy"
              style="width:100%;border-radius:8px;display:block;margin-bottom:12px;">
        `).join('')}
      </div>
    `;
  }
}

function setModalTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.modal-tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.modal-nav-item').forEach(el => el.classList.remove('active'));

  document.getElementById('modalTab' + tab.charAt(0).toUpperCase() + tab.slice(1))?.classList.add('active');
  document.querySelector(`.modal-nav-item[data-tab="${tab}"]`)?.classList.add('active');

  if (currentProject) renderModalTab(tab, currentProject);
}

function closeProjectModal() {
  document.getElementById('projectModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function initProjectModal() {
  document.getElementById('projectModalOverlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('projectModalOverlay')) closeProjectModal();
  });

  document.getElementById('modalCloseBtn')?.addEventListener('click', closeProjectModal);

  document.querySelectorAll('.modal-nav-item').forEach(item => {
    item.addEventListener('click', () => setModalTab(item.dataset.tab));
  });

  // Project cards
  document.querySelectorAll('.project-card[data-id]').forEach(card => {
    card.addEventListener('click', () => openProjectModal(card.dataset.id));
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProjectModal();
  });
}

/* ── CONTACT FORM ── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    let valid = true;

    const name    = document.getElementById('cname');
    const email   = document.getElementById('cemail');
    const message = document.getElementById('cmessage');
    const feedback = document.getElementById('formFeedback');

    [name, email, message].forEach(field => {
      const err = document.getElementById(field.id + 'Error');
      if (!field.value.trim()) {
        err.textContent = 'Ce champ est requis.';
        valid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        err.textContent = 'Adresse e-mail invalide.';
        valid = false;
      } else {
        err.textContent = '';
      }
    });

    if (!valid) return;

    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        feedback.textContent = '✓ Message envoyé ! Je te répondrai bientôt.';
        feedback.className = 'form-feedback success';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      feedback.textContent = '✗ Erreur lors de l\'envoi. Essaie par email directement.';
      feedback.className = 'form-feedback error';
    }

    btn.textContent = 'Envoyer le message ✉';
    btn.disabled = false;
  });
}

/* ── SPIDERVERSE INTERESTS ── */
function initSpiderWeb() {
  const wrap = document.getElementById('spiderWrap');
  if (!wrap) return;

  const svg = document.getElementById('webSvg');
  const nodesEl = document.getElementById('spiderNodes');
  const tooltip = document.getElementById('spiderTooltip');
  const ttName = document.getElementById('ttName');
  const ttDesc = document.getElementById('ttDesc');

  const W = 1000, H = 580;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  // positions en % — disposées comme une vraie toile
  const interests = [
    { id: 0, name: 'Voitures',     img: 'assets/passion/voiture.jpeg',      desc: 'Les gros gamos, la vitesse et le bruit d\'un V8 quelle douce mélodie...',    x: 0.50, y: 0.45 },
    { id: 1, name: 'Voyages',      img: 'assets/passion/voyage.jpeg',       desc: 'J\'aime écouvrir le monde, ses cultures et rencontrer de nouvelles personnes !',             x: 0.25, y: 0.10 },
    { id: 2, name: 'Langues',      img: 'assets/passion/culture.jpeg',      desc: 'Bilingue arabe, C1 italien, j\'apprend de nouvelles langues pour le plaisir',       x: 0.75, y: 0.10 },
    { id: 3, name: 'Data & Viz',   img: 'assets/passion/data.jpeg',                 desc: 'Transformer des données brutes en visualisations concrètes et créatives',          x: 0.88, y: 0.50 },
    { id: 4, name: 'Calligraphie', img: 'assets/passion/calligraphie.jpeg', desc: 'La calligraphie arabe, un art qui me permet d\'exprimer ma crétivité :)',             x: 0.12, y: 0.50 },
    { id: 5, name: 'Sport',        img: 'assets/passion/sport.jpeg',        desc: 'Volleyball, vélo',                         x: 0.30, y: 0.85 },
    { id: 6, name: 'Peinture',     img: 'assets/passion/peinture.jpeg',     desc: 'Tableaux, dessin et coloriage, racordé à la calligraphie j\'aime aussi dessiné', x: 0.70, y: 0.85 },
    { id: 7, name: 'Cultures',     img: 'assets/passion/culture.jpeg',      desc: 'Passionné par la diversité culturelle, les traditions et les récits du monde',    x: 0.50, y: 0.88 },
  ];

  // connexions qui forment une vraie toile symétrique
  const connections = [
    // centre vers tous
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
    // anneau extérieur
    [1,2],[2,3],[3,6],[6,7],[7,5],[5,4],[4,1],
    // diagonales
    [1,7],[2,5],[3,4],[6,4],
  ];

  function getPos(n) {
    return { x: n.x * W, y: n.y * H };
  }

  function drawWeb() {
    svg.innerHTML = '';

    // toile décorative de fond (rayons + cercles concentriques depuis le centre)
    const cx = W * 0.50, cy = H * 0.45;
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy);
      line.setAttribute('x2', cx + Math.cos(angle) * 600);
      line.setAttribute('y2', cy + Math.sin(angle) * 600);
      line.setAttribute('stroke', 'rgba(230,57,70,0.05)');
      line.setAttribute('stroke-width', '0.5');
      svg.appendChild(line);
    }
    for (const r of [80, 160, 240, 320]) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', cx); circle.setAttribute('cy', cy); circle.setAttribute('r', r);
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', 'rgba(230,57,70,0.05)');
      circle.setAttribute('stroke-width', '0.5');
      svg.appendChild(circle);
    }

    // fils de connexion
    connections.forEach(([a, b]) => {
      const pa = getPos(interests[a]);
      const pb = getPos(interests[b]);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', pa.x); line.setAttribute('y1', pa.y);
      line.setAttribute('x2', pb.x); line.setAttribute('y2', pb.y);
      line.setAttribute('stroke', 'rgba(230,57,70,0.28)');
      line.setAttribute('stroke-width', '1');
      line.id = `web-line-${a}-${b}`;
      svg.appendChild(line);

      // petit nœud au milieu du fil
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', (pa.x + pb.x) / 2);
      dot.setAttribute('cy', (pa.y + pb.y) / 2);
      dot.setAttribute('r', '2');
      dot.setAttribute('fill', 'rgba(230,57,70,0.35)');
      svg.appendChild(dot);
    });
  }

  function buildNodes() {
    nodesEl.innerHTML = '';
    interests.forEach(n => {
      const div = document.createElement('div');
      div.className = 'spider-node';
      div.style.left = (n.x * 100) + '%';
      div.style.top  = (n.y * 100) + '%';
      div.innerHTML = `
        <div class="spider-node-inner">
          <img class="spider-node-img" src="${n.img}" alt="${n.name}">
        </div>
        <span class="spider-node-label">${n.name}</span>
      `;

      div.addEventListener('mouseenter', () => { highlight(n.id); showTip(n, div); });
      div.addEventListener('mouseleave', () => { resetHighlight(); hideTip(); });
      div.addEventListener('click', () => openInterestModal(n));
      nodesEl.appendChild(div);
    });
  }

  function highlight(id) {
    nodesEl.querySelectorAll('.spider-node').forEach((el, i) => {
      el.classList.toggle('active', i === id);
    });
    connections.forEach(([a, b]) => {
      const line = document.getElementById(`web-line-${a}-${b}`);
      if (!line) return;
      if (a === id || b === id) {
        line.setAttribute('stroke', 'rgba(230,57,70,0.95)');
        line.setAttribute('stroke-width', '1.8');
      }
    });
  }

  function resetHighlight() {
    nodesEl.querySelectorAll('.spider-node').forEach(el => el.classList.remove('active'));
    connections.forEach(([a, b]) => {
      const line = document.getElementById(`web-line-${a}-${b}`);
      if (line) {
        line.setAttribute('stroke', 'rgba(230,57,70,0.28)');
        line.setAttribute('stroke-width', '1');
      }
    });
  }

  function showTip(n, nodeEl) {
    ttName.textContent = n.name;
    ttDesc.textContent = n.desc;
    let left = n.x * 100;
    let top  = n.y * 100 + 12;
    if (top > 80) top = n.y * 100 - 22;
    if (n.x > 0.70) left -= 20;
    else if (n.x < 0.25) left += 5;
    tooltip.style.left = left + '%';
    tooltip.style.top  = top + '%';
    tooltip.classList.add('show');
  }

  function hideTip() {
    tooltip.classList.remove('show');
  }

  drawWeb();
  buildNodes();
}

function openInterestModal(n) {
  // créer le modal s'il existe pas encore
  let overlay = document.getElementById('interestModalOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'interestModalOverlay';
    overlay.innerHTML = `
      <div class="interest-modal">
        <button class="interest-modal-close" id="interestModalClose">✕</button>
        <div class="interest-modal-img-wrap">
          <img id="interestModalImg" src="" alt="">
        </div>
        <div class="interest-modal-body">
          <h3 id="interestModalName"></h3>
          <p id="interestModalDesc"></p>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeInterestModal();
    });
    document.getElementById('interestModalClose').addEventListener('click', closeInterestModal);
  }

  document.getElementById('interestModalImg').src = n.img;
  document.getElementById('interestModalImg').alt = n.name;
  document.getElementById('interestModalName').textContent = n.name;
  document.getElementById('interestModalDesc').textContent = n.desc;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeInterestModal() {
  const overlay = document.getElementById('interestModalOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── COCKPIT GAUGES ── */
function initCockpit() {
  function drawTicks(groupId, cx, cy, r, count) {
    const g = document.getElementById(groupId);
    if (!g) return;
    for (let i = 0; i <= count; i++) {
      const angle = -180 + (i / count) * 180;
      const rad = angle * Math.PI / 180;
      const isMajor = i % Math.round(count / 6) === 0;
      const len = isMajor ? 10 : 5;
      const x1 = cx + (r - 18) * Math.cos(rad);
      const y1 = cy + (r - 18) * Math.sin(rad);
      const x2 = cx + (r - 18 - len) * Math.cos(rad);
      const y2 = cy + (r - 18 - len) * Math.sin(rad);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1); line.setAttribute('y1', y1);
      line.setAttribute('x2', x2); line.setAttribute('y2', y2);
      line.setAttribute('stroke', isMajor ? 'rgba(124,111,255,0.5)' : 'rgba(255,255,255,0.12)');
      line.setAttribute('stroke-width', isMajor ? '1.5' : '0.8');
      g.appendChild(line);
    }
  }

  function animateGauge(needleId, arcId, cx, cy, arcLen, targetDeg, duration) {
    const needle = document.getElementById(needleId);
    const arc = document.getElementById(arcId);
    if (!needle || !arc) return;
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = p < .5 ? 2*p*p : -1+(4-2*p)*p;
      const deg = -90 + (targetDeg + 90) * ease;
      needle.setAttribute('transform', `rotate(${deg},${cx},${cy})`);
      arc.setAttribute('stroke-dasharray', `${((deg + 90) / 180) * arcLen} ${arcLen}`);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // observer pour lancer l'animation quand la section est visible
  const wrap = document.querySelector('.cockpit-wrap');
  if (!wrap) return;
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      drawTicks('ticks-cv',      90,  145, 80, 24);
      drawTicks('ticks-proj',    105, 172, 97, 30);
      drawTicks('ticks-contact', 90,  145, 80, 24);
      animateGauge('needle-cv',      'arc-cv',      90,  145, 252,  20,  1200);
      animateGauge('needle-proj',    'arc-proj',    105, 172, 305,  40,  1400);
      animateGauge('needle-contact', 'arc-contact', 90,  145, 252, -18,  1200);
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(wrap);
}

/* ── PROJETS SPIDERWEB ── */
function initProjWeb() {
  const svg = document.getElementById('projWebSvg');
  const nodesEl = document.getElementById('projWebNodes');
  if (!svg || !nodesEl) return;

  const W = 1000, H = 620;

  const nodes = [
    {
      id: 'powerbi',
      title: 'Dashboard Power BI',
      desc: 'Santé mentale chez les jeunes adultes, dataset 5 000 entrées avec mesures DAX',
      tags: ['Power BI', 'DAX', 'Data viz'],
      img: 'assets/dashboard/data.jpeg',
      x: 0.50, y: 0.13
    },
    {
      id: 'sonisound',
      title: 'SoniSound',
      desc: 'Supervision audio Vue.js + php + html5/css3 + WordPress',
      tags: ['Vue.js', 'Laravel', 'PHP'],
      img: 'assets/supervision/supervision.jpeg',
      x: 0.95, y: 0.25
    },
    {
      id: 'reseaux',
      title: 'Analyse réseaux sociaux',
      desc: 'Europe vs Asie, 5 000 utilisateurs, graphiques radar, violin',
      tags: ['Python', 'Pandas', 'Matplotlib'],
      img: 'assets/dataset/dataset.jpeg',
      x: 0.60, y: 0.65
    },
    {
      id: 'snake',
      title: 'Snake Game',
      desc: '3 terrains, score temps réel avec meilleur score, sur interface graphique',
      tags: ['Python', 'Terminal'],
      img: 'assets/snake/snake.jpeg',
      x: 0.01, y: 0.40
    }
  ];

  const connections = [[0,1],[1,2],[2,3],[3,0],[0,2],[1,3]];

  function getPos(n) { return { x: n.x * W, y: n.y * H }; }

  function drawWeb() {
    svg.innerHTML = '';
    // toile de fond décorative
    const cx = W * 0.5, cy = H * 0.5;
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy);
      line.setAttribute('x2', cx + Math.cos(angle) * 700);
      line.setAttribute('y2', cy + Math.sin(angle) * 700);
      line.setAttribute('stroke', 'rgba(230,57,70,0.04)');
      line.setAttribute('stroke-width', '0.5');
      svg.appendChild(line);
    }
    for (const r of [80, 160, 240, 320, 420]) {
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      el.setAttribute('cx', cx); el.setAttribute('cy', cy);
      el.setAttribute('rx', r * 1.4); el.setAttribute('ry', r);
      el.setAttribute('fill', 'none');
      el.setAttribute('stroke', 'rgba(230,57,70,0.04)');
      el.setAttribute('stroke-width', '0.5');
      svg.appendChild(el);
    }
    // fils entre projets
    connections.forEach(([a, b]) => {
      const pa = getPos(nodes[a]);
      const pb = getPos(nodes[b]);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', pa.x); line.setAttribute('y1', pa.y);
      line.setAttribute('x2', pb.x); line.setAttribute('y2', pb.y);
      line.setAttribute('stroke', 'rgba(230,57,70,0.28)');
      line.setAttribute('stroke-width', '1');
      line.id = `proj-line-${a}-${b}`;
      svg.appendChild(line);
      // nœud milieu
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', (pa.x + pb.x) / 2);
      dot.setAttribute('cy', (pa.y + pb.y) / 2);
      dot.setAttribute('r', '2.5');
      dot.setAttribute('fill', 'rgba(230,57,70,0.4)');
      svg.appendChild(dot);
    });
  }

  function buildNodes() {
    nodesEl.innerHTML = '';
    nodes.forEach((n, i) => {
      const div = document.createElement('div');
      div.className = 'proj-node';
      div.style.left = (n.x * 100) + '%';
      div.style.top  = (n.y * 100) + '%';
      div.innerHTML = `
        <div class="proj-node-inner">
          <img class="proj-node-img" src="${n.img}" alt="${n.title}">
          <div class="proj-node-overlay">
            <div class="proj-node-title">${n.title}</div>
            <div class="proj-node-desc">${n.desc}</div>
            <div class="proj-node-tags">${n.tags.map(t => `<span class="proj-node-tag">${t}</span>`).join('')}</div>
          </div>
        </div>
        <span class="proj-node-label">${n.title}</span>
      `;
      div.addEventListener('mouseenter', () => highlightNode(i));
      div.addEventListener('mouseleave', resetHighlight);
      div.addEventListener('click', () => openProjectModal(n.id));
      nodesEl.appendChild(div);
    });
  }

  function highlightNode(id) {
    connections.forEach(([a, b]) => {
      const line = document.getElementById(`proj-line-${a}-${b}`);
      if (!line) return;
      if (a === id || b === id) {
        line.setAttribute('stroke', 'rgba(230,57,70,0.95)');
        line.setAttribute('stroke-width', '2');
      }
    });
  }

  function resetHighlight() {
    connections.forEach(([a, b]) => {
      const line = document.getElementById(`proj-line-${a}-${b}`);
      if (line) {
        line.setAttribute('stroke', 'rgba(230,57,70,0.28)');
        line.setAttribute('stroke-width', '1');
      }
    });
  }

  drawWeb();
  buildNodes();
}

function initTypewriter() {
  const el = document.getElementById('heroTypewriter');
  if (!el) return;
  const words = ['Sciences des données', 'Développement', 'Python', 'Java', 'Vue.js', 'Power BI'];
  let i = 0, j = 0, deleting = false;

  function tick() {
    const word = words[i];
    if (!deleting) {
      el.textContent = word.slice(0, j + 1);
      j++;
      if (j === word.length) { deleting = true; setTimeout(tick, 1800); return; }
    } else {
      el.textContent = word.slice(0, j - 1);
      j--;
      if (j === 0) { deleting = false; i = (i + 1) % words.length; }
    }
    setTimeout(tick, deleting ? 60 : 100);
  }
  tick();
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTypewriter();
  animateSkillBars();
  initCVModal();
  initProjectModal();
  initContactForm();
  initSpiderWeb();
  initCockpit();
  initProjWeb();
  triggerReveal();
});

