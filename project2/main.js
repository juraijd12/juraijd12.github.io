const config = window.NOCTURNE_CONFIG || {};
const reservationConfig = config.reservation || {};
const feedConfig = config.feeds || {};

const navButtons = Array.from(document.querySelectorAll("[data-nav-target]"));
const primaryNav = document.querySelector("[data-primary-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const viewPanels = Array.from(document.querySelectorAll("[data-view-panel]"));
const viewLabel = document.querySelector("[data-view-label]");
const viewTitle = document.querySelector("[data-view-title]");
const viewIndex = document.querySelector("[data-view-index]");
const appShell = document.querySelector("[data-app-shell]");
const visualStage = document.querySelector(".visual-grid");
const parallaxCards = Array.from(document.querySelectorAll(".visual-card"));
const visualCards = new Map(
    Array.from(document.querySelectorAll("[data-visual-card]")).map((card) => [
        card.getAttribute("data-visual-card"),
        card,
    ])
);
const yearTargets = Array.from(document.querySelectorAll("[data-year]"));
const serviceStatusTarget = document.querySelector("[data-service-status]");
const manilaTimeTarget = document.querySelector("[data-manila-time]");
const nextReleaseTarget = document.querySelector("[data-next-release]");
const serviceChip = document.querySelector(".live-chip-status");
const notesFeed = document.querySelector("[data-notes-feed]");
const notesStatus = document.querySelector("[data-notes-status]");
const socialFeed = document.querySelector("[data-social-feed]");
const socialStatus = document.querySelector("[data-social-status]");

const viewOrder = ["arrival", "menu", "room", "journal", "reserve"];
const viewMeta = {
    arrival: { label: "01 Arrival", title: "Arrival" },
    menu: { label: "02 Tasting", title: "Tasting" },
    room: { label: "03 Room", title: "Room" },
    journal: { label: "04 Journal", title: "Journal" },
    reserve: { label: "05 Reserve", title: "Reserve" },
};

const defaultNotes = {
    updated_at: "Updated just now",
    items: [
        {
            tag: "Host Desk",
            time: "Tonight",
            title: "Second seating still has two salon tables open.",
            body: "Counter seats are currently waitlist-only, but the later salon block remains available for pairs and small parties.",
        },
        {
            tag: "Kitchen",
            time: "Now pouring",
            title: "Late pairing now ends with a drier pour.",
            body: "Guests asking for the lighter finish can now move through the shorter pairing without losing the final cacao course.",
        },
        {
            tag: "Room",
            time: "Service note",
            title: "Private requests are being reviewed for next Thursday.",
            body: "The darker salon edge is currently the best fit for anniversary bookings and six-to-eight guest requests.",
        },
    ],
};

const defaultSocial = {
    updated_at: "Refreshed moments ago",
    items: [
        {
            platform: "instagram",
            handle: "@nocturnetable",
            title: "Counter mise en place before first seating.",
            excerpt: "A closer look at tonight's first-fire setup and the opening broth station.",
            url: "https://instagram.com",
        },
        {
            platform: "facebook",
            handle: "Nocturne Table",
            title: "This week's reservation release is now open.",
            excerpt: "Salon tables and private requests are being reviewed in order of arrival.",
            url: "https://facebook.com",
        },
        {
            platform: "x",
            handle: "@nocturnetable",
            title: "Late seating is running with the shorter pairing tonight.",
            excerpt: "A quieter end to the room with a lighter pour progression and the same final course.",
            url: "https://twitter.com",
        },
    ],
};

const iconMarkup = {
    instagram: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5"></rect>
            <circle cx="12" cy="12" r="4.1"></circle>
            <circle cx="17.3" cy="6.8" r="1.15" fill="currentColor" stroke="none"></circle>
        </svg>
    `,
    facebook: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13.6 20.5v-7h2.4l.4-2.9h-2.8V8.7c0-.9.3-1.6 1.7-1.6h1.4V4.5c-.3 0-1-.1-2-.1-2.5 0-4.1 1.5-4.1 4.4v1.8H8.7v2.9h2.1v7h2.8Z" fill="currentColor" stroke="none"></path>
        </svg>
    `,
    x: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.9 4.5h-2.3l-4 4.6-3.3-4.6H4.5l5.6 7.8-5.9 6.8h2.3l4.4-5.1 3.7 5.1h4.8l-6-8.2 5.5-6.4Zm-3.4 13.1-7-9.6h1.2l7 9.6h-1.2Z" fill="currentColor" stroke="none"></path>
        </svg>
    `,
};

const getVisual = (key) => config?.visuals?.[key] || null;

const setVisualCard = (card, visualKey) => {
    if (!card) {
        return;
    }

    const visual = getVisual(visualKey);

    if (!visual) {
        return;
    }

    const image = card.querySelector("[data-visual-img]");
    const kicker = card.querySelector("[data-visual-kicker]");
    const title = card.querySelector("[data-visual-title]");

    if (image) {
        image.src = visual.url;
        image.alt = visual.alt || "";
        image.decoding = "async";
        image.loading = "eager";
    }

    if (kicker) {
        kicker.textContent = visual.label || "";
    }

    if (title) {
        title.textContent = visual.title || "";
    }
};

const syncVisualPanel = (targetView) => {
    // Default layout: main follows the active view; side/tall show previews.
    if (targetView === "menu") {
        setVisualCard(visualCards.get("arrival"), "menu");
        setVisualCard(visualCards.get("menu"), "arrival");
        setVisualCard(visualCards.get("room"), "room");
        return;
    }

    if (targetView === "room") {
        setVisualCard(visualCards.get("arrival"), "room");
        setVisualCard(visualCards.get("menu"), "menu");
        setVisualCard(visualCards.get("room"), "arrival");
        return;
    }

    if (targetView === "journal") {
        setVisualCard(visualCards.get("arrival"), "journal");
        setVisualCard(visualCards.get("menu"), "menu");
        setVisualCard(visualCards.get("room"), "room");
        return;
    }

    if (targetView === "reserve") {
        setVisualCard(visualCards.get("arrival"), "reserve");
        setVisualCard(visualCards.get("menu"), "menu");
        setVisualCard(visualCards.get("room"), "room");
        return;
    }

    setVisualCard(visualCards.get("arrival"), "arrival");
    setVisualCard(visualCards.get("menu"), "menu");
    setVisualCard(visualCards.get("room"), "room");
};

const setMenuOpen = (isOpen) => {
    if (!primaryNav || !menuToggle) {
        return;
    }

    primaryNav.classList.toggle("is-open", isOpen);
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen && window.innerWidth <= 760);
};

const activateView = (targetView) => {
    if (!viewMeta[targetView]) {
        return;
    }

    syncVisualPanel(targetView);

    navButtons.forEach((button) => {
        if (button.dataset.navTarget) {
            button.classList.toggle("is-active", button.dataset.navTarget === targetView && button.classList.contains("nav-pill"));
        }
    });

    viewPanels.forEach((panel) => {
        const isMatch = panel.dataset.viewPanel === targetView;
        panel.classList.toggle("is-active", isMatch);
        panel.hidden = !isMatch && window.innerWidth > 760;

        if (!isMatch && window.innerWidth <= 760) {
            panel.hidden = true;
        }

        if (isMatch && window.innerWidth <= 760) {
            panel.hidden = false;
        }
    });

    const meta = viewMeta[targetView];

    if (viewLabel) {
        viewLabel.textContent = meta.label;
    }

    if (viewTitle) {
        viewTitle.textContent = meta.title;
    }

    if (viewIndex) {
        viewIndex.textContent = String(viewOrder.indexOf(targetView) + 1).padStart(2, "0");
    }

    if (appShell) {
        appShell.dataset.activeView = targetView;
    }

    if (window.innerWidth <= 760) {
        setMenuOpen(false);
    }
};

navButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const targetView = event.currentTarget.dataset.navTarget;

        if (!targetView) {
            return;
        }

        event.preventDefault();
        activateView(targetView);
    });
});

// Ensure images match the initial active view on load.
const initialPanel = document.querySelector("[data-view-panel].is-active");
syncVisualPanel(initialPanel?.dataset.viewPanel || "arrival");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        setMenuOpen(!primaryNav.classList.contains("is-open"));
    });
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        setMenuOpen(false);
    }

    const activePanel = document.querySelector("[data-view-panel].is-active");

    if (activePanel) {
        activateView(activePanel.dataset.viewPanel);
    }
});

if (visualStage && parallaxCards.length) {
    let frame = null;

    const resetParallax = () => {
        parallaxCards.forEach((card) => {
            card.style.filter = "";
        });
        visualStage.style.transform = "";
    };

    visualStage.addEventListener("pointermove", (event) => {
        const bounds = visualStage.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        if (frame) {
            cancelAnimationFrame(frame);
        }

        frame = requestAnimationFrame(() => {
            visualStage.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
            parallaxCards.forEach((card) => {
                card.style.filter = "saturate(1.05)";
            });
        });
    });

    visualStage.addEventListener("pointerleave", () => {
        if (frame) {
            cancelAnimationFrame(frame);
        }

        resetParallax();
    });
}

yearTargets.forEach((target) => {
    target.textContent = new Date().getFullYear();
});

const getManilaPseudoNow = () => {
    const utcNow = Date.now() + new Date().getTimezoneOffset() * 60000;
    return new Date(utcNow + 8 * 60 * 60 * 1000);
};

const formatRemaining = (diffMs) => {
    const totalMinutes = Math.max(0, Math.floor(diffMs / 60000));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    if (days > 0) {
        return `${days}d ${hours}h`;
    }

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
};

const updateLiveDesk = () => {
    const manilaNow = getManilaPseudoNow();
    const day = manilaNow.getUTCDay();
    const hour = manilaNow.getUTCHours();

    if (manilaTimeTarget) {
        manilaTimeTarget.textContent = new Intl.DateTimeFormat("en-PH", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Manila",
        }).format(new Date());
    }

    let serviceStatus = "Closed now";
    let statusClass = "is-closed";

    if (day >= 2 && day <= 6 && hour >= 19 && hour < 23) {
        serviceStatus = "Seating underway";
        statusClass = "";
    } else if (day >= 2 && day <= 6 && hour >= 15 && hour < 19) {
        serviceStatus = "Pre-service prep";
        statusClass = "is-prep";
    } else if (day === 1 && hour >= 15 && hour < 18) {
        serviceStatus = "Counter release live";
        statusClass = "is-prep";
    }

    if (serviceStatusTarget) {
        serviceStatusTarget.textContent = serviceStatus;
    }

    if (serviceChip) {
        serviceChip.classList.remove("is-closed", "is-prep");
        if (statusClass) {
            serviceChip.classList.add(statusClass);
        }
    }

    const currentPseudoMs = manilaNow.getTime();
    const nextRelease = new Date(currentPseudoMs);
    nextRelease.setUTCHours(15, 0, 0, 0);

    while (nextRelease.getUTCDay() !== 1 || nextRelease.getTime() <= currentPseudoMs) {
        nextRelease.setUTCDate(nextRelease.getUTCDate() + 1);
        nextRelease.setUTCHours(15, 0, 0, 0);
    }

    const diffMs = nextRelease.getTime() - currentPseudoMs;

    if (nextReleaseTarget) {
        nextReleaseTarget.textContent = `in ${formatRemaining(diffMs)}`;
    }
};

const renderNotes = (payload) => {
    if (!notesFeed) {
        return;
    }

    const items = Array.isArray(payload.items) ? payload.items : [];

    notesFeed.innerHTML = items.map((item) => `
        <article class="note-entry">
            <div class="note-entry-meta">
                <span>${item.tag || "Update"}</span>
                <span>${item.time || ""}</span>
            </div>
            <h3>${item.title || ""}</h3>
            <p>${item.body || ""}</p>
        </article>
    `).join("");

    if (notesStatus) {
        notesStatus.textContent = payload.updated_at || "Live JSON";
    }
};

const renderSocial = (payload) => {
    if (!socialFeed) {
        return;
    }

    const items = Array.isArray(payload.items) ? payload.items : [];

    socialFeed.innerHTML = items.map((item) => {
        const platform = item.platform || "instagram";
        const icon = iconMarkup[platform] || iconMarkup.instagram;
        const label = platform === "x" ? "X" : platform.charAt(0).toUpperCase() + platform.slice(1);

        return `
            <article class="social-entry">
                <div class="social-entry-meta">
                    <span class="social-entry-platform">${icon}<span>${label}</span></span>
                    <span>${item.handle || ""}</span>
                </div>
                <h3>${item.title || ""}</h3>
                <p>${item.excerpt || ""}</p>
                <a class="social-entry-link" href="${item.url || "#"}" target="_blank" rel="noreferrer">Open update</a>
            </article>
        `;
    }).join("");

    if (socialStatus) {
        socialStatus.textContent = payload.updated_at || "Live links";
    }
};

const loadJsonFeed = async (url, fallbackData, renderFn, statusTarget) => {
    if (!url) {
        renderFn(fallbackData);
        if (statusTarget && !statusTarget.textContent) {
            statusTarget.textContent = "Demo data";
        }
        return;
    }

    try {
        const response = await fetch(url, { cache: "no-store" });

        if (!response.ok) {
            throw new Error(`Feed request failed: ${response.status}`);
        }

        const data = await response.json();
        renderFn(data);
    } catch {
        renderFn(fallbackData);
        if (statusTarget) {
            statusTarget.textContent = "Demo data";
        }
    }
};

const submitToFormspree = async (formData, endpoint) => {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: formData,
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(result.error || "Formspree submission failed.");
    }

    return result;
};

const submitToWeb3Forms = async (formData, reservationProviderConfig) => {
    const payload = new FormData();

    formData.forEach((value, key) => {
        payload.append(key, value);
    });

    payload.append("access_key", reservationProviderConfig.accessKey || "");
    payload.append("from_name", reservationProviderConfig.fromName || "Nocturne Table");
    payload.append("replyto", formData.get("email") || "");

    const response = await fetch(reservationProviderConfig.endpoint || "https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: payload,
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success === false) {
        throw new Error(result.message || "Web3Forms submission failed.");
    }

    return result;
};

const reservationForm = document.querySelector("[data-reservation-form]");
const reservationFeedback = document.querySelector("[data-reservation-feedback]");
const successCard = document.querySelector("[data-success-card]");

if (reservationForm) {
    const dateInput = reservationForm.querySelector('input[name="date"]');
    const requiredFields = Array.from(
        reservationForm.querySelectorAll("input[required], select[required], textarea[required]")
    );
    const submitButton = reservationForm.querySelector('button[type="submit"]');

    if (dateInput) {
        dateInput.min = new Date().toISOString().split("T")[0];
    }

    requiredFields.forEach((field) => {
        const clearInvalidState = () => {
            const isEmpty = !field.value.trim();
            field.classList.toggle("is-invalid", isEmpty || !field.checkValidity());
        };

        field.addEventListener("input", clearInvalidState);
        field.addEventListener("change", clearInvalidState);
    });

    reservationForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const firstInvalidField = requiredFields.find((field) => !field.value.trim() || !field.checkValidity());

        requiredFields.forEach((field) => {
            field.classList.toggle("is-invalid", !field.value.trim() || !field.checkValidity());
        });

        if (reservationFeedback) {
            reservationFeedback.classList.remove("is-error", "is-success");
        }

        if (successCard) {
            successCard.hidden = true;
        }

        if (firstInvalidField) {
            if (reservationFeedback) {
                reservationFeedback.textContent = "Please complete the required fields so the host can review your request.";
                reservationFeedback.classList.add("is-error");
            }

            firstInvalidField.focus();
            return;
        }

        const formData = new FormData(reservationForm);
        const provider = reservationConfig.provider || "demo";

        try {
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Sending...";
            }

            if (provider === "formspree" && reservationConfig.endpoint) {
                await submitToFormspree(formData, reservationConfig.endpoint);
            } else if (provider === "web3forms" && reservationConfig.accessKey) {
                await submitToWeb3Forms(formData, reservationConfig);
            }

            if (reservationFeedback) {
                reservationFeedback.textContent = provider === "demo"
                    ? "Reservation request queued in demo mode. Connect Formspree or Web3Forms in config.js to send live emails."
                    : "Reservation request received. The host will reply with seating and availability details.";
                reservationFeedback.classList.add("is-success");
            }

            if (successCard) {
                successCard.hidden = false;
            }

            reservationForm.reset();

            if (dateInput) {
                dateInput.min = new Date().toISOString().split("T")[0];
            }
        } catch (error) {
            if (reservationFeedback) {
                reservationFeedback.textContent = error.message || "The request could not be sent right now.";
                reservationFeedback.classList.add("is-error");
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Request Reservation";
            }
        }
    });
}

updateLiveDesk();
window.setInterval(updateLiveDesk, 60000);

loadJsonFeed(feedConfig.notesUrl || "./data/today-notes.json", defaultNotes, renderNotes, notesStatus);
loadJsonFeed(feedConfig.socialUrl || "./data/social-feed.json", defaultSocial, renderSocial, socialStatus);

activateView("arrival");

// Theme is fixed to dark mode (no toggle).

// PWA Service Worker registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((error) => {
        console.log("SW registration failed: ", error);
      });
  });
}
