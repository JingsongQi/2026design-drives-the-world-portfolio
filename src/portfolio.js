import { projects, places, journeyStops } from "./content.js";

const hero = document.querySelector(".hero");
const projectTrigger = document.querySelector("#project-trigger");
const homeControls = document.querySelector(".home-controls");
const pageControls = document.querySelector(".page-controls");
const morphSurface = document.querySelector(".project-morph");
const views = {
  projects: document.querySelector("#project-view"),
  project: document.querySelector("#detail-view"),
  resume: document.querySelector("#about-view"),
  journey: document.querySelector("#journey-view"),
};
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const scrollPositions = new Map();
let currentRoute = "";
let currentView = "home";
let transition;
let globeLoading;
let returnRoute = "#projects";
let inputLockedUntil = 0;

export function isGlobeVisible() {
  return currentView === "home" || Boolean(transition);
}

export function openJourneyAt(placeId) {
  navigate(`#journey/${placeId}`);
}

function navigate(hash) {
  if (transition && window.location.hash === hash) return;
  if (window.location.hash === hash) showRoute();
  else window.location.hash = hash;
}

function lockInput(duration) {
  inputLockedUntil = Math.max(inputLockedUntil, performance.now() + duration);
}

function ensureGlobe() {
  if (!globeLoading) {
    globeLoading = import("./main.js?v=uniform-project-cards").catch((error) => {
      hero.classList.add("globe-unavailable");
      document.body.classList.add("globe-fallback");
      console.warn("The globe could not start; portfolio navigation remains available.", error);
    });
  }
  return globeLoading;
}

function returnHome() {
  if (!transition && currentView === "projects") navigate("#");
}

function clearTransition() {
  const previous = transition;
  transition = null;
  previous?.animations.forEach((animation) => animation.cancel());
  morphSurface.hidden = true;
  delete document.body.dataset.morph;
}

function morphProjects(opening) {
  // Only this empty surface scales. The gallery and its images stay at their native size.
  const rect = projectTrigger.getBoundingClientRect();
  const scaleX = rect.width / window.innerWidth;
  const scaleY = rect.height / window.innerHeight;
  const cardColor = getComputedStyle(projectTrigger).backgroundColor;
  const full = { transform: "translate3d(0, 0, 0) scale(1, 1)", borderRadius: "0px", backgroundColor: "#fff" };
  const options = { duration: 760, direction: opening ? "normal" : "reverse", fill: "both" };
  const active = { animations: [] };
  transition = active;
  document.body.dataset.morph = opening ? "opening" : "closing";
  morphSurface.hidden = false;
  views.projects.hidden = false;
  views.projects.classList.add("is-open");
  views.projects.inert = true;
  pageControls.hidden = false;
  pageControls.inert = true;
  homeControls.inert = true;
  hero.inert = true;

  active.animations.push(morphSurface.animate([
    {
      offset: 0,
      transform: `translate3d(${rect.left}px, ${rect.top}px, 0) scale(${scaleX}, ${scaleY})`,
      borderRadius: `${8 / scaleX}px / ${8 / scaleY}px`,
      backgroundColor: cardColor,
      easing: "cubic-bezier(.65, 0, .35, 1)",
    },
    { offset: 0.75, ...full },
    { offset: 1, ...full },
  ], options));

  active.animations.push(hero.animate([
    {
      opacity: 1,
      transform: "translate3d(0, 0, 0) scale(1)",
      easing: "cubic-bezier(.65, 0, .35, 1)",
    },
    {
      opacity: 0.18,
      transform: "translate3d(0, -2.5vh, 0) scale(.9)",
    },
  ], options));

  active.animations.push(homeControls.animate([
    { opacity: 1, easing: "cubic-bezier(.65, 0, .35, 1)" },
    { opacity: 0 },
  ], options));

  for (const element of [views.projects, pageControls]) {
    active.animations.push(element.animate([
      { offset: 0, opacity: 0 },
      { offset: 0.75, opacity: 0, easing: "ease-out" },
      { offset: 1, opacity: 1 },
    ], options));
  }

  Promise.all(active.animations.map((animation) => animation.finished)).then(() => {
    if (transition !== active) return;
    // Settle visibility before removing the held animation frame to avoid a one-frame flash.
    views.projects.hidden = !opening;
    views.projects.inert = !opening;
    views.projects.classList.toggle("is-open", opening);
    pageControls.hidden = !opening;
    pageControls.inert = !opening;
    homeControls.inert = opening;
    hero.inert = opening;
    clearTransition();
    lockInput(140);
    if (opening) focusPage(views.projects);
    else projectTrigger.focus({ preventScroll: true });
  }).catch(() => {});
}

function renderProjects() {
  const grid = document.querySelector("#project-grid");
  projects.forEach((project, index) => {
    const card = document.createElement("a");
    card.className = "project-tile project-tile--template";
    card.href = `#project/${project.id}`;
    card.id = `project-${project.id}`;
    card.setAttribute("aria-label", project.title);
    const image = `<img src="${project.cover}" alt="${project.title}" loading="${index < 2 ? "eager" : "lazy"}" decoding="async" />`;
    const artwork = project.cardArtwork;
    if (artwork?.indexColor) card.style.setProperty("--project-index-color", artwork.indexColor);
    const cover = artwork ? `
      <div class="project-cover project-cover--cropped" style="background:${artwork.background}">
        <div class="project-artwork" style="--artwork-ratio:${artwork.width / artwork.height};--artwork-width:${artwork.sourceWidth / artwork.width * 100}%;--artwork-height:${artwork.sourceHeight / artwork.height * 100}%;--artwork-left:${-artwork.x / artwork.width * 100}%;--artwork-top:${-artwork.y / artwork.height * 100}%">${image}</div>
      </div>` : `<div class="project-cover">${image}</div>`;
    const context = project.client ? { label: "Design For", value: project.client } : project.cardContext;
    const client = project.clientLogo
      ? `<span class="project-client-logo"><img src="${project.clientLogo}" alt="${project.client}" /></span>`
      : `<span>${context.value}</span>`;
    card.innerHTML = `
        ${cover}
        <div class="project-info">
          <time class="project-template-date">${project.cardDate || project.year}</time>
          <div class="project-model">
            <h3>${project.cardTitle || project.title}</h3>
            <p>${project.cardSubtitle || project.output}</p>
          </div>
          <div class="project-template-footer">
            <p class="project-commission"><span>${context.label}</span>${client}</p>
            <div class="project-designers">
              <span class="project-designers-label">Designer :</span>
              <div class="project-designer-names">${project.designers.map((name) => `<span>${name}</span>`).join("")}</div>
            </div>
          </div>
        </div>
        <span class="project-template-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>`;
    grid.append(card);
  });
  document.fonts.ready.then(() => {
    const context = document.createElement("canvas").getContext("2d");
    context.font = `700 100px ${getComputedStyle(grid).getPropertyValue("--font-display")}`;
    grid.querySelectorAll(".project-model h3").forEach((heading) => {
      const size = Math.min(8.4, 2450 / context.measureText(heading.textContent).width);
      heading.style.setProperty("--project-title-size", `${size}cqw`);
    });
  });
}

function renderJourney() {
  const timeline = document.querySelector("#journey-timeline");
  journeyStops.forEach((stop, index) => {
    const chapter = document.createElement("section");
    chapter.className = "journey-chapter";
    chapter.dataset.place = stop.placeId;
    chapter.innerHTML = `
      <span class="journey-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="journey-node" aria-hidden="true"></span>
      <div class="journey-content">
        <span class="journey-city">${stop.city}</span>
        <h3>${stop.title}</h3>
        <span class="journey-phase">${stop.phase}</span>
        <p>${stop.description}</p>
      </div>`;
    timeline.append(chapter);
  });
}

function renderProject(project) {
  document.querySelector("#detail-year").textContent = "Selected work";
  document.querySelector("#detail-title").textContent = project.title;
  document.querySelector("#detail-description").textContent = project.description;
  document.querySelector("#detail-role").textContent = project.role;
  document.querySelector("#detail-output").textContent = project.output;
  const sourceLink = document.querySelector("#detail-source");
  sourceLink.hidden = !project.sourceUrl;
  if (project.sourceUrl) sourceLink.href = project.sourceUrl;
  document.querySelector("#detail-tags").replaceChildren(...project.tags.map((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    return span;
  }));
  const cover = document.querySelector("#detail-image");
  cover.src = project.cover;
  cover.alt = project.title;
  document.querySelector("#case-gallery").replaceChildren(...project.gallery.slice(1).map((source, index) => {
    const figure = document.createElement("figure");
    figure.className = "case-gallery-item";
    const image = document.createElement("img");
    image.src = source;
    image.alt = `${project.title}, detail ${index + 1}`;
    image.loading = "lazy";
    figure.append(image);
    return figure;
  }));
  const index = projects.indexOf(project);
  for (const [direction, offset] of [["prev", -1], ["next", 1]]) {
    const neighbor = projects[(index + offset + projects.length) % projects.length];
    document.querySelector(`#${direction}-project`).href = `#project/${neighbor.id}`;
    document.querySelector(`#${direction}-project-title`).textContent = neighbor.title;
  }
}

function readRoute() {
  const hash = window.location.hash.slice(1);
  const [name, id] = hash.split("/");
  if (name === "projects") return { view: "projects" };
  if (name === "about" || name === "resume") return { view: "resume" };
  if (name === "journey") return { view: "journey", id };
  if (name === "project") {
    const project = projects.find((item) => item.id === id);
    return project ? { view: "project", project } : { view: "projects" };
  }
  // Keep previously shared city URLs useful, but route them to the journey.
  if (places.some((place) => place.id === name)) return { view: "journey", id: name };
  return { view: "home" };
}

function focusPage(view) {
  const heading = view.querySelector("h2");
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}

function showRoute({ initial = false } = {}) {
  const route = readRoute();
  const previousView = currentView;
  const previousPage = views[previousView];
  if (previousPage) scrollPositions.set(currentRoute, previousPage.scrollTop);
  clearTransition();
  const morph = !initial && !reducedMotion.matches && (
    (previousView === "home" && route.view === "projects") ||
    (previousView === "projects" && route.view === "home")
  );
  if (["resume", "journey"].includes(route.view) && !["resume", "journey"].includes(previousView)) {
    returnRoute = previousView === "home" ? "#" : "#projects";
  }
  currentView = route.view;
  currentRoute = window.location.hash;
  document.body.dataset.view = currentView;
  hero.inert = currentView !== "home";
  hero.setAttribute("aria-hidden", String(currentView !== "home"));
  homeControls.inert = currentView !== "home";
  homeControls.setAttribute("aria-hidden", String(currentView !== "home"));
  pageControls.hidden = currentView === "home";
  pageControls.inert = currentView === "home";
  for (const [name, page] of Object.entries(views)) {
    const active = name === currentView;
    page.hidden = !active;
    page.inert = !active;
    page.classList.toggle("is-open", active);
    page.setAttribute("aria-hidden", String(!active));
  }
  for (const [name, id] of [["resume", "about-trigger"], ["journey", "journey-trigger"]]) {
    for (const button of [document.getElementById(id), pageControls.querySelector(`[data-route="${name}"]`)]) {
      if (currentView === name) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    }
  }
  if (route.project) renderProject(route.project);
  const titles = { home: "Design Journey", projects: "Projects", resume: "Resume", journey: "My Journey" };
  document.title = `${route.project?.title || titles[currentView]} | Jingsong Qi`;
  const page = views[currentView];
  if (page) {
    page.scrollTop = morph ? 0 : scrollPositions.get(currentRoute) || 0;
    if (route.view === "journey" && route.id) {
      const chapter = [...page.querySelectorAll(".journey-chapter")].find((item) => item.dataset.place === route.id);
      chapter?.scrollIntoView({ block: "center", behavior: "instant" });
    }
    if (!initial && !morph) focusPage(page);
  } else {
    ensureGlobe();
    if (!initial && !morph) projectTrigger.focus({ preventScroll: true });
  }
  if (morph) morphProjects(currentView === "projects");
}

projectTrigger.addEventListener("click", () => navigate("#projects"));
document.querySelector("#about-trigger").addEventListener("click", () => navigate("#resume"));
document.querySelector("#journey-trigger").addEventListener("click", () => navigate("#journey"));
pageControls.querySelectorAll("[data-route]").forEach((button) => {
  button.addEventListener("click", () => navigate(`#${button.dataset.route}`));
});
window.addEventListener("hashchange", () => showRoute());
window.addEventListener("resize", () => {
  if (transition) showRoute({ initial: true });
});
reducedMotion.addEventListener("change", () => {
  if (transition) showRoute({ initial: true });
});

let wheelDistance = 0;
let wheelTime = 0;
window.addEventListener("wheel", (event) => {
  if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
  const now = performance.now();
  if (transition || now < inputLockedUntil) {
    event.preventDefault();
    wheelDistance = 0;
    wheelTime = now;
    lockInput(140);
    return;
  }
  if (now - wheelTime > 220) wheelDistance = 0;
  wheelTime = now;
  const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
  if (currentView === "home" && delta > 0) {
    event.preventDefault();
    wheelDistance = Math.max(0, wheelDistance) + delta;
  } else if (currentView === "projects" && views.projects.scrollTop <= 1 && delta < 0) {
    event.preventDefault();
    wheelDistance = Math.min(0, wheelDistance) + delta;
  } else {
    wheelDistance = 0;
    return;
  }
  if (wheelDistance >= 64) {
    wheelDistance = 0;
    navigate("#projects");
  } else if (wheelDistance <= -64) {
    wheelDistance = 0;
    returnHome();
  }
}, { passive: false });

let touchStart;
hero.addEventListener("touchstart", (event) => {
  const touch = event.touches[0];
  touchStart = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
}, { passive: true });
hero.addEventListener("touchend", (event) => {
  const touch = event.changedTouches[0];
  if (touchStart && currentView === "home" && !transition) {
    const dy = touchStart.y - touch.clientY;
    if (dy > 70 && dy > Math.abs(touch.clientX - touchStart.x) * 1.3) navigate("#projects");
  }
  touchStart = null;
}, { passive: true });
hero.addEventListener("touchcancel", () => { touchStart = null; }, { passive: true });

views.projects.addEventListener("touchstart", (event) => {
  const touch = event.touches[0];
  touchStart = event.touches.length === 1 && views.projects.scrollTop <= 1
    ? { x: touch.clientX, y: touch.clientY }
    : null;
}, { passive: true });
views.projects.addEventListener("touchend", (event) => {
  const touch = event.changedTouches[0];
  if (touchStart && !transition && currentView === "projects" && views.projects.scrollTop <= 1) {
    const pullDown = touch.clientY - touchStart.y;
    if (pullDown > 70 && pullDown > Math.abs(touch.clientX - touchStart.x) * 1.3) returnHome();
  }
  touchStart = null;
}, { passive: true });
views.projects.addEventListener("touchcancel", () => { touchStart = null; }, { passive: true });

window.addEventListener("keydown", (event) => {
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
  if (transition && ["Escape", "PageUp", "ArrowUp", "PageDown", "ArrowDown", " "].includes(event.key)) {
    event.preventDefault();
    return;
  }
  if (event.key === "Escape" && !isGlobeVisible()) {
    event.preventDefault();
    navigate(currentView === "project" ? "#projects" : currentView === "projects" ? "#" : returnRoute);
  }
  if (currentView === "projects" && views.projects.scrollTop <= 1 && ["PageUp", "ArrowUp"].includes(event.key) &&
      !event.target.closest("button, a, input, textarea, select, [contenteditable]")) {
    event.preventDefault();
    returnHome();
  }
  if (isGlobeVisible() && ["PageDown", "ArrowDown", " "].includes(event.key) &&
      !event.target.closest("button, a, input, textarea, select, [contenteditable]")) {
    event.preventDefault();
    navigate("#projects");
  }
});

renderProjects();
renderJourney();
showRoute({ initial: true });
// Prepare the globe even when a visitor lands directly on a project route.
ensureGlobe();
