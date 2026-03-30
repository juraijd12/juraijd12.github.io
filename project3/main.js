const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px",
    }
);

document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
});

const html = document.documentElement;
const topbar = document.querySelector("[data-topbar]");
const navToggle = document.querySelector("[data-nav-toggle]");
const topnav = document.querySelector("[data-topnav]");
const yearTarget = document.querySelector("[data-year]");
const inquiryForm = document.querySelector("[data-inquiry-form]");
const formStatus = document.querySelector("[data-form-status]");
const submitButton = document.querySelector("[data-submit-button]");
const themeToggle = document.querySelector(".theme-toggle");
const mobileCta = document.querySelector("[data-mobile-cta]");

const errorTargets = new Map(
    Array.from(document.querySelectorAll("[data-error-for]")).map((element) => [
        element.getAttribute("data-error-for"),
        element,
    ])
);

errorTargets.forEach((element, fieldName) => {
    if (!element.id) {
        element.id = `field-error-${fieldName}`;
    }
});

const updateTopbarState = () => {
    if (!topbar) {
        return;
    }

    topbar.classList.toggle("is-scrolled", window.scrollY > 18);
};

const setNavOpen = (isOpen) => {
    if (!navToggle || !topnav) {
        return;
    }

    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    topnav.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen && window.innerWidth <= 720);
};

const setStatus = (message, type = "") => {
    if (!formStatus) {
        return;
    }

    formStatus.textContent = message;
    formStatus.classList.remove("is-error", "is-success");

    if (type) {
        formStatus.classList.add(type);
    }
};

const setFieldError = (fieldName, message = "") => {
    const field = inquiryForm?.querySelector(`[name="${fieldName}"]`);
    const errorTarget = errorTargets.get(fieldName);
    const fieldWrapper = field?.closest(".field");

    if (fieldWrapper) {
        fieldWrapper.classList.toggle("is-invalid", Boolean(message));
    }

    if (field) {
        field.setAttribute("aria-invalid", message ? "true" : "false");

        if (errorTarget) {
            field.setAttribute("aria-describedby", errorTarget.id);
        }
    }

    if (errorTarget) {
        errorTarget.textContent = message;
    }
};

const clearFieldErrors = () => {
    errorTargets.forEach((_, fieldName) => {
        setFieldError(fieldName, "");
    });
};

const validateForm = (formData) => {
    clearFieldErrors();

    const values = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        project_type: String(formData.get("project_type") || "").trim(),
        budget_range: String(formData.get("budget_range") || "").trim(),
        preferred_time: String(formData.get("preferred_time") || "").trim(),
        notes: String(formData.get("notes") || "").trim(),
    };

    let isValid = true;

    if (!values.name) {
        setFieldError("name", "Please enter your name.");
        isValid = false;
    }

    if (!values.email) {
        setFieldError("email", "Please enter your email address.");
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        setFieldError("email", "Please use a valid email address.");
        isValid = false;
    }

    if (!values.notes) {
        setFieldError("notes", "Please share a few project details.");
        isValid = false;
    }

    return isValid;
};

const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const setTheme = (theme) => {
    html.dataset.theme = theme;
    localStorage.setItem("theme", theme);

    if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
        themeToggle.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    }
};

const initTheme = () => {
    setTheme(getPreferredTheme());
};

const toggleTheme = () => {
    const currentTheme = html.dataset.theme || getPreferredTheme();
    setTheme(currentTheme === "dark" ? "light" : "dark");
};

updateTopbarState();
window.addEventListener("scroll", updateTopbarState, { passive: true });

if (navToggle && topnav) {
    navToggle.addEventListener("click", () => {
        setNavOpen(!topnav.classList.contains("is-open"));
    });

    topnav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 720) {
                setNavOpen(false);
            }
        });
    });
}

if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
}

const initFaqA11y = () => {
    const faqButtons = Array.from(document.querySelectorAll(".faq-question"));

    faqButtons.forEach((button, index) => {
        const answer = button.nextElementSibling;
        if (!answer) {
            return;
        }

        const panelId = `faq-panel-${index + 1}`;
        answer.id = answer.id || panelId;
        button.setAttribute("aria-controls", answer.id);
        answer.hidden = !answer.classList.contains("is-open");
    });
};

initFaqA11y();

document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;

        if (!answer) {
            return;
        }

        const shouldOpen = !answer.classList.contains("is-open");

        document.querySelectorAll(".faq-question").forEach((otherButton) => {
            otherButton.setAttribute("aria-expanded", "false");
        });

        document.querySelectorAll(".faq-answer").forEach((panel) => {
            panel.classList.remove("is-open");
            panel.hidden = true;
        });

        if (shouldOpen) {
            button.setAttribute("aria-expanded", "true");
            answer.classList.add("is-open");
            answer.hidden = false;
        }
    });
});

if (themeToggle) {
    initTheme();
    themeToggle.addEventListener("click", toggleTheme);
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (!localStorage.getItem("theme")) {
        setTheme(event.matches ? "dark" : "light");
    }
});

const initMobileCta = () => {
    if (!mobileCta) {
        return;
    }

    const hero = document.querySelector(".hero");
    const contact = document.querySelector("#contact");

    let isHeroVisible = true;
    let isContactVisible = false;

    const update = () => {
        const shouldShow = window.innerWidth <= 720 && !isHeroVisible && !isContactVisible;
        mobileCta.classList.toggle("is-visible", shouldShow);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.target === hero) {
                    isHeroVisible = entry.isIntersecting;
                }

                if (entry.target === contact) {
                    isContactVisible = entry.isIntersecting;
                }
            });

            update();
        },
        { threshold: 0.12 }
    );

    if (hero) {
        observer.observe(hero);
    }

    if (contact) {
        observer.observe(contact);
    }

    window.addEventListener("resize", update, { passive: true });
    update();
};

initMobileCta();

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./sw.js")
            .then((registration) => {
                console.log("SW registered:", registration);
            })
            .catch((error) => {
                console.log("SW registration failed:", error);
            });
    });
}

if (inquiryForm) {
    inquiryForm.querySelectorAll("input, select, textarea").forEach((field) => {
        field.addEventListener("input", () => {
            const fieldName = field.getAttribute("name");

            if (fieldName && errorTargets.has(fieldName)) {
                setFieldError(fieldName, "");
            }
        });
    });

    inquiryForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(inquiryForm);

        if (!validateForm(formData)) {
            setStatus("Please review the highlighted fields and try again.", "is-error");
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        setStatus("Submitting inquiry...", "");

        try {
            const response = await fetch(inquiryForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
            });

            const data = await response.json();

            if (!response.ok || !data.ok) {
                throw new Error(data.message || "Unable to submit inquiry.");
            }

            inquiryForm.reset();
            clearFieldErrors();
            setStatus("Your inquiry has been received. Redirecting to the confirmation page...", "is-success");
            window.setTimeout(() => {
                window.location.href = "./thank-you.html";
            }, 900);
        } catch (error) {
            setStatus(error.message || "Something went wrong while sending the inquiry.", "is-error");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Book a call";
            }
        }
    });
}
