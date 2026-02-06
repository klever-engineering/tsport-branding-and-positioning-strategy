const bookingList = document.getElementById('booking-list');
const toast = document.getElementById('toast');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalPrimary = document.querySelector('[data-modal-primary]');
const statusBanner = document.getElementById('dashboard-status');

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
  showToast('Action saved.');
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

const addBooking = (title) => {
  if (!bookingList) return;
  const item = document.createElement('div');
  item.className = 'booking-item';
  item.innerHTML = `
    <img
      src="assets/swim.svg"
      alt="Class"
      data-fallback="assets/hero-studio.svg"
    />
    <div>
      <h4>${title}</h4>
      <p>Added just now · Pending confirmation</p>
      <span>Booked with credits</span>
    </div>
    <button class="ghost small" data-action="manage-booking">Manage</button>
  `;
  bookingList.prepend(item);
  applyFallbacks(item);
};

const actionMap = {
  logout: {
    title: 'Log out',
    body: 'This would securely sign you out of your account.',
    primary: 'Log out'
  },
  topup: {
    title: 'Top up credits',
    body: 'Choose a credit pack or add a payment method.',
    primary: 'Add credits'
  },
  'edit-profile': {
    title: 'Edit profile',
    body: 'Update swimmer details, emergency contacts, or preferences.',
    primary: 'Save changes'
  },
  'view-calendar': {
    title: 'Open calendar',
    body: 'Review upcoming lessons and confirm attendance.',
    primary: 'Open calendar'
  },
  'view-progress': {
    title: 'View progress',
    body: 'See swim level milestones and instructor feedback.',
    primary: 'Open progress'
  },
  'book-next': {
    title: 'Book next class',
    body: 'We will show the best upcoming sessions for your swimmers.',
    primary: 'Choose class'
  },
  'refer-friend': {
    title: 'Refer a friend',
    body: 'Invite another family and earn bonus swim credits.',
    primary: 'Send invite'
  },
  'download-report': {
    title: 'Download progress report',
    body: 'Generate a PDF report with milestones and coach notes.',
    primary: 'Download'
  },
  'manage-booking': {
    title: 'Manage booking',
    body: 'Reschedule, cancel, or add this booking to your calendar.',
    primary: 'Open booking'
  },
  'switch-section': {
    title: 'Switch section',
    body: 'Updating your dashboard view.',
    primary: 'Continue'
  }
};

const handleAction = (action, element) => {
  const config = actionMap[action];
  if (!config) return;
  if (action === 'switch-section') {
    document.querySelectorAll('.sidebar-links li').forEach((li) => li.classList.remove('active'));
    element.classList.add('active');
    if (statusBanner) {
      statusBanner.textContent = `Showing ${element.dataset.section}.`;
    }
    showToast(`Switched to ${element.dataset.section}.`);
    return;
  }
  openModal(config.title, config.body, config.primary);
};

document.querySelectorAll('[data-action]').forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    handleAction(element.dataset.action, element);
  });
});

const bookButtons = document.querySelectorAll('[data-book-course]');
bookButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const title = button.dataset.bookCourse;
    button.textContent = 'Booked';
    button.disabled = true;
    button.classList.remove('ghost');
    button.classList.add('primary');
    addBooking(title);
    showToast('Booking added to your schedule.');
  });
});

applyFallbacks();
