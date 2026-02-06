(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const setCompact = () => {
    const shouldCompact = window.scrollY > 20;
    header.classList.toggle('compact', shouldCompact);
  };

  setCompact();
  window.addEventListener('scroll', setCompact, { passive: true });

  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const primary = document.getElementById('primary-nav');
  const utility = document.querySelector('.nav-utility');

  if (primary && utility && !document.querySelector('.nav-utility-panel')) {
    const panel = document.createElement('div');
    panel.className = 'nav-utility-panel';
    panel.innerHTML = '<span class="nav-utility-label">Quick access</span>';

    const searchBtn = document.createElement('button');
    searchBtn.className = 'ghost nav-utility-item';
    searchBtn.type = 'button';
    searchBtn.dataset.action = 'search';
    searchBtn.textContent = 'Search programs';

    const tourBtn = document.createElement('button');
    tourBtn.className = 'ghost nav-utility-item';
    tourBtn.type = 'button';
    tourBtn.dataset.tourStart = '';
    tourBtn.textContent = 'Take a tour';

    const loginLink = utility.querySelector('a.ghost[href*="dashboard.html"]');
    const loginClone = loginLink ? loginLink.cloneNode(true) : document.createElement('a');
    loginClone.classList.add('nav-utility-item');
    if (!loginClone.getAttribute('href')) {
      loginClone.setAttribute('href', 'dashboard.html');
    }
    loginClone.textContent = 'Log in';

    panel.appendChild(searchBtn);
    panel.appendChild(tourBtn);
    panel.appendChild(loginClone);
    primary.appendChild(panel);
  }

  const setNavOpen = (open) => {
    if (!nav || !toggle) return;
    nav.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  toggle?.addEventListener('click', (event) => {
    event.preventDefault();
    const isOpen = nav?.classList.contains('nav-open');
    setNavOpen(!isOpen);
  });

  document.addEventListener('click', (event) => {
    if (!nav || !toggle) return;
    if (!nav.contains(event.target)) setNavOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setNavOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setNavOpen(false);
  });

  const bindDropdowns = () => {
    document.querySelectorAll('.nav-item .nav-trigger').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        if (window.innerWidth > 900) return;
        event.preventDefault();
        const item = trigger.closest('.nav-item');
        if (!item) return;
        document.querySelectorAll('.nav-item.open').forEach((openItem) => {
          if (openItem !== item) openItem.classList.remove('open');
        });
        item.classList.toggle('open');
      });
    });
  };

  bindDropdowns();

  primary?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setNavOpen(false));
  });

  const pathname = window.location.pathname.split('/').pop() || 'index.html';
  const hash = window.location.hash || '';

  const navMap = {
    families: ['#kids-programs', '#adult-programs', '#how-it-works', 'families.html'],
    venues: ['#venue', '#pricing', 'resources.html', 'venues.html'],
    orgs: ['#corporate', '#club-bookings', 'corporate.html', 'clubs.html'],
    about: ['marketing.html', '#mission', '#contact', 'legal.html']
  };

  const isIndex = pathname === '' || pathname === 'index.html';

  const setActiveTrigger = (key) => {
    const triggers = {
      families: 'For Families',
      venues: 'For Venues',
      orgs: 'For Organizations',
      about: 'About'
    };
    document.querySelectorAll('.nav-trigger').forEach((btn) => {
      btn.classList.toggle('active', btn.textContent.trim() === triggers[key]);
    });
  };

  const setActiveLink = () => {
    const links = document.querySelectorAll('.nav-dropdown a');
    links.forEach((link) => link.classList.remove('active'));

    let matched = false;
    links.forEach((link) => {
      const href = link.getAttribute('href') || '';
      const linkPath = href.split('#')[0];
      const linkHash = href.includes('#') ? `#${href.split('#')[1]}` : '';

      if (isIndex && linkHash && linkHash === hash) {
        link.classList.add('active');
        matched = true;
      }

      if (!isIndex && linkPath && linkPath === pathname) {
        link.classList.add('active');
        matched = true;
      }
    });

    if (matched) return;

    if (isIndex) {
      if (navMap.families.includes(hash)) return setActiveTrigger('families');
      if (navMap.venues.includes(hash)) return setActiveTrigger('venues');
      if (navMap.orgs.includes(hash)) return setActiveTrigger('orgs');
      if (navMap.about.includes(hash)) return setActiveTrigger('about');
      return;
    }

    const venuePages = new Set([
      'resources.html',
      'brand-kit.html',
      'positioning.html',
      'ads-kit.html',
      'landing-templates.html',
      'engagement.html',
      'tracking.html',
      'roadmap.html',
      'timeline.html',
      'offer.html',
      'venues.html'
    ]);

    const familyPages = new Set(['families.html']);
    const orgPages = new Set(['corporate.html', 'clubs.html']);

    if (venuePages.has(pathname)) return setActiveTrigger('venues');
    if (familyPages.has(pathname)) return setActiveTrigger('families');
    if (orgPages.has(pathname)) return setActiveTrigger('orgs');
    if (pathname === 'marketing.html' || pathname === 'legal.html') return setActiveTrigger('about');
  };

  setActiveLink();
  window.addEventListener('hashchange', setActiveLink);

  const searchBtn = document.querySelector('.nav-search');
  if (searchBtn) {
    searchBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (isIndex) {
        document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = 'index.html#discover';
      }
    });
  }

  document.querySelectorAll('.nav-utility-panel [data-action="search"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      if (isIndex) {
        document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = 'index.html#discover';
      }
    });
  });
})();
