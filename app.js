const projects = [
  {
    id: "tri-ledger",
    name: "TriLedger",
    description: "Personal finance tracker focused on clarity across accounts and categories.",
    status: "Active",
    priority: "High",
    riskLevel: "Medium",
    nextAction: "Sketch data model for transactions and categories.",
    notes: "Good candidate for a later SQLite or local-first experiment."
  },
  {
    id: "ai-trello",
    name: "AI-maintained Trello Board",
    description: "Board where an agent suggests moves, labels, and stale-card cleanup.",
    status: "Idea",
    priority: "Medium",
    riskLevel: "High",
    nextAction: "List minimum API calls and safety rules before any automation.",
    notes: "Keep human approval in the loop for the first version."
  },
  {
    id: "smappee",
    name: "Smappee Charging Controller",
    description: "Integrate home EV charging with Smappee energy insights.",
    status: "Waiting",
    priority: "Medium",
    riskLevel: "Medium",
    nextAction: "Confirm API or integration options from Smappee docs.",
    notes: "Blocked on hardware access and API clarity."
  },
  {
    id: "car-history",
    name: "Personal Car History App",
    description: "Log maintenance, fuel, and costs per vehicle over time.",
    status: "Paused",
    priority: "Low",
    riskLevel: "Low",
    nextAction: "Resume when TriLedger patterns are reusable.",
    notes: "Share UI patterns with TriLedger where possible."
  },
  {
    id: "landing-page",
    name: "Static Landing Page Experiment",
    description: "Practice layout, typography, and deploy pipeline with one page.",
    status: "Active",
    priority: "Low",
    riskLevel: "Low",
    nextAction: "Pick one hero layout and deploy to GitHub Pages.",
    notes: "Use this repo flow as the deployment learning path."
  }
];

const dashboard = document.getElementById("dashboard");
const filterStatus = document.getElementById("filter-status");
const filterPriority = document.getElementById("filter-priority");
const searchInput = document.getElementById("search");
const resultsSummary = document.getElementById("results-summary");
const emptyState = document.getElementById("empty-state");

function statusClass(status) {
  const map = {
    Active: "active",
    Paused: "paused",
    Idea: "idea",
    Waiting: "waiting"
  };
  return map[status] || "waiting";
}

function priorityClass(priority) {
  return "priority-" + priority.toLowerCase();
}

function riskClass(risk) {
  return "risk-" + risk.toLowerCase();
}

function matchesSearch(project, query) {
  if (!query) return true;
  const haystack = [project.name, project.description, project.notes]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function getFilteredProjects() {
  const status = filterStatus.value;
  const priority = filterPriority.value;
  const query = searchInput.value.trim().toLowerCase();

  return projects.filter(function (project) {
    if (status !== "all" && project.status !== status) return false;
    if (priority !== "all" && project.priority !== priority) return false;
    if (!matchesSearch(project, query)) return false;
    return true;
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function createCard(project) {
  const sc = statusClass(project.status);
  const card = document.createElement("article");
  card.className = "card card--" + sc;
  card.setAttribute("data-status", project.status);

  card.innerHTML =
    '<div class="card-header">' +
      '<h2 class="card-title">' + escapeHtml(project.name) + "</h2>" +
      '<span class="badge badge--' + sc + '">' + escapeHtml(project.status) + "</span>" +
    "</div>" +
    '<p class="card-description">' + escapeHtml(project.description) + "</p>" +
    '<div class="meta-row">' +
      '<span class="pill pill--' + priorityClass(project.priority) + '">Priority: ' +
        escapeHtml(project.priority) + "</span>" +
      '<span class="pill pill--' + riskClass(project.riskLevel) + '">Risk: ' +
        escapeHtml(project.riskLevel) + "</span>" +
    "</div>" +
    '<p class="card-section"><strong>Next action</strong>' +
      escapeHtml(project.nextAction) + "</p>" +
    '<p class="card-notes"><strong>Notes</strong>' + escapeHtml(project.notes) + "</p>";

  return card;
}

function render(list) {
  dashboard.innerHTML = "";
  list.forEach(function (project) {
    dashboard.appendChild(createCard(project));
  });

  const total = projects.length;
  const shown = list.length;
  resultsSummary.textContent =
    shown === total
      ? "Showing all " + total + " projects."
      : "Showing " + shown + " of " + total + " projects.";

  emptyState.hidden = shown > 0;
  dashboard.hidden = shown === 0;
}

function onFiltersChange() {
  render(getFilteredProjects());
}

filterStatus.addEventListener("change", onFiltersChange);
filterPriority.addEventListener("change", onFiltersChange);
searchInput.addEventListener("input", onFiltersChange);

render(projects);
