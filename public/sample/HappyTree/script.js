const tiltCards = document.querySelectorAll("[data-tilt]");

tiltCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const rotateX = ((event.clientY - centerY) / bounds.height) * -8;
    const rotateY = ((event.clientX - centerX) / bounds.width) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const magneticItems = document.querySelectorAll(".magnetic");

magneticItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const bounds = item.getBoundingClientRect();
    const x = event.clientX - (bounds.left + bounds.width / 2);
    const y = event.clientY - (bounds.top + bounds.height / 2);
    item.style.transform = `translate(${x * 0.16}px, ${y * 0.22}px) translateY(-5px) scale(1.03)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document
  .querySelectorAll(".program-card, .timeline-item, .photo-tile, .space-photo, .visit-card")
  .forEach((item, index) => {
    item.classList.add("reveal-seed");
    item.style.transitionDelay = `${Math.min(index * 55, 360)}ms`;
    revealObserver.observe(item);
  });
