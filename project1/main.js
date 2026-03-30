const surfaceTabs = Array.from(document.querySelectorAll("[data-surface-view]"));
const surfacePanels = Array.from(document.querySelectorAll("[data-surface-panel]"));
const billingButtons = Array.from(document.querySelectorAll("[data-billing]"));
const activityFeed = document.querySelector("[data-activity-feed]");
const activityStatus = document.querySelector("[data-activity-status]");
const changelogFeed = document.querySelector("[data-changelog-feed]");
const changelogStatus = document.querySelector("[data-changelog-status]");
const workspaceStatus = document.querySelector("[data-workspace-status]");
const counters = Array.from(document.querySelectorAll("[data-counter]"));
const priceStarter = document.querySelector("[data-price-starter]");
const priceGrowth = document.querySelector("[data-price-growth]");
const priceScale = document.querySelector("[data-price-scale]");

const priceTable = {
    monthly: {
        starter: "$0",
        growth: "$29",
        scale: "Custom",
    },
    annual: {
        starter: "$0",
        growth: "$24",
        scale: "Custom",
    },
};

const fallbackActivity = [
    {
        tag: "Ops",
        title: "Release sign-off moved to 4:30 PM",
        body: "Legal review cleared the docs pack, leaving only final stakeholder approval.",
    },
    {
        tag: "Growth",
        title: "Onboarding refresh entered QA",
        body: "Design and PM closed the handoff, with analytics tagging now under review.",
    },
    {
        tag: "Product",
        title: "Roadmap digest sent to leadership",
        body: "The weekly summary now includes dependency flags and owner alignment notes.",
    },
];

const fallbackChangelog = [
    {
        version: "v2.8.1",
        title: "Approval queue now supports release-level grouping",
        body: "Teams can batch related approvals together so launches are easier to scan before sign-off.",
    },
    {
        version: "v2.8.0",
        title: "Executive summary widgets added to workspace home",
        body: "Leads can see risk, review load, and delivery health without opening extra panels.",
    },
    {
        version: "v2.7.6",
        title: "New webhook endpoint for release status sync",
        body: "Ops tools can now push scheduled or delayed release changes directly into the product feed.",
    },
];

const setSurfaceView = (target) => {
    surfaceTabs.forEach((tab) => {
        tab.classList.toggle("is-active", tab.dataset.surfaceView === target);
    });

    surfacePanels.forEach((panel) => {
        const isMatch = panel.dataset.surfacePanel === target;
        panel.classList.toggle("is-active", isMatch);
        panel.hidden = !isMatch;
    });
};

surfaceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        setSurfaceView(tab.dataset.surfaceView);
    });
});

const applyPricing = (mode) => {
    const values = priceTable[mode] || priceTable.monthly;

    if (priceStarter) {
        priceStarter.textContent = values.starter;
    }

    if (priceGrowth) {
        priceGrowth.textContent = values.growth;
    }

    if (priceScale) {
        priceScale.textContent = values.scale;
    }

    billingButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.billing === mode);
    });
};

billingButtons.forEach((button) => {
    button.addEventListener("click", () => {
        applyPricing(button.dataset.billing);
    });
});

const animateCounter = (node) => {
    const target = Number.parseFloat(node.dataset.counter || "0");
    const suffix = node.dataset.suffix || "";
    const duration = 850;
    const start = performance.now();

    const tick = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const value = target * progress;

        if (suffix === "%") {
            node.textContent = `${Math.round(value)}%`;
        } else if (suffix === "m") {
            node.textContent = `${Math.round(value)}m`;
        } else {
            node.textContent = Math.round(value).toLocaleString();
        }

        if (progress < 1) {
            requestAnimationFrame(tick);
        }
    };

    requestAnimationFrame(tick);
};

const renderActivity = (items) => {
    if (!activityFeed) {
        return;
    }

    activityFeed.innerHTML = items.map((item) => `
        <article class="activity-item">
            <div>
                <small>${item.tag}</small>
                <h3>${item.title}</h3>
            </div>
            <p>${item.body}</p>
        </article>
    `).join("");
};

const renderChangelog = (items) => {
    if (!changelogFeed) {
        return;
    }

    changelogFeed.innerHTML = items.map((item) => `
        <article class="changelog-item">
            <div>
                <small>${item.version}</small>
                <h3>${item.title}</h3>
            </div>
            <p>${item.body}</p>
        </article>
    `).join("");
};

const loadJson = async (url, fallbackItems, renderFn, statusNode, fallbackLabel) => {
    try {
        const response = await fetch(url, { cache: "no-store" });

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const payload = await response.json();
        renderFn(Array.isArray(payload.items) ? payload.items : fallbackItems);

        if (statusNode) {
            statusNode.textContent = payload.updated_at || "Synced";
        }
    } catch {
        renderFn(fallbackItems);

        if (statusNode) {
            statusNode.textContent = fallbackLabel;
        }
    }
};

const updateWorkspaceStatus = () => {
    if (!workspaceStatus) {
        return;
    }

    const hour = new Date().getHours();
    workspaceStatus.textContent = hour >= 8 && hour < 18 ? "Teams active now" : "Async work mode";
};

setSurfaceView("summary");
applyPricing("monthly");
counters.forEach(animateCounter);
loadJson("./data/activity.json", fallbackActivity, renderActivity, activityStatus, "Demo data");
loadJson("./data/changelog.json", fallbackChangelog, renderChangelog, changelogStatus, "Demo data");
updateWorkspaceStatus();

// Dark mode toggle
const html = document.documentElement;
const toggle = document.querySelector(".theme-toggle");

const setTheme = (theme) => {
  html.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  toggle?.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
};

const initTheme = () => {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (saved) {
    setTheme(saved);
  } else if (prefersDark) {
    setTheme("dark");
  }
};

const toggleTheme = () => {
  const current = html.dataset.theme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  setTheme(current === "dark" ? "light" : "dark");
};

if (toggle) {
  toggle.addEventListener("click", toggleTheme);
  initTheme();
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    setTheme(e.matches ? "dark" : "light");
  }
});

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


// Year
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());