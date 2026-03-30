(() => {
  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const header = document.querySelector(".site-header");

  const closeNav = () => {
    body.classList.remove("nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof HTMLAnchorElement) closeNav();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });

    document.addEventListener("click", (e) => {
      if (!body.classList.contains("nav-open")) return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest(".nav")) return;
      closeNav();
    });
  }

  // Smooth scroll (handles fixed header offset)
  const smoothScrollToId = (id) => {
    const element = document.querySelector(id);
    if (!element) return;
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const top = element.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
    window.scrollTo({ top, behavior: "smooth" });
  };

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLAnchorElement)) return;
    const href = target.getAttribute("href");
    if (!href || !href.startsWith("#") || href === "#") return;
    e.preventDefault();
    smoothScrollToId(href);
    history.pushState(null, "", href);
  });

  // Reveal on scroll
  const revealElements = Array.from(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && revealElements.length) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );
    revealElements.forEach((el) => io.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // If arriving with a hash, scroll with offset once layout is ready
  if (window.location.hash && window.location.hash.length > 1) {
    window.setTimeout(() => smoothScrollToId(window.location.hash), 0);
  }
})();