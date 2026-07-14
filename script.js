(() => {
  const root = document.documentElement;
  const body = document.body;
  const heroLead = document.getElementById("hero-lead");
  const routeGrid = document.getElementById("route-grid");
  const briefingBadge = document.getElementById("briefing-badge");
  const briefingTitle = document.getElementById("briefing-title");
  const briefingSummary = document.getElementById("briefing-summary");
  const briefingMetrics = document.getElementById("briefing-metrics");
  const briefingPath = document.getElementById("briefing-path");
  const journeyGrid = document.getElementById("journey-grid");
  const proofGrid = document.getElementById("proof-grid");
  const signalList = document.getElementById("signal-list");
  const projectRail = document.getElementById("project-rail");
  const projectDetailInner = document.getElementById("project-detail-inner");
  const skillBars = document.getElementById("skill-bars");
  const toolCloud = document.getElementById("tool-cloud");
  const timelineShell = document.getElementById("timeline-shell");
  const contactCopy = document.getElementById("contact-copy");
  const contactSubject = document.getElementById("contact-subject");
  const contactMessage = document.getElementById("contact-message");
  const themeToggle = document.getElementById("theme-toggle");
  const paletteOpen = document.getElementById("palette-open");
  const paletteBackdrop = document.getElementById("palette-backdrop");
  const paletteClose = document.getElementById("palette-close");
  const paletteInput = document.getElementById("palette-input");
  const paletteResults = document.getElementById("palette-results");
  const contactForm = document.getElementById("contact-form");
  const toast = document.getElementById("toast");
  const caseModal = document.getElementById("case-modal");
  const caseModalTitle = document.getElementById("case-modal-title");
  const caseModalBody = document.getElementById("case-modal-body");
  const caseModalClose = document.getElementById("case-modal-close");

  const ROUTES = {
    support: {
      id: "support",
      badge: "Support route",
      eyebrow: "My computers have problems",
      title: "Stabilize workstations, peripherals, and users fast.",
      summary:
        "I diagnose the issue, isolate the root cause, and leave the environment cleaner than I found it.",
      proof: "Best fit for IT managers, help desks, and MSP teams that need fewer repeat tickets.",
      accent: "#79f0ca",
      accentRgb: "121 240 202",
      accent2: "#7ea8ff",
      accent2Rgb: "126 168 255",
      metrics: [
        { value: "20+", label: "workstations supported across day-to-day operations" },
        { value: "3", label: "branch offices kept connected and moving" },
        { value: "100%", label: "focus on clear handoff and documentation" },
        { value: "0", label: "guesswork in the recovery plan" }
      ],
      steps: [
        {
          title: "Intake and triage",
          body: "Capture symptoms, the user's workflow, and what changed before the issue started."
        },
        {
          title: "Hardware and software checks",
          body: "Test the device, drivers, power, storage, OS health, and the most likely failure points."
        },
        {
          title: "Repair and recovery",
          body: "Remove malware, reinstall Windows when needed, restore drivers, and recover the system."
        },
        {
          title: "Network validation",
          body: "Confirm connectivity, printers, shared resources, and branch office access before closing."
        },
        {
          title: "Prevention notes",
          body: "Document the fix, the cause, and the next thing to monitor so the ticket does not come back."
        }
      ],
      signals: [
        { label: "Hardware troubleshooting", note: "Fast root-cause isolation for unstable devices." },
        { label: "Malware removal", note: "Clean recovery without leaving the machine brittle." },
        { label: "Windows installation", note: "Stable rebuilds when repair is the smarter route." },
        { label: "Driver recovery", note: "Device support that avoids hidden compatibility issues." },
        { label: "Network configuration", note: "Connectivity checks that stop problems from spreading." }
      ],
      projectOrder: ["support-playbook", "attendance-flow", "workspace", "fleet-tracking"],
      skills: {
        Support: 98,
        Networking: 88,
        Automation: 72,
        Web: 66
      },
      tools: ["Windows", "Networking", "Ticketing", "Documentation", "Remote support"],
      timelineFocus: ["support", "documentation"]
    },
    website: {
      id: "website",
      badge: "Web route",
      eyebrow: "I need a website",
      title: "Ship a modern site that feels premium and fast.",
      summary:
        "I turn a vague request into a clear information architecture, polished UI, and a responsive experience that actually converts.",
      proof: "Best fit for founders, agencies, and direct clients who need product-level presentation.",
      accent: "#7ea8ff",
      accentRgb: "126 168 255",
      accent2: "#b78cff",
      accent2Rgb: "183 140 255",
      metrics: [
        { value: "1", label: "clear narrative from headline to contact" },
        { value: "3", label: "interaction layers: hero, case studies, contact" },
        { value: "100%", label: "responsive layout approach across breakpoints" },
        { value: "0", label: "template-looking sections" }
      ],
      steps: [
        { title: "Scope the story", body: "Clarify the audience, the offer, and the proof that needs to be seen first." },
        { title: "Build the system", body: "Create reusable components, layout rules, and a clean visual language." },
        { title: "Design for speed", body: "Keep the interface light, responsive, and easy to scan in seconds." },
        { title: "Add trust signals", body: "Use project evidence, service outcomes, and direct contact paths." },
        { title: "Launch cleanly", body: "Ship with accessible markup, SEO basics, and fast load behavior." }
      ],
      signals: [
        { label: "Laravel workspace", note: "Shows platform thinking, not just page design." },
        { label: "Case study structure", note: "Explains the why behind each feature." },
        { label: "Motion restraint", note: "Feels premium without becoming distracting." },
        { label: "SEO friendly", note: "Built to be readable by humans and crawlers." },
        { label: "Responsive architecture", note: "Works on phones, tablets, and wide screens." }
      ],
      projectOrder: ["workspace", "support-playbook", "attendance-flow", "fleet-tracking"],
      skills: {
        Web: 92,
        UI: 90,
        Automation: 68,
        Support: 74
      },
      tools: ["HTML", "CSS", "JavaScript", "Accessibility", "Performance"],
      timelineFocus: ["workspace", "documentation"]
    },
    automation: {
      id: "automation",
      badge: "Automation route",
      eyebrow: "I want to automate repetitive tasks",
      title: "Turn manual steps into reliable workflows.",
      summary:
        "I map the current process, remove the fragile bits, and build automation that generates useful outputs without constant babysitting.",
      proof: "Best fit for teams who spend too much time on repetitive reporting and handoffs.",
      accent: "#f1b95c",
      accentRgb: "241 185 92",
      accent2: "#79f0ca",
      accent2Rgb: "121 240 202",
      metrics: [
        { value: "1", label: "manual process converted into a repeatable flow" },
        { value: "PDF", label: "automated report output ready for sharing" },
        { value: "2", label: "consistency checks before export and handoff" },
        { value: "0", label: "copy-paste required after the first setup" }
      ],
      steps: [
        { title: "Map the process", body: "Write down every manual step so the hidden waste becomes visible." },
        { title: "Build the logic", body: "Use Python to ingest, transform, validate, and prepare the output." },
        { title: "Generate the artifact", body: "Turn the result into a PDF, report, or structured file people can trust." },
        { title: "Check the result", body: "Run QA against the data so broken inputs do not create bad exports." },
        { title: "Document the handoff", body: "Leave enough context so the automation can be used without ceremony." }
      ],
      signals: [
        { label: "Python attendance automation", note: "A real time saver for repeating admin work." },
        { label: "Automated PDF reports", note: "Outputs that are ready to share immediately." },
        { label: "Process improvement", note: "The system gets simpler, not just faster." },
        { label: "QA testing", note: "Confidence is built into the workflow." },
        { label: "Database management", note: "Keeps the data structured and usable." }
      ],
      projectOrder: ["attendance-flow", "workspace", "support-playbook", "fleet-tracking"],
      skills: {
        Python: 96,
        Automation: 95,
        Data: 82,
        QA: 74
      },
      tools: ["Python", "PDF generation", "CSV", "Validation", "Reporting"],
      timelineFocus: ["automation", "reporting"]
    },
    networking: {
      id: "networking",
      badge: "Networking route",
      eyebrow: "I need networking help",
      title: "Keep sites, devices, and people connected.",
      summary:
        "I troubleshoot connectivity problems, verify the network path, and stabilize the environment before users lose more time.",
      proof: "Best fit for offices, branch locations, and operations teams that need dependable connectivity.",
      accent: "#87c3ff",
      accentRgb: "135 195 255",
      accent2: "#79f0ca",
      accent2Rgb: "121 240 202",
      metrics: [
        { value: "3", label: "branch offices supported through network issues" },
        { value: "1", label: "clear line of sight from device to router to service" },
        { value: "24/7", label: "mindset for diagnosing where the link breaks" },
        { value: "0", label: "need for vague assumptions" }
      ],
      steps: [
        { title: "Identify the failure", body: "Check whether the issue is device, cable, switch, router, or upstream service." },
        { title: "Trace the path", body: "Confirm the full route from workstation to shared resources and the internet." },
        { title: "Validate configuration", body: "Review IP setup, DNS, gateways, and device settings for misalignment." },
        { title: "Restore continuity", body: "Rebuild the route, test access, and confirm the branch is back online." },
        { title: "Prevent repeats", body: "Document what happened and what should be watched next time." }
      ],
      signals: [
        { label: "Network configuration", note: "Brings order to unstable connectivity." },
        { label: "Branch office support", note: "Keeps multiple locations aligned." },
        { label: "Device diagnosis", note: "Finds where the failure begins." },
        { label: "Documentation", note: "Makes the fix repeatable for the team." },
        { label: "Operational clarity", note: "Less downtime, fewer surprises." }
      ],
      projectOrder: ["fleet-tracking", "support-playbook", "workspace", "attendance-flow"],
      skills: {
        Networking: 94,
        Support: 90,
        Automation: 66,
        Web: 54
      },
      tools: ["Routing", "DNS", "IP config", "Switches", "Branch support"],
      timelineFocus: ["networking", "support"]
    },
    documentation: {
      id: "documentation",
      badge: "Documentation route",
      eyebrow: "I need documentation",
      title: "Make systems understandable and easy to hand off.",
      summary:
        "I turn implicit knowledge into clean, reusable documentation that reduces confusion and keeps people moving when support is not around.",
      proof: "Best fit for operations teams, internal tools, and technical handoffs that need clarity.",
      accent: "#f09bd5",
      accentRgb: "240 155 213",
      accent2: "#7ea8ff",
      accent2Rgb: "126 168 255",
      metrics: [
        { value: "1", label: "source of truth for the people who need the answer" },
        { value: "5", label: "step structure for repeatable handoffs" },
        { value: "0", label: "mystery left in the process" },
        { value: "100%", label: "clearer onboarding and support continuity" }
      ],
      steps: [
        { title: "Collect the flow", body: "Observe the task as it actually happens, not only how it is supposed to happen." },
        { title: "Standardize the language", body: "Use consistent headings, labels, and steps so the document is easy to scan." },
        { title: "Add useful context", body: "Include the why, the edge cases, and the warning signs." },
        { title: "Publish where people work", body: "Place the document in a spot the team actually checks." },
        { title: "Keep it current", body: "Treat documentation as a maintained product instead of a one-off asset." }
      ],
      signals: [
        { label: "Internal Laravel workspace", note: "A real example of system thinking and shared knowledge." },
        { label: "QA and documentation", note: "Pairs clarity with quality control." },
        { label: "Support handoffs", note: "Captures what the next person needs." },
        { label: "Process improvement", note: "Turns tribal knowledge into a repeatable asset." },
        { label: "User education", note: "Makes systems less intimidating." }
      ],
      projectOrder: ["support-playbook", "workspace", "attendance-flow", "fleet-tracking"],
      skills: {
        Writing: 92,
        Support: 88,
        Systems: 80,
        Automation: 64
      },
      tools: ["Runbooks", "KB articles", "Handoffs", "Templates", "Versioning"],
      timelineFocus: ["documentation", "workspace"]
    },
    hiring: {
      id: "hiring",
      badge: "Hiring route",
      eyebrow: "I am hiring for this role",
      title: "Match the role to a technical problem solver.",
      summary:
        "If the team needs someone who can support users, translate requirements, document systems, and ship practical solutions, this path makes the fit obvious.",
      proof: "Best fit for IT managers, recruiters, MSPs, and startup founders evaluating ownership and reliability.",
      accent: "#79f0ca",
      accentRgb: "121 240 202",
      accent2: "#f1b95c",
      accent2Rgb: "241 185 92",
      metrics: [
        { value: "IT", label: "support grounded in real troubleshooting" },
        { value: "Web", label: "development with product-level thinking" },
        { value: "Auto", label: "automation that removes repetitive work" },
        { value: "Ops", label: "documentation and process improvement" }
      ],
      steps: [
        { title: "Role alignment", body: "Match the work to support, automation, web, or mixed operations needs." },
        { title: "Evidence review", body: "Use case studies and outcomes to validate experience quickly." },
        { title: "Trust signals", body: "Look for the blend of technical depth, reliability, and clear handoffs." },
        { title: "Interview topics", body: "Focus on how the work reduces friction and improves operations." },
        { title: "Next step", body: "Book a conversation and move the process from interest to action." }
      ],
      signals: [
        { label: "IT support", note: "On-the-ground troubleshooting and recovery." },
        { label: "Web development", note: "Laravel, PHP, JavaScript, and responsive UI work." },
        { label: "Automation engineering", note: "Python workflows, reporting, and process relief." },
        { label: "Process improvement", note: "Structured thinking, documentation, and QA." },
        { label: "Availability", note: "Open for selected opportunities and client work." }
      ],
      projectOrder: ["workspace", "attendance-flow", "support-playbook", "fleet-tracking"],
      skills: {
        Support: 92,
        Web: 84,
        Automation: 86,
        Systems: 90
      },
      tools: ["Support", "Web", "Automation", "Docs", "QA"],
      timelineFocus: ["support", "automation", "workspace", "documentation", "networking"]
    }
  };

  const PROJECTS = {
    "attendance-flow": {
      id: "attendance-flow",
      title: "Attendance Flow Automation",
      category: "Python automation",
      summary:
        "Built a Python workflow to reduce manual attendance processing and automate PDF report generation.",
      problem: "Attendance data was being collected and assembled by hand, which slowed reporting and created room for errors.",
      challenge:
        "The workflow needed to accept messy input, produce a consistent report, and stay understandable for future updates.",
      process: [
        "Mapped the manual steps and identified the repeatable parts.",
        "Built Python logic to collect, validate, and reshape the data.",
        "Generated clean PDF reports for sharing and record keeping.",
        "Added checks to reduce mistakes before the export step."
      ],
      architecture: [
        "Python processing layer",
        "Structured input handling",
        "Automated PDF generation",
        "Validation and QA checks",
        "Repeatable output format"
      ],
      stack: ["Python", "Automation", "Reporting", "QA", "Process improvement"],
      lessons: [
        "Small validation rules prevented bad data from reaching the final report.",
        "A consistent output format made the handoff easier for non-technical users."
      ],
      results: [
        "Removed manual report assembly.",
        "Made attendance processing faster and more predictable.",
        "Reduced repetitive admin work."
      ],
      screenshots: [
        { label: "Before", body: "Manual sheets and scattered inputs" },
        { label: "Process", body: "Python validation and report flow" },
        { label: "After", body: "Clean PDF output ready to share" }
      ],
      github: "https://github.com/juraijd12/juraijd12.github.io"
    },
    workspace: {
      id: "workspace",
      title: "AIYU Internal Laravel Workspace",
      category: "Full stack system",
      summary:
        "Built an internal workspace for documents, approvals, project context, and collaboration across the team.",
      problem: "The team needed one place to manage work instead of switching between disconnected tools and files.",
      challenge:
        "The system had to support different roles, keep records organized, and still feel easy enough for daily use.",
      process: [
        "Planned the structure around real operational tasks.",
        "Built modular Laravel features for work management and storage.",
        "Added role-aware access so the right people saw the right tools.",
        "Shaped the flow for approvals, files, and team communication."
      ],
      architecture: [
        "Laravel backend",
        "Role-based access control",
        "Document storage and recovery",
        "Project workspace modules",
        "Internal collaboration surfaces"
      ],
      stack: ["Laravel", "PHP", "Database management", "RBAC", "Documentation"],
      lessons: [
        "A modular structure made the workspace easier to extend later.",
        "Clear navigation reduced friction for people using it every day."
      ],
      results: [
        "Unified approvals, files, and project context.",
        "Reduced operational scatter.",
        "Created a clearer collaboration flow for the team."
      ],
      screenshots: [
        { label: "Dashboard", body: "Workspace modules and quick actions" },
        { label: "Approvals", body: "Review and revision workflow" },
        { label: "Storage", body: "Document management and recovery" }
      ],
      github: "https://github.com/juraijd12/juraijd12.github.io"
    },
    "fleet-tracking": {
      id: "fleet-tracking",
      title: "GPS Fleet Tracking Setup",
      category: "Operations system",
      summary:
        "Configured fleet tracking support so operations teams could see location, movement, and service status more clearly.",
      problem: "Teams needed a way to keep track of assets and movement without relying on scattered updates.",
      challenge:
        "The setup had to be reliable enough for day-to-day use and simple enough for operations teams to trust.",
      process: [
        "Reviewed the tracking requirements and expected reporting needs.",
        "Configured the service and checked the data visibility flow.",
        "Validated status views and monitoring expectations.",
        "Documented the setup so support could repeat it cleanly."
      ],
      architecture: [
        "Tracking configuration",
        "Operational visibility",
        "Data monitoring",
        "Support documentation",
        "Service validation"
      ],
      stack: ["Configuration", "Monitoring", "Support", "Documentation", "QA"],
      lessons: [
        "A clear setup reduces confusion when service status changes.",
        "Documentation matters as much as the initial configuration."
      ],
      results: [
        "Improved visibility for fleet status.",
        "Helped the operations team follow the workflow more confidently.",
        "Created a repeatable support path."
      ],
      screenshots: [
        { label: "Map", body: "Fleet positions and service activity" },
        { label: "Status", body: "Operational view for active units" },
        { label: "Notes", body: "Support handoff and validation" }
      ],
      github: "https://github.com/juraijd12/juraijd12.github.io"
    },
    "support-playbook": {
      id: "support-playbook",
      title: "Support Playbook and Documentation",
      category: "Ops documentation",
      summary:
        "Built a support knowledge base structure to make handoffs, troubleshooting, and onboarding easier.",
      problem: "The team needed a clearer path for support tasks, especially when the original context was not available.",
      challenge:
        "The playbook had to be practical, searchable, and written for people who need the answer quickly.",
      process: [
        "Collected repeat support tasks and grouped them by scenario.",
        "Wrote concise instructions that emphasized what to check first.",
        "Structured the documentation for scanning, not just reading.",
        "Added handoff language so the next person could continue faster."
      ],
      architecture: [
        "Knowledge base structure",
        "Troubleshooting flow",
        "Handoff guidance",
        "Searchable categories",
        "Maintenance-friendly writing"
      ],
      stack: ["Documentation", "Support", "QA", "Process design", "User education"],
      lessons: [
        "Useful documentation is short, specific, and tied to the real workflow.",
        "The best playbooks reduce the chance of the same question being asked twice."
      ],
      results: [
        "Simplified support handoffs.",
        "Improved consistency in troubleshooting.",
        "Made onboarding easier for new team members."
      ],
      screenshots: [
        { label: "Index", body: "Searchable support topics" },
        { label: "Runbook", body: "Step-by-step recovery flow" },
        { label: "Handoff", body: "What the next person needs" }
      ],
      github: "https://github.com/juraijd12/juraijd12.github.io"
    }
  };

  const TIMELINE = [
    {
      id: "support",
      date: "Frontline support",
      title: "Managed IT support for 20+ workstations",
      body:
        "Handled troubleshooting, malware removal, Windows installation, driver installation, and network configuration across three branch offices.",
      tags: ["Support", "Networking", "Recovery"]
    },
    {
      id: "automation",
      date: "Automation",
      title: "Built attendance automation in Python",
      body:
        "Removed repetitive attendance processing and generated automated PDF reports for a cleaner handoff.",
      tags: ["Python", "Automation", "Reporting"]
    },
    {
      id: "workspace",
      date: "Full stack",
      title: "Built an internal Laravel workspace",
      body:
        "Created a structured internal system for documents, approvals, collaboration, and operational clarity.",
      tags: ["Laravel", "PHP", "Systems"]
    },
    {
      id: "networking",
      date: "Operations",
      title: "Configured GPS fleet tracking",
      body:
        "Supported tracking setup so operational teams could monitor service and movement with better visibility.",
      tags: ["Configuration", "Monitoring", "Support"]
    },
    {
      id: "documentation",
      date: "Documentation",
      title: "Built documentation and QA habits",
      body:
        "Turned repeated fixes into runbooks, checks, and handoff notes that reduced friction for the next person.",
      tags: ["Docs", "QA", "Process improvement"]
    }
  ];

  const state = {
    routeId: "support",
    projectId: "support-playbook",
    theme: localStorage.getItem("juraij-theme") || "dark",
    paletteOpen: false,
    paletteQuery: ""
  };

  const commands = [
    { title: "Jump to support route", body: "Open the IT support story path.", run: () => setRoute("support", true) },
    { title: "Jump to automation route", body: "Open the automation story path.", run: () => setRoute("automation", true) },
    { title: "Jump to web route", body: "Open the website strategy path.", run: () => setRoute("website", true) },
    { title: "Jump to networking route", body: "Open the network troubleshooting path.", run: () => setRoute("networking", true) },
    { title: "Jump to documentation route", body: "Open the documentation path.", run: () => setRoute("documentation", true) },
    { title: "Jump to hiring route", body: "Open the recruiter-focused path.", run: () => setRoute("hiring", true) },
    { title: "Open projects", body: "Scroll to the case studies section.", run: () => scrollToSection("#projects") },
    { title: "Open contact", body: "Scroll to the contact form.", run: () => scrollToSection("#contact") },
    { title: "Toggle theme", body: "Switch between dark and light mode.", run: toggleTheme },
    { title: "Download resume", body: "Open the resume file download.", run: () => window.open("./Juraij-A-Dimapalao-Resume.txt", "_blank", "noopener") },
    { title: "Open GitHub repo", body: "View the portfolio repository.", run: () => window.open("https://github.com/juraijd12/juraijd12.github.io", "_blank", "noopener") }
  ];

  function setTheme(theme, announce = true) {
    state.theme = theme;
    root.dataset.theme = theme;
    localStorage.setItem("juraij-theme", theme);
    themeToggle.setAttribute("aria-pressed", String(theme === "light"));
    themeToggle.querySelector(".icon-button__label").textContent = theme === "light" ? "Light" : "Dark";
    if (announce) {
      showToast(theme === "light" ? "Light mode enabled" : "Dark mode enabled");
    }
  }

  function toggleTheme() {
    setTheme(state.theme === "dark" ? "light" : "dark");
  }

  function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    closePalette();
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    toast.animate(
      [
        { transform: "translateY(10px)", opacity: 0 },
        { transform: "translateY(0)", opacity: 1 }
      ],
      { duration: 180, easing: "ease-out" }
    );
    clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => {
      toast.hidden = true;
    }, 1800);
  }

  function animateMetricValue(element, rawValue) {
    const text = String(rawValue);
    const numericMatch = text.match(/[\d.]+/);
    if (!numericMatch) {
      element.textContent = text;
      return;
    }

    const target = Number(numericMatch[0]);
    const suffix = text.replace(/[\d.]/g, "");
    const start = performance.now();
    const duration = 700;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      element.textContent = `${current}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }

  function renderRouteCards() {
    routeGrid.innerHTML = "";
    Object.values(ROUTES).forEach((route) => {
      const button = document.createElement("button");
      button.className = "route-card";
      button.type = "button";
      button.dataset.route = route.id;
      button.innerHTML = `
        <span class="route-card__eyebrow">${route.eyebrow}</span>
        <span class="route-card__title">${route.title}</span>
        <span class="route-card__body">${route.summary}</span>
      `;
      button.addEventListener("click", () => setRoute(route.id, true));
      routeGrid.appendChild(button);
    });
  }

  function renderJourney(route) {
    journeyGrid.innerHTML = route.steps
      .map(
        (step, index) => `
          <article class="journey-card reveal is-visible">
            <div class="journey-card__head">
              <div class="journey-card__index">${String(index + 1).padStart(2, "0")}</div>
              <span class="project-kicker">${route.badge}</span>
            </div>
            <h3>${step.title}</h3>
            <p>${step.body}</p>
            <div class="journey-card__footer">
              <span class="chip">${route.tools[index % route.tools.length]}</span>
              <span class="chip">${index === 0 ? "Problem" : index === route.steps.length - 1 ? "Contact" : "Process"}</span>
            </div>
          </article>
        `
      )
      .join("");
  }

  function renderProof(route) {
    proofGrid.innerHTML = route.metrics
      .map(
        (metric) => `
          <article class="proof-card reveal is-visible">
            <div class="proof-card__value" data-value="${metric.value}">${metric.value}</div>
            <div class="proof-card__label">${metric.label}</div>
          </article>
        `
      )
      .join("");

    requestAnimationFrame(() => {
      proofGrid.querySelectorAll("[data-value]").forEach((element) => {
        animateMetricValue(element, element.dataset.value);
      });
    });
  }

  function renderSignals(route) {
    signalList.innerHTML = route.signals
      .map(
        (signal) => `
          <div class="signal-item">
            <div class="signal-item__label">${signal.label}</div>
            <div class="signal-item__note">${signal.note}</div>
          </div>
        `
      )
      .join("");
  }

  function renderSkills(route) {
    skillBars.innerHTML = Object.entries(route.skills)
      .map(
        ([name, value]) => `
          <div class="skill-row">
            <div class="skill-row__head">
              <div class="skill-row__name">${name}</div>
              <div class="skill-row__value">${value}%</div>
            </div>
            <div class="skill-track" aria-hidden="true">
              <div class="skill-fill" style="width: ${value}%"></div>
            </div>
          </div>
        `
      )
      .join("");

    toolCloud.innerHTML = route.tools
      .map((tool) => `<span class="tool-chip">${tool}</span>`)
      .join("");
  }

  function renderTimeline(route) {
    timelineShell.innerHTML = `
      <div class="timeline-list">
        ${TIMELINE.map((entry) => {
          const isActive = route.timelineFocus.includes(entry.id) ? "is-active" : "";
          return `
            <article class="timeline-item ${isActive}">
              <div class="timeline-item__inner">
                <div class="timeline-item__date">${entry.date}</div>
                <h3 class="timeline-item__title">${entry.title}</h3>
                <p class="timeline-item__body">${entry.body}</p>
                <div class="timeline-tags">
                  ${entry.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}
                </div>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  function createProjectCard(project, active) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `project-card${active ? " is-active" : ""}`;
    card.dataset.project = project.id;
    card.innerHTML = `
      <div class="project-card__meta">
        <span class="chip">${project.category}</span>
        <span class="chip">${project.stack[0]}</span>
      </div>
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__summary">${project.summary}</p>
      <span class="case-link">Open case study</span>
    `;
    card.addEventListener("click", () => setProject(project.id, true));
    return card;
  }

  function renderProjectRail(route) {
    projectRail.innerHTML = "";
    route.projectOrder.forEach((projectId) => {
      const project = PROJECTS[projectId];
      if (!project) return;
      projectRail.appendChild(createProjectCard(project, state.projectId === project.id));
    });
  }

  function renderProjectDetail(project) {
    projectDetailInner.innerHTML = `
      <div class="project-detail__top">
        <div>
          <div class="project-kicker">Selected case study</div>
          <h3 class="project-detail__title">${project.title}</h3>
          <p class="project-detail__summary">${project.summary}</p>
        </div>
        <div class="case-links">
          <a class="case-link" href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>
          <button class="case-link" type="button" data-open-modal="${project.id}">Open immersive view</button>
        </div>
      </div>

      <div class="case-grid">
        <section class="case-block">
          <h4>Problem</h4>
          <p>${project.problem}</p>
        </section>
        <section class="case-block">
          <h4>Challenge</h4>
          <p>${project.challenge}</p>
        </section>
        <section class="case-block">
          <h4>Process</h4>
          <ul>
            ${project.process.map((step) => `<li>${step}</li>`).join("")}
          </ul>
        </section>
        <section class="case-block">
          <h4>Architecture</h4>
          <ul>
            ${project.architecture.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </section>
      </div>

      <div class="shot-grid">
        ${project.screenshots
          .map(
            (shot) => `
              <div class="shot-card">
                <div class="shot-card__label">${shot.label}</div>
                <div class="shot-card__body">${shot.body}</div>
              </div>
            `
          )
          .join("")}
      </div>

      <div class="case-grid">
        <section class="case-block">
          <h4>Tech stack</h4>
          <div class="project-card__meta">
            ${project.stack.map((item) => `<span class="chip">${item}</span>`).join("")}
          </div>
        </section>
        <section class="case-block">
          <h4>Lessons learned</h4>
          <ul>
            ${project.lessons.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </section>
      </div>

      <section class="case-block">
        <h4>Results</h4>
        <ul>
          ${project.results.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>
    `;

    const openModalButton = projectDetailInner.querySelector("[data-open-modal]");
    if (openModalButton) {
      openModalButton.addEventListener("click", () => openCaseModal(project.id));
    }
  }

  function renderProjects(route) {
    renderProjectRail(route);
    const project = PROJECTS[state.projectId] || PROJECTS[route.projectOrder[0]];
    if (!route.projectOrder.includes(state.projectId)) {
      state.projectId = route.projectOrder[0];
    }
    renderProjectDetail(PROJECTS[state.projectId]);
    markActiveProject();
  }

  function markActiveProject() {
    projectRail.querySelectorAll(".project-card").forEach((card) => {
      card.classList.toggle("is-active", card.dataset.project === state.projectId);
    });
  }

  function renderPaletteResults(items) {
    paletteResults.innerHTML = "";
    items.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "palette-result";
      button.innerHTML = `
        <div class="palette-result__title">${item.title}</div>
        <div class="palette-result__body">${item.body}</div>
      `;
      button.addEventListener("click", () => {
        item.run();
        closePalette();
      });
      if (index === 0) button.classList.add("is-active");
      paletteResults.appendChild(button);
    });
  }

  function updatePaletteResults() {
    const query = state.paletteQuery.trim().toLowerCase();
    const filtered = commands.filter((command) => {
      const haystack = `${command.title} ${command.body}`.toLowerCase();
      return !query || haystack.includes(query);
    });
    renderPaletteResults(filtered);
  }

  function openPalette() {
    state.paletteOpen = true;
    paletteBackdrop.hidden = false;
    paletteInput.value = state.paletteQuery;
    updatePaletteResults();
    requestAnimationFrame(() => paletteInput.focus());
  }

  function closePalette() {
    state.paletteOpen = false;
    paletteBackdrop.hidden = true;
    state.paletteQuery = "";
    paletteInput.value = "";
  }

  function openCaseModal(projectId) {
    const project = PROJECTS[projectId];
    if (!project) return;

    caseModalTitle.textContent = project.title;
    caseModalBody.innerHTML = `
      <div class="case-grid">
        <section class="case-block">
          <h4>Problem</h4>
          <p>${project.problem}</p>
        </section>
        <section class="case-block">
          <h4>Challenge</h4>
          <p>${project.challenge}</p>
        </section>
      </div>
      <div class="shot-grid">
        ${project.screenshots
          .map(
            (shot) => `
              <div class="shot-card">
                <div class="shot-card__label">${shot.label}</div>
                <div class="shot-card__body">${shot.body}</div>
              </div>
            `
          )
          .join("")}
      </div>
      <div class="case-grid">
        <section class="case-block">
          <h4>Process</h4>
          <ul>${project.process.map((item) => `<li>${item}</li>`).join("")}</ul>
        </section>
        <section class="case-block">
          <h4>Architecture</h4>
          <ul>${project.architecture.map((item) => `<li>${item}</li>`).join("")}</ul>
        </section>
      </div>
      <div class="case-grid">
        <section class="case-block">
          <h4>Tech stack</h4>
          <div class="project-card__meta">${project.stack.map((item) => `<span class="chip">${item}</span>`).join("")}</div>
        </section>
        <section class="case-block">
          <h4>Lessons learned</h4>
          <ul>${project.lessons.map((item) => `<li>${item}</li>`).join("")}</ul>
        </section>
      </div>
      <section class="case-block">
        <h4>Results</h4>
        <ul>${project.results.map((item) => `<li>${item}</li>`).join("")}</ul>
      </section>
      <div class="case-links">
        <a class="case-link" href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>
        <button class="case-link" type="button" data-close-modal>Close</button>
      </div>
    `;

    const closeButton = caseModalBody.querySelector("[data-close-modal]");
    if (closeButton) {
      closeButton.addEventListener("click", closeCaseModal);
    }

    if (typeof caseModal.showModal === "function") {
      caseModal.showModal();
    } else {
      caseModal.setAttribute("open", "");
    }
  }

  function closeCaseModal() {
    if (typeof caseModal.close === "function" && caseModal.open) {
      caseModal.close();
    } else {
      caseModal.removeAttribute("open");
    }
  }

  function updateHeroCopy(route) {
    briefingBadge.textContent = route.badge;
    briefingTitle.textContent = route.title;
    briefingSummary.textContent = route.summary;
    heroLead.textContent = route.proof;
    contactCopy.textContent = route.proof;
    contactSubject.value = route.eyebrow;
    contactMessage.value = `Hi Juraij, I need help with ${route.eyebrow.toLowerCase()}.`;

    root.style.setProperty("--accent", route.accent);
    root.style.setProperty("--accent-rgb", route.accentRgb);
    root.style.setProperty("--accent-2", route.accent2);
    root.style.setProperty("--accent-2-rgb", route.accent2Rgb);

    document.title = `Juraij A. Dimapalao | ${route.eyebrow}`;
    const themeColor = route.id === "automation" ? "#111014" : "#0b0d12";
    document.querySelector('meta[name="theme-color"]').setAttribute("content", themeColor);
  }

  function setRoute(routeId, shouldToast = false) {
    const route = ROUTES[routeId];
    if (!route) return;

    state.routeId = routeId;
    state.projectId = route.projectOrder[0];
    root.dataset.route = routeId;
    updateHeroCopy(route);
    renderRouteCards();
    renderJourney(route);
    renderProof(route);
    renderSignals(route);
    renderSkills(route);
    renderTimeline(route);
    renderProjects(route);

    routeGrid.querySelectorAll(".route-card").forEach((card) => {
      card.classList.toggle("is-active", card.dataset.route === routeId);
    });

    if (shouldToast) {
      showToast(`${route.eyebrow} selected`);
    }
  }

  function renderInitialShell() {
    renderRouteCards();
    renderPaletteResults(commands);
    setRoute(state.routeId);
    setTheme(state.theme);
    setProject(state.projectId);
  }

  function setProject(projectId, shouldToast = false) {
    const project = PROJECTS[projectId];
    if (!project) return;
    state.projectId = projectId;
    renderProjects(ROUTES[state.routeId]);
    markActiveProject();
    if (shouldToast) {
      showToast(`Opened ${project.title}`);
    }
  }

  function attachRevealObserver() {
    const elements = Array.from(document.querySelectorAll(".reveal"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14 }
    );

    elements.forEach((element) => observer.observe(element));
  }

  function setupPalette() {
    paletteOpen.addEventListener("click", openPalette);
    paletteClose.addEventListener("click", closePalette);
    paletteBackdrop.addEventListener("click", (event) => {
      if (event.target === paletteBackdrop) closePalette();
    });
    paletteInput.addEventListener("input", () => {
      state.paletteQuery = paletteInput.value;
      updatePaletteResults();
    });
    paletteInput.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      const firstResult = paletteResults.querySelector(".palette-result");
      if (firstResult) {
        event.preventDefault();
        firstResult.click();
      }
    });
    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (state.paletteOpen) closePalette();
        else openPalette();
      }
      if (event.key === "Escape") {
        if (state.paletteOpen) closePalette();
        if (caseModal.open) closeCaseModal();
      }
    });
  }

  function setupThemeToggle() {
    themeToggle.addEventListener("click", toggleTheme);
  }

  function setupContactForm() {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const subject = String(formData.get("subject") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const mailSubject = encodeURIComponent(`${subject} | ${name}`);
      const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:juraijd12@gmail.com?subject=${mailSubject}&body=${mailBody}`;
      showToast("Opening your email client");
    });
  }

  function setupProjectModalEvents() {
    caseModalClose.addEventListener("click", closeCaseModal);
    caseModal.addEventListener("click", (event) => {
      const rect = caseModal.getBoundingClientRect();
      const clickedInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!clickedInside) closeCaseModal();
    });
    projectDetailInner.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const projectId = target.getAttribute("data-open-modal");
      if (!projectId) return;
      openCaseModal(projectId);
    });
  }

  function setupHashNavigation() {
    const hash = window.location.hash.replace("#", "");
    if (ROUTES[hash]) {
      state.routeId = hash;
    }
  }

  function bindGlobalActions() {
    body.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const command = target.closest("[data-command]");
      if (command) {
        const index = Number(command.getAttribute("data-command"));
        const item = commands[index];
        if (item) {
          item.run();
          closePalette();
        }
      }
    });
  }

  function init() {
    setupHashNavigation();
    renderInitialShell();
    setupThemeToggle();
    setupPalette();
    setupContactForm();
    setupProjectModalEvents();
    bindGlobalActions();
    attachRevealObserver();
    setTheme(state.theme, false);
  }

  init();
})();
