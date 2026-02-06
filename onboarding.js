(() => {
  const body = document.body;
  if (!body) return;

  const tours = {
    home: [
      {
        selector: '.nav-links',
        title: 'Navigate fast',
        body: 'Jump between discovery, venue profiles, pricing, and strategy resources.'
      },
      {
        selector: '.hero-card',
        title: 'Search & book',
        body: 'Start with a location and swim program to find the best classes.'
      },
      {
        selector: '.quick-filters',
        title: 'Quick filters',
        body: 'One tap fills the most popular swim program types.'
      },
      {
        selector: '#discover .filters',
        title: 'Smart filtering',
        body: 'Refine by time, format, and program type to narrow results.'
      },
      {
        selector: '#discover .results',
        title: 'Discovery results',
        body: 'Open a venue to review schedules, instructors, and availability.'
      },
      {
        selector: '#venue .tabs',
        title: 'Venue tabs',
        body: 'Switch between overview, classes, courses, team, and pricing.'
      },
      {
        selector: '#venue .venue-actions',
        title: 'Booking CTA',
        body: 'Reserve a class, save the venue, or share with parents or clubs.'
      },
      {
        selector: '#pricing .price-grid',
        title: 'Pricing plans',
        body: 'Pick a plan that matches how you want to scale bookings.'
      },
      {
        selector: '.cta',
        title: 'Launch the platform',
        body: 'Schedule a demo to roll out your swim marketplace.'
      }
    ],
    strategy: [
      {
        selector: '[data-tour="strategy-hero"]',
        title: 'Strategy overview',
        body: 'This page maps the branding, growth, and positioning plan for Germany.'
      },
      {
        selector: '[data-tour="positioning-card"]',
        title: 'Positioning',
        body: 'Define the premium promise: safety, progress, and modern booking.'
      },
      {
        selector: '[data-tour="segments-card"]',
        title: 'Target segments',
        body: 'Parents, clubs, and special-needs programs drive bookings.'
      },
      {
        selector: '[data-tour="brand-architecture"]',
        title: 'Brand architecture',
        body: 'Keep a master brand with clear swim program families.'
      },
      {
        selector: '[data-tour="trust-signals"]',
        title: 'Trust signals',
        body: 'Certifications, progress dashboards, and partner seals build prestige.'
      },
      {
        selector: '[data-tour="meta-ads"]',
        title: 'Meta ads plan',
        body: 'Always-on campaigns for parents, clubs, and adaptive programs.'
      },
      {
        selector: '[data-tour="engagement"]',
        title: 'Engagement flows',
        body: 'Milestones and re-booking nudges improve retention.'
      },
      {
        selector: '[data-tour="landing"]',
        title: 'Landing page strategy',
        body: 'Audience-specific landing pages drive fast booking conversions.'
      },
      {
        selector: '[data-tour="tracking"]',
        title: 'Tracking plan',
        body: 'Measure CAC, renewals, and club utilization with clear KPIs.'
      },
      {
        selector: '[data-tour="funnel"]',
        title: 'Funnel health',
        body: 'Monitor awareness to paid conversion across the funnel.'
      },
      {
        selector: '[data-tour="kpi"]',
        title: 'Strategy KPIs',
        body: 'Track satisfaction, rebooking, lane utilization, and trial conversion.'
      }
    ],
    resources: [
      {
        selector: '[data-tour="resources-hero"]',
        title: 'Resource library',
        body: 'Everything you need to launch the premium swim brand, in one place.'
      },
      {
        selector: '[data-tour="resources-ui-kit"]',
        title: 'UI kit',
        body: 'Design system tokens for typography, cards, buttons, icons, and gradients.'
      },
      {
        selector: '[data-tour="resources-brand"]',
        title: 'Brand kit',
        body: 'Visual identity, tone of voice, and premium swim aesthetics.'
      },
      {
        selector: '[data-tour="resources-positioning"]',
        title: 'Positioning pack',
        body: 'Messaging, differentiation, and trust cues for Germany.'
      },
      {
        selector: '[data-tour="resources-ads"]',
        title: 'Meta Ads kit',
        body: 'Facebook + Instagram campaigns tailored to parents and clubs.'
      },
      {
        selector: '[data-tour="resources-landing"]',
        title: 'Landing templates',
        body: 'Audience-specific landing pages for conversion.'
      },
      {
        selector: '[data-tour="resources-engagement"]',
        title: 'Engagement flows',
        body: 'Retention sequences, milestones, and renewals.'
      },
      {
        selector: '[data-tour="resources-tracking"]',
        title: 'Tracking plan',
        body: 'Event taxonomy, attribution, and KPI dashboards.'
      },
      {
        selector: '[data-tour="resources-roadmap"]',
        title: 'Launch roadmap',
        body: '90‑day rollout plan with milestones and staffing.'
      },
      {
        selector: '[data-tour="resources-timeline"]',
        title: 'Delivery timeline',
        body: 'Week‑by‑week delivery plan with real milestones.'
      },
      {
        selector: '[data-tour="resources-offer"]',
        title: 'Final offer',
        body: 'Full package price, scope, and deployment stack.'
      }
    ],
    resourcesSub: [
      {
        selector: '.strategy-hero',
        title: 'Resource overview',
        body: 'Each pack contains ready-to-use strategy assets and visuals.'
      },
      {
        selector: '.strategy-grid',
        title: 'Core modules',
        body: 'Review the most important guidance, templates, and examples.'
      },
      {
        selector: '.strategy-split',
        title: 'Visual references',
        body: 'Use these visuals to keep the brand premium and consistent.'
      },
      {
        selector: '.sample-grid',
        title: 'Samples',
        body: 'These are plug-and-play examples you can reuse immediately.'
      },
      {
        selector: '.footer',
        title: 'More resources',
        body: 'Jump back to the resource library to explore other packs.'
      }
    ]
  };

  const overlay = document.createElement('div');
  overlay.className = 'tour-overlay';

  const tooltip = document.createElement('div');
  tooltip.className = 'tour-tooltip';
  tooltip.innerHTML = `
    <div class="tour-step" data-tour-step></div>
    <h3 class="tour-title" data-tour-title></h3>
    <p class="tour-body" data-tour-body></p>
    <div class="tour-actions">
      <button class="ghost small" data-tour-prev>Back</button>
      <button class="primary" data-tour-next>Next</button>
      <button class="ghost small" data-tour-skip>Skip</button>
    </div>
  `;

  let activeTour = null;
  let activeTarget = null;
  let activeIndex = 0;
  let steps = [];

  const titleEl = tooltip.querySelector('[data-tour-title]');
  const bodyEl = tooltip.querySelector('[data-tour-body]');
  const stepEl = tooltip.querySelector('[data-tour-step]');
  const nextBtn = tooltip.querySelector('[data-tour-next]');
  const prevBtn = tooltip.querySelector('[data-tour-prev]');
  const skipBtn = tooltip.querySelector('[data-tour-skip]');

  const clearHighlight = () => {
    if (activeTarget) {
      activeTarget.classList.remove('tour-highlight');
      activeTarget = null;
    }
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const positionTooltip = () => {
    if (!activeTarget) return;
    const rect = activeTarget.getBoundingClientRect();
    const margin = 12;
    const tooltipRect = tooltip.getBoundingClientRect();
    let top = rect.bottom + margin;
    if (top + tooltipRect.height > window.innerHeight - margin) {
      top = rect.top - tooltipRect.height - margin;
    }
    let left = rect.left;
    if (left + tooltipRect.width > window.innerWidth - margin) {
      left = window.innerWidth - tooltipRect.width - margin;
    }
    left = clamp(left, margin, window.innerWidth - tooltipRect.width - margin);
    top = clamp(top, margin, window.innerHeight - tooltipRect.height - margin);
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  };

  const showStep = (index) => {
    if (!steps.length) return;
    if (index < 0 || index >= steps.length) {
      endTour();
      return;
    }
    activeIndex = index;
    const step = steps[index];
    const target = document.querySelector(step.selector);
    if (!target) {
      showStep(index + 1);
      return;
    }
    clearHighlight();
    activeTarget = target;
    target.classList.add('tour-highlight');
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });

    stepEl.textContent = `Step ${index + 1} of ${steps.length}`;
    titleEl.textContent = step.title;
    bodyEl.textContent = step.body;

    prevBtn.disabled = index === 0;
    nextBtn.textContent = index === steps.length - 1 ? 'Finish' : 'Next';

    requestAnimationFrame(() => {
      positionTooltip();
    });
  };

  const startTour = (key, force = false) => {
    const tour = tours[key];
    if (!tour || !tour.length) return;
    const seenKey = `tourSeen:${key}`;
    if (!force && localStorage.getItem(seenKey)) return;
    activeTour = key;
    steps = tour;
    activeIndex = 0;
    document.body.appendChild(overlay);
    document.body.appendChild(tooltip);
    overlay.classList.add('show');
    tooltip.classList.add('show');
    showStep(0);
  };

  const endTour = () => {
    if (!activeTour) return;
    localStorage.setItem(`tourSeen:${activeTour}`, '1');
    overlay.classList.remove('show');
    tooltip.classList.remove('show');
    clearHighlight();
    overlay.remove();
    tooltip.remove();
    activeTour = null;
    steps = [];
  };

  nextBtn.addEventListener('click', () => {
    if (activeIndex >= steps.length - 1) {
      endTour();
      return;
    }
    showStep(activeIndex + 1);
  });

  prevBtn.addEventListener('click', () => showStep(activeIndex - 1));
  skipBtn.addEventListener('click', endTour);

  overlay.addEventListener('click', endTour);

  window.addEventListener('resize', positionTooltip);
  window.addEventListener('scroll', positionTooltip, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') endTour();
  });

  const getDefaultTourKey = () => {
    if (body.classList.contains('strategy-page')) return 'strategy';
    if (body.classList.contains('resources-page')) {
      return body.classList.contains('resources-home') ? 'resources' : 'resourcesSub';
    }
    return 'home';
  };

  document.querySelectorAll('[data-tour-start]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const key = button.dataset.tourStart || getDefaultTourKey();
      startTour(key, true);
    });
  });

  // Auto-start disabled; tours launch only when the user clicks "Take a tour".
})();
