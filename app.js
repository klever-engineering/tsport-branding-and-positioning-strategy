const resultCount = document.getElementById('result-count');
const activeChips = document.getElementById('active-chips');
const clearBtn = document.getElementById('clear-filters');
const quickSearch = document.getElementById('quick-search');
const venueContainer = document.getElementById('venue-cards');
const emptyState = document.getElementById('empty-state');
const toast = document.getElementById('toast');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalPrimary = document.querySelector('[data-modal-primary]');

const filters = {
  time: new Set(),
  mode: new Set(),
  offer: new Set(),
  type: new Set(),
};

let venues = [];

const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
};

const openModal = (title, body, primaryLabel = 'Continue') => {
  if (!modal) return;
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modalPrimary.textContent = primaryLabel;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
};

modalPrimary?.addEventListener('click', () => {
  showToast('Action captured.');
  closeModal();
});

document.querySelectorAll('[data-modal-close]').forEach((btn) => {
  btn.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

const applyFallbacks = (root = document) => {
  root.querySelectorAll('img[data-fallback]').forEach((img) => {
    if (img.dataset.fallbackBound) return;
    img.dataset.fallbackBound = 'true';
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = 'true';
      img.src = img.dataset.fallback;
    });
  });
};

const actionMap = {
  login: {
    title: 'Log in',
    body: 'This would open the authentication flow for existing members.',
    primary: 'Continue'
  },
  signup: {
    title: 'Create account',
    body: 'This would start the onboarding flow for new customers or venues.',
    primary: 'Start free'
  },
  search: {
    toast: 'Jumping to discovery results.'
  },
  'run-search': {
    toast: 'Showing venues that match your search.'
  },
  memberships: {
    toast: 'Exploring membership options.'
  },
  'venue-demo': {
    title: 'Venue demo',
    body: 'A sales rep would reach out with a personalized platform demo.',
    primary: 'Request demo'
  },
  parents: {
    title: 'Explore for parents',
    body: 'View certified swim programs, safety info, and progress tracking.',
    primary: 'View programs'
  },
  'owner-demo': {
    title: 'Owner demo',
    body: 'See how TSport fills lanes and automates scheduling.',
    primary: 'Request demo'
  },
  corporate: {
    title: 'Corporate programs',
    body: 'Launch employee swim benefits with usage dashboards.',
    primary: 'Get corporate info'
  },
  instructors: {
    title: 'Instructor hub',
    body: 'Create your profile and access premium booking demand.',
    primary: 'Start onboarding'
  },
  'join-instructor': {
    title: 'Instructor onboarding',
    body: 'We would capture your profile, availability, and certifications.',
    primary: 'Start application'
  },
  'start-trial': {
    title: 'Start trial',
    body: 'Activate a 14-day trial with full access to management tools.',
    primary: 'Activate trial'
  },
  sales: {
    title: 'Talk to sales',
    body: 'Our team will help you build a custom enterprise plan.',
    primary: 'Contact sales'
  },
  'schedule-demo': {
    title: 'Schedule a demo',
    body: 'Pick a time to see the platform in action.',
    primary: 'Choose time'
  },
  'book-now': {
    title: 'Book now',
    body: 'Booking flow would open with class times and payment options.',
    primary: 'Select time'
  }
};

const handleAction = (action) => {
  const config = actionMap[action];
  if (!config) return;
  if (action === 'search' || action === 'run-search') {
    document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' });
  }
  if (action === 'memberships') {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  }
  if (config.toast) showToast(config.toast);
  if (config.title) openModal(config.title, config.body, config.primary);
};

document.querySelectorAll('[data-action]').forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    handleAction(element.dataset.action);
  });
});

const matchesFilters = (venue) => {
  const searchValue = (quickSearch?.value || '').trim().toLowerCase();
  const haystack = [venue.name, venue.city, venue.area, venue.activity, venue.type]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const searchMatch = !searchValue || haystack.includes(searchValue);
  const timeMatch = filters.time.size === 0 || filters.time.has(venue.time);
  const modeMatch = filters.mode.size === 0 || filters.mode.has(venue.mode);
  const offerMatch = filters.offer.size === 0 || filters.offer.has(venue.offer);
  const typeMatch = filters.type.size === 0 || filters.type.has(venue.type);

  return searchMatch && timeMatch && modeMatch && offerMatch && typeMatch;
};

const cardTemplate = (venue) => `
  <article class="card">
    <div class="card-media">
      <img src="${venue.image}" alt="${venue.name}" data-fallback="${venue.fallbackImage}" loading="lazy" />
      <span class="verified-stamp">Verified Facility</span>
    </div>
    <div class="card-body">
      <div class="card-head">
        <h4>${venue.name}</h4>
        <button class="icon-btn" data-fav>♡</button>
      </div>
      <p>${venue.area} · ${venue.activity}</p>
      <div class="card-rating">
        <div class="star-row small">
          <img src="assets/star.svg" alt="star" />
          <img src="assets/star.svg" alt="star" />
          <img src="assets/star.svg" alt="star" />
          <img src="assets/star.svg" alt="star" />
          <img src="assets/star.svg" alt="star" />
        </div>
        <span>${venue.rating.toFixed(1)} rating</span>
      </div>
      <div class="meta">${venue.offerLabel} · ${venue.timeLabel} · ${venue.modeLabel}</div>
      <a class="ghost small" href="venue.html?id=${venue.id}">View venue</a>
    </div>
  </article>
`;

const renderCards = () => {
  if (!venueContainer) return;
  const filtered = venues.filter(matchesFilters);
  venueContainer.innerHTML = filtered.map(cardTemplate).join('');
  resultCount.textContent = filtered.length;

  if (emptyState) {
    emptyState.classList.toggle('show', filtered.length === 0);
  }

  const favButtons = venueContainer.querySelectorAll('[data-fav]');
  favButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isSaved = btn.textContent === '♡';
      btn.textContent = isSaved ? '♥' : '♡';
      btn.style.background = isSaved ? 'rgba(242, 153, 74, 0.2)' : 'rgba(191, 225, 218, 0.4)';
    });
  });

  applyFallbacks(venueContainer);
};

const updateChips = () => {
  if (!activeChips) return;
  activeChips.innerHTML = '';
  Object.entries(filters).forEach(([group, values]) => {
    values.forEach((value) => {
      const chip = document.createElement('span');
      chip.className = 'active-chip';
      chip.textContent = `${group}: ${value}`;
      activeChips.appendChild(chip);
    });
  });
};

const handleFilterToggle = (group, value, checked) => {
  if (checked) {
    filters[group].add(value);
  } else {
    filters[group].delete(value);
  }
  updateChips();
  renderCards();
};

const filterInputs = document.querySelectorAll('[data-filter]');
filterInputs.forEach((input) => {
  if (input.tagName === 'INPUT') {
    input.addEventListener('change', (event) => {
      handleFilterToggle(event.target.dataset.filter, event.target.value, event.target.checked);
    });
  }
});

const pillButtons = document.querySelectorAll('.pill');
pillButtons.forEach((pill) => {
  pill.addEventListener('click', () => {
    const value = pill.dataset.value;
    const group = pill.dataset.filter;
    const isActive = pill.classList.toggle('active');
    handleFilterToggle(group, value, isActive);
  });
});

const quickChips = document.querySelectorAll('.chip');
quickChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    if (!quickSearch) return;
    quickSearch.value = chip.textContent.trim();
    renderCards();
  });
});

clearBtn?.addEventListener('click', () => {
  Object.keys(filters).forEach((group) => filters[group].clear());
  document.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.checked = false;
  });
  pillButtons.forEach((pill) => pill.classList.remove('active'));
  updateChips();
  renderCards();
});

quickSearch?.addEventListener('input', () => {
  renderCards();
});

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach((btn) => btn.classList.toggle('active', btn === tab));
    panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === target));
  });
});

const shareButton = document.querySelector('.venue-actions .ghost:last-child');
shareButton?.addEventListener('click', async () => {
  const url = `${window.location.href.split('#')[0]}?utm_source=share&utm_campaign=venue`;
  try {
    await navigator.clipboard.writeText(url);
    showToast('Link copied with tracking parameters.');
  } catch (error) {
    showToast('Copy failed. Please try again.');
  }
});

const venueSaveBtn = document.getElementById('venue-save-btn');
venueSaveBtn?.addEventListener('click', () => {
  const isSaved = venueSaveBtn.textContent.includes('♡');
  venueSaveBtn.textContent = isSaved ? '♥ Saved' : '♡ Save';
  showToast(isSaved ? 'Venue saved to favorites.' : 'Venue removed from favorites.');
});

applyFallbacks();

const enrichVenue = (venue) => {
  return {
    ...venue,
    offerLabel: venue.offer === 'free' ? 'Free trial' : venue.offer === 'newcomer' ? 'Newcomer deal' : 'Corporate',
    timeLabel: venue.time === 'morning' ? 'Morning' : venue.time === 'afternoon' ? 'Afternoon' : 'Evening',
    modeLabel: venue.mode === 'indoor' ? 'Indoor' : venue.mode === 'outdoor' ? 'Outdoor' : venue.mode === 'online' ? 'Online' : 'Video',
  };
};

const loadVenues = async () => {
  try {
    const response = await fetch('data/venues.json');
    if (!response.ok) throw new Error('Failed to fetch venues');
    const data = await response.json();
    venues = data.map(enrichVenue);
    renderCards();
  } catch (error) {
    venues = [];
    renderCards();
    if (emptyState) {
      emptyState.classList.add('show');
      emptyState.querySelector('p').textContent = 'Venue data is unavailable. Start a local server to load data/venues.json.';
    }
  }
};

loadVenues();
