const toast = document.getElementById('toast');
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
const shareBtn = document.getElementById('share-btn');
const saveBtn = document.getElementById('save-btn');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalPrimary = document.querySelector('[data-modal-primary]');

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
  showToast('Booking intent saved.');
  closeModal();
});

document.querySelectorAll('[data-modal-close]').forEach((btn) => {
  btn.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

const getInitials = (name = '') => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

const fillText = (selector, value) => {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
};

const fillImage = (selector, src, alt) => {
  const el = document.querySelector(selector);
  if (el) {
    el.src = src;
    if (alt) el.alt = alt;
  }
};

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

const fillEmbed = (selector, src, title) => {
  const el = document.querySelector(selector);
  if (el) {
    el.src = src;
    if (title) el.title = title;
  }
};

const renderVenue = (venue) => {
  document.title = `${venue.name} — TSport`;

  fillText('[data-venue-name]', venue.name);
  fillText('[data-venue-meta]', `${venue.city} · ${venue.area} · ${venue.rating.toFixed(1)}★`);
  fillText('[data-venue-description]', venue.description);
  const hero = document.querySelector('[data-venue-hero]');
  if (hero) {
    hero.src = venue.heroImage;
    hero.alt = venue.name;
    hero.dataset.fallback = venue.fallbackImage || 'assets/hero-studio.svg';
  }
  fillEmbed('[data-venue-map]', venue.mapEmbed, `Map for ${venue.name}`);

  const badges = document.getElementById('venue-badges');
  if (badges) {
    badges.innerHTML = venue.badges.map((badge) => `<span class="badge">${badge}</span>`).join('');
  }

  const amenities = document.getElementById('venue-amenities');
  if (amenities) {
    amenities.innerHTML = venue.amenities.map((item) => `<span>${item}</span>`).join('');
  }

  const team = document.getElementById('venue-team');
  if (team) {
    team.innerHTML = venue.team
      .map(
        (member) => `
          <div class="team">
            <div class="avatar">${getInitials(member.name)}</div>
            <div>
              <strong>${member.name}</strong>
              <p>${member.role}</p>
            </div>
          </div>
        `
      )
      .join('');
  }

  const reviews = document.getElementById('venue-reviews');
  if (reviews) {
    reviews.innerHTML = venue.reviews
      .map(
        (review) => `
          <div class="review">
            <p>“${review.quote}”</p>
            <span>— ${review.author}</span>
          </div>
        `
      )
      .join('');
  }

  const schedule = document.getElementById('venue-schedule');
  if (schedule) {
    schedule.innerHTML = venue.schedule.map((item) => `<li>${item}</li>`).join('');
  }

  const nextClass = document.getElementById('venue-next-class');
  if (nextClass && venue.schedule.length > 0) {
    nextClass.textContent = venue.schedule[0];
  }

  const gallery = document.getElementById('venue-gallery');
  if (gallery && venue.gallery) {
    gallery.innerHTML = venue.gallery
      .map(
        (src) =>
          `<img src="${src}" alt="${venue.name} gallery image" data-fallback="${venue.fallbackImage}" loading="lazy" />`
      )
      .join('');
  }

  const prices = document.getElementById('venue-prices');
  if (prices) {
    prices.innerHTML = venue.prices
      .map(
        (price) => `
          <div class="price-card">
            <h5>${price.label}</h5>
            <p>${price.value}</p>
          </div>
        `
      )
      .join('');
  }

  fillText('#venue-courses', venue.courses);
  fillText('#venue-workshops', venue.workshops);
  fillText('#venue-videos', venue.videos);
  const ratingSummary = document.getElementById('venue-rating-summary');
  if (ratingSummary) {
    ratingSummary.innerHTML = `
      <div class="star-row">
        <img src="assets/star.svg" alt="star" />
        <img src="assets/star.svg" alt="star" />
        <img src="assets/star.svg" alt="star" />
        <img src="assets/star.svg" alt="star" />
        <img src="assets/star.svg" alt="star" />
      </div>
      <span>${venue.rating.toFixed(1)} average · ${venue.reviewCount} reviews</span>
    `;
  }
  applyFallbacks();
};

const actionMap = {
  'book-now': {
    title: 'Book now',
    body: 'Choose a class time, apply credits, and confirm instantly.',
    primary: 'Choose time'
  },
  'book-class': {
    title: 'Book this class',
    body: 'We will hold your spot for 10 minutes while you confirm.',
    primary: 'Confirm'
  },
  'book-spot': {
    title: 'Book a spot',
    body: 'Pick a date, class type, and instructor to continue.',
    primary: 'Continue'
  },
  progress: {
    title: 'Progress dashboard',
    body: 'Parents would see level milestones, coach notes, and next steps.',
    primary: 'Open dashboard'
  }
};

document.querySelectorAll('[data-action]').forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    const action = element.dataset.action;
    const config = actionMap[action];
    if (!config) return;
    openModal(config.title, config.body, config.primary);
  });
});

const loadVenue = async () => {
  try {
    const response = await fetch('data/venues.json');
    if (!response.ok) throw new Error('Failed to fetch venues');
    const venues = await response.json();
    const params = new URLSearchParams(window.location.search);
    const venueId = params.get('id');
    const venue = venues.find((item) => item.id === venueId) || venues[0];
    renderVenue(venue);
  } catch (error) {
    showToast('Unable to load venue data.');
  }
};

shareBtn?.addEventListener('click', async () => {
  const url = `${window.location.href.split('#')[0]}?utm_source=share&utm_campaign=venue`;
  try {
    await navigator.clipboard.writeText(url);
    showToast('Link copied with tracking parameters.');
  } catch (error) {
    showToast('Copy failed. Please try again.');
  }
});

saveBtn?.addEventListener('click', () => {
  const isSaved = saveBtn.textContent.includes('♡');
  saveBtn.textContent = isSaved ? '♥ Saved' : '♡ Save';
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach((btn) => btn.classList.toggle('active', btn === tab));
    panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === target));
  });
});

loadVenue();
