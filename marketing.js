const toast = document.getElementById('toast');
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
  showToast('Saved. We will follow up with next steps.');
  closeModal();
});

document.querySelectorAll('[data-modal-close]').forEach((btn) => {
  btn.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

const actionMap = {
  download: {
    title: 'Download plan',
    body: 'A PDF strategy pack would be generated with timelines and budgets.',
    primary: 'Generate PDF'
  },
  'book-call': {
    title: 'Book strategy call',
    body: 'Pick a 30‑minute slot for a launch planning call.',
    primary: 'Choose slot'
  },
  'view-roadmap': {
    title: 'Roadmap',
    body: 'View the 90‑day roadmap across acquisition, onboarding, and retention.',
    primary: 'Open roadmap'
  },
  positioning: {
    title: 'Positioning pack',
    body: 'Includes brand narrative, tone of voice, and messaging pillars.',
    primary: 'Open pack'
  },
  ads: {
    title: 'Ad kit',
    body: 'Creative templates for parent, club, and special‑needs segments.',
    primary: 'Open kit'
  },
  engagement: {
    title: 'Engagement flows',
    body: 'Automations for milestone emails, reminders, and re‑book prompts.',
    primary: 'Open flows'
  },
  landing: {
    title: 'Landing templates',
    body: 'Audience‑specific landing page layouts and copy blocks.',
    primary: 'View templates'
  },
  tracking: {
    title: 'Tracking plan',
    body: 'Event schema, conversion tracking, and CRM tagging guidance.',
    primary: 'Open plan'
  },
  brand: {
    title: 'Brand kit',
    body: 'Logo system, gradients, imagery rules, and social templates.',
    primary: 'Open kit'
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
