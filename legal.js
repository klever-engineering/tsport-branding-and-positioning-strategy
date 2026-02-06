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
  showToast('We will follow up shortly.');
  closeModal();
});

document.querySelectorAll('[data-modal-close]').forEach((btn) => {
  btn.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

const actionMap = {
  support: {
    title: 'Contact support',
    body: 'Start a request for bookings, billing, or swim safety questions.',
    primary: 'Submit request'
  },
  status: {
    title: 'System status',
    body: 'Live status dashboard would open with booking and payment uptime.',
    primary: 'Open status'
  },
  privacy: {
    title: 'Privacy summary',
    body: 'Download the parent and organization privacy summary PDF.',
    primary: 'Download PDF'
  },
  terms: {
    title: 'Terms of service',
    body: 'View the full booking, cancellation, and safety terms.',
    primary: 'Open terms'
  },
  security: {
    title: 'Security overview',
    body: 'Review payment security, data storage, and audit logs.',
    primary: 'View overview'
  },
  contact: {
    title: 'Discuss licensed imagery',
    body: 'We will share options for licensed libraries and client-owned photo plans.',
    primary: 'Schedule a call'
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
