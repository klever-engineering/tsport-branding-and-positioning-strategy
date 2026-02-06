(() => {
  const interactive = document.querySelectorAll(
    'main a.primary, main a.ghost, main button.primary, main button.ghost'
  );

  const pulse = (node, cls, duration = 450) => {
    node.classList.remove(cls);
    void node.offsetWidth;
    node.classList.add(cls);
    window.setTimeout(() => node.classList.remove(cls), duration);
  };

  interactive.forEach((el) => {
    el.addEventListener('click', () => {
      const card =
        el.closest('.strategy-card') ||
        el.closest('.strategy-split') ||
        el.closest('.strategy-hero');

      if (card) {
        pulse(card, 'card-pulse');
      }

      pulse(el, 'cta-pulse', 350);
    });
  });

  const priceInput = document.getElementById('roi-price');
  const bookingsInput = document.getElementById('roi-bookings');
  const goalInput = document.getElementById('roi-goal');
  const priceValue = document.getElementById('roi-price-value');
  const bookingsValue = document.getElementById('roi-bookings-value');
  const goalValue = document.getElementById('roi-goal-value');
  const goalDisplay = document.getElementById('roi-goal-display');
  const summary = document.getElementById('roi-summary');
  const breakeven = document.getElementById('roi-breakeven');
  const projection = document.getElementById('roi-projection');
  const timeline = document.getElementById('roi-timeline');

  if (priceInput && bookingsInput && goalInput && summary && breakeven && projection && timeline) {
    const investment = 5000;
    const formatMoney = (value) => `€${value.toLocaleString('de-DE')}`;

    const update = () => {
      const price = Number(priceInput.value);
      const bookings = Number(bookingsInput.value);
      const goal = Number(goalInput.value);
      const weeklyRevenue = price * bookings;
      const monthlyRevenue = weeklyRevenue * 4;
      const breakEvenMonth = Math.max(1, Math.ceil(investment / monthlyRevenue));
      const yearlyRevenue = monthlyRevenue * 12;

      if (priceValue) priceValue.textContent = formatMoney(price);
      if (bookingsValue) bookingsValue.textContent = bookings;
      if (goalValue) goalValue.textContent = goal;
      if (goalDisplay) goalDisplay.textContent = goal;

      summary.textContent = `At ${bookings} bookings/week × ${formatMoney(price)} = ${formatMoney(weeklyRevenue)}/week = ${formatMoney(monthlyRevenue)}/month`;

      if (breakEvenMonth > 12) {
        breakeven.textContent = `Your ${formatMoney(investment)} investment breaks even after month 12`;
      } else {
        breakeven.textContent = `Your ${formatMoney(investment)} investment breaks even in month ${breakEvenMonth}`;
      }

      projection.textContent = `Projected 12-month revenue: ${formatMoney(yearlyRevenue)}`;

      timeline.querySelectorAll('.roi-month').forEach((monthEl) => {
        const month = Number(monthEl.dataset.month);
        monthEl.classList.toggle('active', month <= breakEvenMonth);
        monthEl.classList.toggle('goal', month === goal);
      });
    };

    [priceInput, bookingsInput, goalInput].forEach((input) =>
      input.addEventListener('input', update)
    );

    update();
  }
})();
