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
})();
