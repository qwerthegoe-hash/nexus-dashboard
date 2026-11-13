const root = document.documentElement;

const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector(".theme-icon");

function setTheme(theme) {
  root.dataset.theme = theme;
  themeIcon.textContent = theme === "dark" ? "☼" : "☾";
  localStorage.setItem("nexus-theme", theme);
}

const savedTheme = localStorage.getItem("nexus-theme") || "dark";
setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(next);
});


/* =========================
   MOBILE SIDEBAR
========================= */

const sidebar = document.querySelector("#sidebar");
const mobileMenu = document.querySelector("#mobileMenu");
const mobileOverlay = document.querySelector("#mobileOverlay");

function openSidebar() {
  sidebar.classList.add("open");
  mobileOverlay.classList.add("show");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  mobileOverlay.classList.remove("show");
}

mobileMenu.addEventListener("click", openSidebar);
mobileOverlay.addEventListener("click", closeSidebar);


/* =========================
   SIDEBAR VIEWS
========================= */

const workspaceViewButtons = document.querySelectorAll(".side-link[data-view]");
const dashboardSections = document.querySelectorAll(
  ".overview-header, .metric-grid, .dashboard-grid, .lower-grid"
);

const viewData = {
  overview: {
    eyebrow: "DASHBOARD",
    pageTitle: "Good evening, Alex.",
    title: "Performance overview",
    description: "Track revenue, users and growth across your workspace.",
    badge: "Overview mode",
    metrics: [
      ["Total revenue", "$84,240"],
      ["Active users", "12,840"],
      ["Conversion rate", "6.42%"],
      ["Avg. order value", "$126.40"]
    ],
    mainKicker: "REVENUE",
    mainTitle: "Revenue growth",
    mainDescription: "Income performance across the selected period.",
    sideKicker: "ACQUISITION",
    sideTitle: "Traffic channels",
    activityKicker: "ACTIVITY",
    activityTitle: "Recent transactions",
    goalsKicker: "GOALS",
    goalsTitle: "Monthly targets"
  },

  analytics: {
    eyebrow: "ANALYTICS",
    pageTitle: "Analytics workspace.",
    title: "Growth analytics",
    description: "Explore audience performance, conversion and acquisition trends.",
    badge: "Analytics mode",
    metrics: [
      ["Tracked sessions", "48,240"],
      ["Engaged users", "18,906"],
      ["Conversion rate", "7.18%"],
      ["Session value", "$9.84"]
    ],
    mainKicker: "PERFORMANCE",
    mainTitle: "Growth trend",
    mainDescription: "Engagement and revenue signals across the selected period.",
    sideKicker: "CHANNEL MIX",
    sideTitle: "Acquisition sources",
    activityKicker: "EVENT STREAM",
    activityTitle: "Latest conversions",
    goalsKicker: "FORECAST",
    goalsTitle: "Growth targets"
  },

  customers: {
    eyebrow: "CUSTOMERS",
    pageTitle: "Customer intelligence.",
    title: "Customer overview",
    description: "Monitor customer growth, retention and high-value accounts.",
    badge: "Customers mode",
    metrics: [
      ["Total customers", "12,840"],
      ["New this month", "248"],
      ["Retention", "88.4%"],
      ["Customer value", "$612"]
    ],
    mainKicker: "RETENTION",
    mainTitle: "Customer growth",
    mainDescription: "Customer acquisition and retention performance over time.",
    sideKicker: "SEGMENTS",
    sideTitle: "Customer channels",
    activityKicker: "CUSTOMERS",
    activityTitle: "Recent customer activity",
    goalsKicker: "RETENTION",
    goalsTitle: "Customer targets"
  },

  projects: {
    eyebrow: "PROJECTS",
    pageTitle: "Project command center.",
    title: "Project performance",
    description: "See delivery status, team activity and project health in one place.",
    badge: "Projects mode",
    metrics: [
      ["Active projects", "24"],
      ["Completed", "86"],
      ["On-time rate", "94.2%"],
      ["Team utilization", "78%"]
    ],
    mainKicker: "DELIVERY",
    mainTitle: "Project velocity",
    mainDescription: "Completed work and delivery pace across active projects.",
    sideKicker: "WORKLOAD",
    sideTitle: "Project distribution",
    activityKicker: "PROJECT LOG",
    activityTitle: "Recent project activity",
    goalsKicker: "DELIVERY",
    goalsTitle: "Project targets"
  },

  reports: {
    eyebrow: "REPORTS",
    pageTitle: "Reporting center.",
    title: "Report performance",
    description: "Review generated reports, exports and executive summaries.",
    badge: "Reports mode",
    metrics: [
      ["Reports created", "126"],
      ["Exports", "392"],
      ["Scheduled reports", "18"],
      ["Automation rate", "72%"]
    ],
    mainKicker: "REPORTING",
    mainTitle: "Report generation",
    mainDescription: "Reporting volume and export activity across the selected period.",
    sideKicker: "FORMATS",
    sideTitle: "Report distribution",
    activityKicker: "EXPORTS",
    activityTitle: "Recent report activity",
    goalsKicker: "AUTOMATION",
    goalsTitle: "Reporting targets"
  }
};

function applyView(viewName) {
  const data = viewData[viewName];
  if (!data) return;

  document.querySelector("#pageEyebrow").textContent = data.eyebrow;
  document.querySelector("#pageTitle").textContent = data.pageTitle;
  document.querySelector("#sectionTitle").textContent = data.title;
  document.querySelector("#sectionDescription").textContent = data.description;
  document.querySelector("#viewModeBadge").lastChild.textContent = ` ${data.badge}`;

  data.metrics.forEach((metric, index) => {
    document.querySelector(`#metricLabel${index + 1}`).textContent = metric[0];

    const valueSelectors = [
      "#revenueValue",
      "#usersValue",
      "#conversionValue",
      "#orderValue"
    ];

    document.querySelector(valueSelectors[index]).textContent = metric[1];
  });

  document.querySelector("#mainPanelKicker").textContent = data.mainKicker;
  document.querySelector("#mainPanelTitle").textContent = data.mainTitle;
  document.querySelector("#mainPanelDescription").textContent = data.mainDescription;
  document.querySelector("#sidePanelKicker").textContent = data.sideKicker;
  document.querySelector("#sidePanelTitle").textContent = data.sideTitle;
  document.querySelector("#activityKicker").textContent = data.activityKicker;
  document.querySelector("#activityTitle").textContent = data.activityTitle;
  document.querySelector("#goalsKicker").textContent = data.goalsKicker;
  document.querySelector("#goalsTitle").textContent = data.goalsTitle;

  dashboardSections.forEach(section => {
    section.classList.remove("dashboard-view-transition");
    void section.offsetWidth;
    section.classList.add("dashboard-view-transition");
  });

  showToast(
    `${data.eyebrow} opened`,
    "The dashboard content changed — this navigation is fully interactive."
  );
}

workspaceViewButtons.forEach(button => {
  button.addEventListener("click", () => {
    workspaceViewButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    button.classList.remove("switching");
    void button.offsetWidth;
    button.classList.add("switching");

    applyView(button.dataset.view);

    if (window.innerWidth <= 940) {
      closeSidebar();
    }
  });
});


/* =========================
   PORTFOLIO DEMO ACTIONS
========================= */

const toast = document.querySelector("#demoToast");
const toastTitle = document.querySelector("#toastTitle");
const toastText = document.querySelector("#toastText");
let toastTimer;

function showToast(title, message) {
  toastTitle.textContent = title;
  toastText.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

document.querySelector('[data-action="settings"]').addEventListener("click", () => {
  showToast(
    "Settings are connected",
    "Theme preferences and workspace controls are available in this demo."
  );
});

document.querySelector('[data-action="help"]').addEventListener("click", () => {
  showToast(
    "Help Center",
    "Interactive help actions can be connected to documentation or support."
  );
});

document.querySelector("#upgradeButton").addEventListener("click", () => {
  showToast(
    "Upgrade flow ready",
    "This button is active and ready for a real billing or pricing flow."
  );
});


/* =========================
   NOTIFICATIONS
========================= */

const notificationButton = document.querySelector("#notificationButton");
const notificationPanel = document.querySelector("#notificationPanel");
const notificationDot = document.querySelector(".notification-dot");
const markRead = document.querySelector("#markRead");

notificationButton.addEventListener("click", event => {
  event.stopPropagation();
  notificationPanel.classList.toggle("active");
});

notificationPanel.addEventListener("click", event => {
  event.stopPropagation();
});

document.addEventListener("click", () => {
  notificationPanel.classList.remove("active");
});

markRead.addEventListener("click", () => {
  notificationDot.style.display = "none";
  markRead.textContent = "All read";
});


/* =========================
   PERIOD SWITCH
========================= */

const periodButtons = document.querySelectorAll("#periodSwitch button");

const periodData = {
  7: {
    revenue: "$18,420",
    users: "3,280",
    conversion: "5.91%",
    order: "$121.80",
    chart: "$18,420"
  },
  30: {
    revenue: "$84,240",
    users: "12,840",
    conversion: "6.42%",
    order: "$126.40",
    chart: "$84,240"
  },
  90: {
    revenue: "$241,680",
    users: "38,410",
    conversion: "6.77%",
    order: "$129.10",
    chart: "$241,680"
  },
  365: {
    revenue: "$1.04M",
    users: "164K",
    conversion: "7.18%",
    order: "$132.80",
    chart: "$1.04M"
  }
};

periodButtons.forEach(button => {
  button.addEventListener("click", () => {
    periodButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    const data = periodData[button.dataset.period];

    document.querySelector("#revenueValue").textContent = data.revenue;
    document.querySelector("#usersValue").textContent = data.users;
    document.querySelector("#conversionValue").textContent = data.conversion;
    document.querySelector("#orderValue").textContent = data.order;
    document.querySelector("#chartRevenue").textContent = data.chart;

    pulseMetrics();
  });
});

function pulseMetrics() {
  document.querySelectorAll(".metric-value-row strong, #chartRevenue").forEach(item => {
    item.animate(
      [
        { opacity: .35, transform: "translateY(3px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      {
        duration: 320,
        easing: "ease-out"
      }
    );
  });
}


/* =========================
   TABLE FILTER
========================= */

const tableSearch = document.querySelector("#tableSearch");
const globalSearch = document.querySelector("#globalSearch");
const rows = [...document.querySelectorAll("#transactionBody tr")];
const emptyState = document.querySelector("#emptyState");

function filterRows(value) {
  const query = value.trim().toLowerCase();
  let visible = 0;

  rows.forEach(row => {
    const match = row.dataset.search.includes(query);
    row.style.display = match ? "" : "none";

    if (match) visible++;
  });

  emptyState.classList.toggle("show", visible === 0);
}

tableSearch.addEventListener("input", event => {
  filterRows(event.target.value);
});

globalSearch.addEventListener("input", event => {
  tableSearch.value = event.target.value;
  filterRows(event.target.value);

  if (event.target.value.trim()) {
    document.querySelector(".activity-panel").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
});


/* Keyboard shortcut */

document.addEventListener("keydown", event => {
  const key = event.key.toLowerCase();

  if ((event.ctrlKey || event.metaKey) && key === "k") {
    event.preventDefault();
    globalSearch.focus();
  }
});


/* =========================
   REPORT MODAL
========================= */

const reportModal = document.querySelector("#reportModal");
const newReportButton = document.querySelector("#newReportButton");
const reportClose = document.querySelector("#reportClose");
const reportOverlay = document.querySelector("#reportOverlay");
const reportForm = document.querySelector("#reportForm");
const reportMessage = document.querySelector("#reportMessage");

function openReportModal() {
  reportModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeReportModal() {
  reportModal.classList.remove("active");
  document.body.style.overflow = "";
}

newReportButton.addEventListener("click", openReportModal);
reportClose.addEventListener("click", closeReportModal);
reportOverlay.addEventListener("click", closeReportModal);

reportForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.querySelector("#reportName").value.trim();

  reportMessage.textContent =
    `"${name}" was generated successfully as a portfolio demo.`;

  showToast("Report generated", `"${name}" is ready in the demo workspace.`);

  reportForm.reset();
});


/* =========================
   ESC CLOSE
========================= */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeReportModal();
    notificationPanel.classList.remove("active");
    closeSidebar();
  }
});


/* =========================
   SMALL INTERACTION
========================= */

document.querySelectorAll(".metric-card, .panel").forEach(card => {
  card.addEventListener("mousemove", event => {
    const rect = card.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.backgroundImage =
      `radial-gradient(circle at ${x}% ${y}%, rgba(124,92,255,.06), transparent 28%)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.backgroundImage = "";
  });
});
