import * as THREE from "three";

const places = [
  {
    id: "hengshui",
    city: "Hengshui",
    label: "Hengshui",
    coords: [37.7353, 115.6659],
    year: "Birthplace · Origin",
    title: "Hengshui",
    description:
      "My hometown and birthplace. Hengshui is where my earliest memories, daily observations, and first sense of objects began.",
    role: "Origin, memory, early observation",
    output: "Personal foundation",
    tags: ["Birthplace", "Hometown", "Origin", "Observation"],
    colors: ["rgba(56, 189, 248, 0.72)", "rgba(120, 242, 189, 0.58)"],
    cover: "./assets/places/hengshui/hengshui-lake.jpg",
    gallery: [
      "./assets/places/hengshui/hengshui-lake.jpg",
      "./assets/places/hengshui/old-town-bridge.jpg",
      "./assets/places/hengshui/skyline.jpg",
      "./assets/places/hengshui/high-school.jpg",
    ],
  },
  {
    id: "shanghai",
    city: "Shanghai",
    label: "Shanghai",
    coords: [31.2304, 121.4737],
    year: "Portfolio Project",
    title: "IC AR Glasses System",
    description: "The next generation of AR glasses system, exploring wearable interaction and future device ecosystems.",
    role: "Product system, interaction thinking, industrial design",
    output: "AR glasses system",
    tags: ["AR", "Wearable", "Product system"],
    colors: ["rgba(56, 189, 248, 0.72)", "rgba(255, 191, 87, 0.7)"],
    cover: "./assets/projects/ic-ar-glasses-system.png",
    gallery: [
      "./assets/projects/ic-ar-glasses-system.png",
      "./assets/projects/ic-ar-glasses-system-02.png",
      "./assets/projects/ic-ar-glasses-system-03.png",
    ],
    sourceUrl: "https://kingsdesign.framer.website/ic-ar-glasses-system",
  },
  {
    id: "shenzhen",
    city: "Shenzhen",
    label: "Shenzhen",
    coords: [22.5431, 114.0579],
    year: "Portfolio Project",
    title: "Cartpal",
    description: "A self-checkout system designed for Costco, focused on improving the retail checkout experience.",
    role: "Service system, UX thinking, product design",
    output: "Self-checkout system",
    tags: ["Retail", "Checkout", "Service design"],
    colors: ["rgba(56, 189, 248, 0.7)", "rgba(120, 242, 189, 0.64)"],
    cover: "./assets/projects/cartpal.png",
    gallery: ["./assets/projects/cartpal.png", "./assets/projects/cartpal-02.png", "./assets/projects/cartpal-03.png"],
    sourceUrl: "https://kingsdesign.framer.website/cartpal",
  },
  {
    id: "san-jose",
    city: "San Jose",
    label: "San Jose",
    coords: [37.3382, -121.8863],
    year: "Portfolio Project",
    title: "Project Y",
    description: "A conceptual ankle brace designed for Adidas, exploring sports protection, comfort, and product identity.",
    role: "Industrial design, sports product concept, form development",
    output: "Conceptual ankle brace",
    tags: ["Sports product", "Adidas", "Wearable support"],
    colors: ["rgba(255, 107, 107, 0.68)", "rgba(255, 191, 87, 0.66)"],
    cover: "./assets/projects/project-y.png",
    gallery: ["./assets/projects/project-y.png", "./assets/projects/project-y-02.png", "./assets/projects/project-y-03.png"],
    sourceUrl: "https://kingsdesign.framer.website/projecty",
  },
  {
    id: "new-york",
    city: "New York",
    label: "New York",
    coords: [40.7128, -74.006],
    year: "Portfolio Project",
    title: "Luminhub",
    description:
      "A multifunctional bus stop sign with a unified design style for the New York transit system.",
    role: "Urban product design, transit system research, visual language",
    output: "Multifunctional bus stop sign",
    tags: ["Transit", "New York", "Public infrastructure"],
    colors: ["rgba(120, 242, 189, 0.72)", "rgba(56, 189, 248, 0.58)"],
    cover: "./assets/projects/luminhub.png",
    gallery: ["./assets/projects/luminhub.png", "./assets/projects/luminhub-02.png", "./assets/projects/luminhub-03.png"],
    sourceUrl: "https://kingsdesign.framer.website/luminhub",
  },
  {
    id: "london",
    city: "London",
    label: "London",
    coords: [51.5074, -0.1278],
    year: "Portfolio Project",
    title: "Shy Onion",
    description: "A cyber-physical systems project exploring responsive behavior between digital logic and physical interaction.",
    role: "Cyber-physical system, interaction prototype, speculative design",
    output: "Interactive system concept",
    tags: ["Cyber Physical Systems", "Interaction", "Prototype"],
    colors: ["rgba(255, 191, 87, 0.68)", "rgba(255, 255, 255, 0.52)"],
    cover: "./assets/projects/shy-onion.png",
    gallery: ["./assets/projects/shy-onion.png", "./assets/projects/shy-onion-02.png", "./assets/projects/shy-onion-03.png"],
    sourceUrl: "https://kingsdesign.framer.website/shy-onion",
  },
];

const journeyStops = [
  {
    placeId: "hengshui",
    city: "Hengshui",
    phase: "Origin",
    title: "Where I Was Born",
    description:
      "Hengshui is my starting point. It shaped my earliest memories of family, daily life, and the quiet details that later became part of how I observe design.",
  },
  {
    placeId: "shanghai",
    city: "Shanghai",
    phase: "First Expansion",
    title: "Seeing a Larger Design World",
    description:
      "Shanghai represents my first step into a faster, denser, and more contemporary design environment, where products, cities, and people move with a different rhythm.",
  },
  {
    placeId: "san-jose",
    city: "San Jose",
    phase: "Undergraduate Foundation",
    title: "Building My Industrial Design Base",
    description:
      "San Jose became the place where I developed my industrial design foundation, from sketching and modeling to prototyping and understanding products as systems.",
  },
  {
    placeId: "new-york",
    city: "New York",
    phase: "Graduate Study",
    title: "Designing With More Complexity",
    description:
      "New York pushed my work into broader questions: public systems, user behavior, manufacturing, technology, and how design decisions live in the real world.",
  },
  {
    placeId: "london",
    city: "London",
    phase: "Global Innovation Design",
    title: "Learning Across Cultures",
    description:
      "London opened a more global way of thinking, connecting design with innovation, research, and collaboration across different cultures and disciplines.",
  },
  {
    placeId: "new-york",
    city: "New York",
    phase: "Practice And Refinement",
    title: "Turning Ideas Into Stronger Work",
    description:
      "Returning to New York, I refined my process through projects, workshops, teaching, and hands-on making, becoming more precise about what kind of designer I want to be.",
  },
  {
    placeId: "san-jose",
    city: "San Jose",
    phase: "Next Chapter",
    title: "Connecting Back To Product Practice",
    description:
      "San Jose closes this current loop as a place connected to product practice, technology, and the next stage of my industrial design career.",
  },
];

const canvas = document.querySelector("#globe");
const labelLayer = document.querySelector("#label-layer");
const projectGrid = document.querySelector("#project-grid");
const journeyTimeline = document.querySelector("#journey-timeline");
const projectTrigger = document.querySelector("#project-trigger");
const projectView = document.querySelector("#project-view");
const closeProject = document.querySelector("#close-project");
const detailView = document.querySelector("#detail-view");
const closeDetail = document.querySelector("#close-detail");
const caseGallery = document.querySelector("#case-gallery");
const prevProject = document.querySelector("#prev-project");
const nextProject = document.querySelector("#next-project");
const prevProjectTitle = document.querySelector("#prev-project-title");
const nextProjectTitle = document.querySelector("#next-project-title");
const aboutView = document.querySelector("#about-view");
const aboutTrigger = document.querySelector("#about-trigger");
const closeAbout = document.querySelector("#close-about");
const journeyView = document.querySelector("#journey-view");
const journeyTrigger = document.querySelector("#journey-trigger");
const closeJourney = document.querySelector("#close-journey");
const cursorShip = document.createElement("div");
cursorShip.className = "cursor-ship";
cursorShip.innerHTML = '<span class="cursor-flame"></span><span class="cursor-body"></span>';
document.body.appendChild(cursorShip);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
camera.position.set(0, 0.35, 7.2);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const globeGroup = new THREE.Group();
scene.add(globeGroup);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(2, 96, 96),
  new THREE.MeshStandardMaterial({
    map: makeFallbackEarthTexture(),
    roughness: 0.84,
    metalness: 0.05,
    emissive: new THREE.Color("#08121f"),
    emissiveIntensity: 0.32,
  }),
);
globeGroup.add(earth);

const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(2.06, 96, 96),
  new THREE.MeshBasicMaterial({
    color: "#38BDF8",
    transparent: true,
    opacity: 0.12,
    side: THREE.BackSide,
  }),
);
globeGroup.add(atmosphere);

const ring = new THREE.Mesh(
  new THREE.TorusGeometry(2.38, 0.008, 8, 160),
  new THREE.MeshBasicMaterial({
    color: "#b7e9ff",
    transparent: true,
    opacity: 0.3,
  }),
);
ring.rotation.x = Math.PI / 2.35;
ring.rotation.z = Math.PI / 8;
globeGroup.add(ring);
globeGroup.add(createRouteLines(places));

const pins = places.map((place) => createPin(place));
pins.forEach((pin) => globeGroup.add(pin.group));

scene.add(new THREE.AmbientLight("#8fb8d8", 1.35));
const keyLight = new THREE.DirectionalLight("#ffffff", 2.6);
keyLight.position.set(3.2, 3.8, 5);
scene.add(keyLight);
const rimLight = new THREE.PointLight("#38BDF8", 18, 12);
rimLight.position.set(-4, 1, 3.5);
scene.add(rimLight);

const pointer = {
  down: false,
  x: 0,
  y: 0,
  moved: false,
};
let targetRotationX = -0.18;
let targetRotationY = -0.58;
let rotationX = targetRotationX;
let rotationY = targetRotationY;
let hoveredPin = null;
let detailReturnTarget = "globe";
const cursorState = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  targetX: window.innerWidth / 2,
  targetY: window.innerHeight / 2,
  previousX: window.innerWidth / 2,
  previousY: window.innerHeight / 2,
  angle: -Math.PI / 2,
  speed: 0,
  visible: false,
};

renderPlaceCards();
renderJourneyTimeline();
loadRealEarthTexture();
bindEvents();
resize();
requestAnimationFrame(tick);

function createPin(place) {
  const group = new THREE.Group();
  const position = latLngToVector3(place.coords[0], place.coords[1], 2.04);
  group.position.copy(position);
  group.lookAt(position.clone().multiplyScalar(1.8));

  const signal = new THREE.Color("#38BDF8");
  const glassMaterial = new THREE.MeshBasicMaterial({
    color: signal,
    transparent: true,
    opacity: 0.62,
    depthWrite: false,
  });

  const surfaceRing = new THREE.Mesh(
    new THREE.RingGeometry(0.075, 0.122, 48),
    new THREE.MeshBasicMaterial({
      color: signal,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );

  const pulse = new THREE.Mesh(
    new THREE.RingGeometry(0.16, 0.285, 64),
    new THREE.MeshBasicMaterial({
      color: signal,
      transparent: true,
      opacity: 0.34,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );

  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.022, 0.46, 24), glassMaterial);
  beam.position.z = 0.23;
  beam.rotation.x = Math.PI / 2;

  const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeGlowTexture(),
      color: signal,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  glow.position.z = 0.22;
  glow.scale.set(0.52, 0.52, 1);

  group.add(pulse, surfaceRing, beam, glow);
  group.userData.place = place;

  const label = document.createElement("button");
  label.className = "pin-label";
  label.type = "button";
  label.textContent = place.label;
  label.addEventListener("click", () => openPlace(place.id));
  labelLayer.appendChild(label);

  return { group, label, place, pulse, surfaceRing, beam, glow };
}

function makeGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.95)");
  gradient.addColorStop(0.28, "rgba(56, 189, 248, 0.45)");
  gradient.addColorStop(0.62, "rgba(56, 189, 248, 0.16)");
  gradient.addColorStop(1, "rgba(56, 189, 248, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createRouteLines(routePlaces) {
  const group = new THREE.Group();
  const material = new THREE.LineDashedMaterial({
    color: "#38BDF8",
    dashSize: 0.08,
    gapSize: 0.055,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
  });

  routePlaces.slice(0, -1).forEach((place, index) => {
    const nextPlace = routePlaces[index + 1];
    const start = latLngToVector3(place.coords[0], place.coords[1], 1).normalize();
    const end = latLngToVector3(nextPlace.coords[0], nextPlace.coords[1], 1).normalize();
    const points = [];

    for (let step = 0; step <= 48; step += 1) {
      const t = step / 48;
      const lift = Math.sin(Math.PI * t) * 0.13;
      const point = start.clone().lerp(end, t).normalize().multiplyScalar(2.075 + lift);
      points.push(point);
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    line.computeLineDistances();
    group.add(line);
  });

  return group;
}

function loadRealEarthTexture() {
  const texture = new THREE.TextureLoader().load(
    "./assets/earth_atmos_2048.jpg",
    () => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
      earth.material.map = texture;
      earth.material.needsUpdate = true;
    },
  );
}

function makeFallbackEarthTexture() {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 1600;
  textureCanvas.height = 800;
  const ctx = textureCanvas.getContext("2d");

  const ocean = ctx.createLinearGradient(0, 0, 1600, 800);
  ocean.addColorStop(0, "#07172c");
  ocean.addColorStop(0.45, "#0b3150");
  ocean.addColorStop(1, "#04111f");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, 1600, 800);

  ctx.globalAlpha = 0.86;
  ctx.fillStyle = "#223f36";
  drawLand(ctx, [
    [420, 250], [500, 188], [640, 220], [690, 335], [615, 430], [505, 394],
    [390, 340],
  ]);
  drawLand(ctx, [
    [770, 225], [920, 172], [1110, 235], [1075, 336], [935, 372], [820, 326],
  ]);
  drawLand(ctx, [
    [940, 392], [1045, 432], [1075, 540], [1000, 650], [900, 590],
    [890, 470],
  ]);
  drawLand(ctx, [
    [1160, 282], [1310, 316], [1390, 440], [1310, 528], [1180, 485],
    [1128, 376],
  ]);
  drawLand(ctx, [
    [285, 330], [360, 400], [330, 545], [270, 690], [208, 538], [230, 410],
  ]);

  ctx.globalAlpha = 0.32;
  ctx.strokeStyle = "#9feaff";
  ctx.lineWidth = 1;
  for (let x = 0; x <= 1600; x += 100) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 800);
    ctx.stroke();
  }
  for (let y = 0; y <= 800; y += 80) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1600, y);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.18;
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < 900; i += 1) {
    const x = Math.random() * 1600;
    const y = Math.random() * 800;
    ctx.fillRect(x, y, Math.random() * 2.2, Math.random() * 1.8);
  }

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function drawLand(ctx, points) {
  ctx.beginPath();
  points.forEach(([x, y], index) => {
    if (index === 0) {
      ctx.moveTo(x, y);
      return;
    }
    ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fill();
}

function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function renderPlaceCards() {
  places.forEach((place) => {
    const tile = document.createElement("button");
    tile.className = "project-tile";
    tile.type = "button";
    tile.id = `project-${place.id}`;
    tile.innerHTML = `
      <div class="project-cover" style="--cover-a: ${place.colors[0]}; --cover-b: ${place.colors[1]}; --cover-image: url('${place.cover}')"></div>
      <div class="project-info">
        <span>${place.city}</span>
        <strong>${place.title}</strong>
        <p>${place.description}</p>
      </div>
    `;
    tile.addEventListener("click", () => openPlace(place.id, "projects"));
    projectGrid.appendChild(tile);
  });
}

function renderJourneyTimeline() {
  journeyStops.forEach((stop, index) => {
    const item = document.createElement("section");
    item.className = "journey-chapter";
    item.innerHTML = `
      <span class="journey-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="journey-node" aria-hidden="true"></span>
      <div class="journey-content">
        <span class="journey-city">${stop.city}</span>
        <h3>${stop.title}</h3>
        <span class="journey-phase">${stop.phase}</span>
        <p>${stop.description}</p>
      </div>
    `;
    journeyTimeline.appendChild(item);
  });
}

function bindEvents() {
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", updateCursorTarget);
  window.addEventListener("pointerenter", () => cursorShip.classList.add("is-visible"));
  window.addEventListener("pointerleave", () => cursorShip.classList.remove("is-visible"));
  projectTrigger.addEventListener("click", openProjectPanel);
  closeProject.addEventListener("click", closeProjectPanel);
  closeDetail.addEventListener("click", closePlace);
  prevProject.addEventListener("click", () => moveProject(-1));
  nextProject.addEventListener("click", () => moveProject(1));
  aboutTrigger.addEventListener("click", openAbout);
  closeAbout.addEventListener("click", closeAboutView);
  journeyTrigger.addEventListener("click", openJourney);
  closeJourney.addEventListener("click", closeJourneyView);

  canvas.addEventListener("pointerdown", (event) => {
    pointer.down = true;
    pointer.moved = false;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!pointer.down) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.moved = pointer.moved || Math.abs(dx) + Math.abs(dy) > 4;
    targetRotationY += dx * 0.006;
    targetRotationX += dy * 0.004;
    targetRotationX = Math.max(-1.1, Math.min(1.1, targetRotationX));
  });

  canvas.addEventListener("pointerup", (event) => {
    pointer.down = false;
    canvas.releasePointerCapture(event.pointerId);
    if (!pointer.moved && hoveredPin) {
      openPlace(hoveredPin.place.id);
    }
  });

  canvas.addEventListener("pointerleave", () => {
    pointer.down = false;
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProjectPanel();
      closePlace();
      closeAboutView();
      closeJourneyView();
    }
  });

  window.addEventListener("hashchange", syncHash);
  syncHash();
}

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}

function tick(time) {
  const t = time * 0.001;
  updateCursor(t);
  if (
    !pointer.down &&
    !detailView.classList.contains("is-open") &&
    !projectView.classList.contains("is-open") &&
    !aboutView.classList.contains("is-open") &&
    !journeyView.classList.contains("is-open")
  ) {
    targetRotationY += 0.0013;
  }

  rotationX += (targetRotationX - rotationX) * 0.08;
  rotationY += (targetRotationY - rotationY) * 0.08;
  globeGroup.rotation.x = rotationX;
  globeGroup.rotation.y = rotationY;
  ring.rotation.z += 0.002;

  pins.forEach((pin, index) => {
    const wave = (Math.sin(t * 2.2 + index * 0.8) + 1) / 2;
    pin.pulse.scale.setScalar(0.92 + wave * 0.32);
    pin.pulse.material.opacity = 0.18 + wave * 0.24;
    pin.surfaceRing.rotation.z += 0.006 + index * 0.0004;
    pin.beam.material.opacity = 0.44 + wave * 0.22;
    pin.glow.material.opacity = 0.32 + wave * 0.28;
  });

  updateLabels();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

function updateCursorTarget(event) {
  cursorState.targetX = event.clientX;
  cursorState.targetY = event.clientY;
  cursorState.visible = true;
  cursorShip.classList.add("is-visible");
  pointer.x = event.clientX;
  pointer.y = event.clientY;
}

function updateCursor(time) {
  if (!cursorState.visible) return;
  const dx = cursorState.targetX - cursorState.x;
  const dy = cursorState.targetY - cursorState.y;
  cursorState.x += dx * 0.34;
  cursorState.y += dy * 0.34;

  const velocityX = cursorState.x - cursorState.previousX;
  const velocityY = cursorState.y - cursorState.previousY;
  const speed = Math.min(1, Math.hypot(velocityX, velocityY) / 18);
  cursorState.speed += (speed - cursorState.speed) * 0.24;
  if (Math.hypot(velocityX, velocityY) > 0.1) {
    const targetAngle = Math.atan2(velocityY, velocityX) + Math.PI / 2;
    let delta = targetAngle - cursorState.angle;
    delta = Math.atan2(Math.sin(delta), Math.cos(delta));
    cursorState.angle += delta * 0.2;
  }

  const flameStretch = 8 + cursorState.speed * 28;
  const flameAlpha = cursorState.speed * 0.34;
  const flameDrift = Math.sin(time * 11) * (1.5 + cursorState.speed * 4);

  cursorShip.style.setProperty("--flame-stretch", `${flameStretch}px`);
  cursorShip.style.setProperty("--flame-alpha", flameAlpha.toFixed(3));
  cursorShip.style.setProperty("--flame-drift", `${flameDrift.toFixed(2)}px`);
  cursorShip.style.transform = `translate3d(${cursorState.x}px, ${cursorState.y}px, 0) translate(-50%, -42%) rotate(${cursorState.angle}rad)`;

  cursorState.previousX = cursorState.x;
  cursorState.previousY = cursorState.y;
}

function updateLabels() {
  hoveredPin = null;
  const pointerNdc = new THREE.Vector2(
    (pointer.x / window.innerWidth) * 2 - 1,
    -(pointer.y / window.innerHeight) * 2 + 1,
  );

  pins.forEach((pin) => {
    const worldPosition = new THREE.Vector3();
    pin.group.getWorldPosition(worldPosition);
    const normal = worldPosition.clone().normalize();
    const cameraDirection = camera.position.clone().sub(worldPosition).normalize();
    const visible = normal.dot(cameraDirection) > 0.12;
    const projected = worldPosition.clone().project(camera);

    pin.label.style.opacity = visible ? "1" : "0";
    pin.label.style.transform = `translate(${(projected.x * 0.5 + 0.5) * window.innerWidth + 16}px, ${(-projected.y * 0.5 + 0.5) * window.innerHeight}px)`;

    const distance = pointerNdc.distanceTo(projected);
    if (visible && distance < 0.045) hoveredPin = pin;
  });
}

function openPlace(id, returnTarget = "globe") {
  const place = places.find((item) => item.id === id);
  if (!place) return;
  detailReturnTarget = returnTarget;
  if (returnTarget !== "projects") closeProjectPanel(false);
  if (returnTarget !== "journey") closeJourneyView(false);
  closeAboutView(false);
  window.location.hash = place.id;
  setDetail(place);
}

function closePlace(updateUrl = true) {
  const wasOpen = detailView.classList.contains("is-open");
  detailView.classList.remove("is-open");
  detailView.setAttribute("aria-hidden", "true");
  caseGallery.replaceChildren();
  if (wasOpen && (detailReturnTarget === "projects" || projectView.classList.contains("is-open"))) {
    projectView.classList.add("is-open");
    projectView.setAttribute("aria-hidden", "false");
    if (updateUrl) {
      history.replaceState("", document.title, `${window.location.pathname}${window.location.search}#projects`);
    }
    return;
  }
  if (wasOpen && (detailReturnTarget === "journey" || journeyView.classList.contains("is-open"))) {
    journeyView.classList.add("is-open");
    journeyView.setAttribute("aria-hidden", "false");
    if (updateUrl) {
      history.replaceState("", document.title, `${window.location.pathname}${window.location.search}#journey`);
    }
    return;
  }
  if (updateUrl && window.location.hash) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
}

function openProjectPanel(updateUrl = true) {
  closePlace(false);
  closeAboutView(false);
  closeJourneyView(false);
  projectView.classList.add("is-open");
  projectView.setAttribute("aria-hidden", "false");
  projectView.scrollTop = 0;
  if (updateUrl) window.location.hash = "projects";
}

function closeProjectPanel(updateUrl = true) {
  projectView.classList.remove("is-open");
  projectView.setAttribute("aria-hidden", "true");
  if (updateUrl && window.location.hash === "#projects") {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
}

function openAbout() {
  closePlace(false);
  closeProjectPanel(false);
  closeJourneyView(false);
  aboutView.classList.add("is-open");
  aboutView.setAttribute("aria-hidden", "false");
  window.location.hash = "about";
}

function closeAboutView(updateUrl = true) {
  aboutView.classList.remove("is-open");
  aboutView.setAttribute("aria-hidden", "true");
  if (updateUrl && window.location.hash === "#about") {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
}

function openJourney(updateUrl = true) {
  closePlace(false);
  closeProjectPanel(false);
  closeAboutView(false);
  journeyView.classList.add("is-open");
  journeyView.setAttribute("aria-hidden", "false");
  journeyView.scrollTop = 0;
  if (updateUrl) window.location.hash = "journey";
}

function closeJourneyView(updateUrl = true) {
  journeyView.classList.remove("is-open");
  journeyView.setAttribute("aria-hidden", "true");
  if (updateUrl && window.location.hash === "#journey") {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
}

function syncHash() {
  const id = window.location.hash.replace("#", "");
  if (id === "projects") {
    openProjectPanel();
    return;
  }
  if (id === "about") {
    openAbout();
    return;
  }
  if (id === "journey") {
    openJourney();
    return;
  }
  const place = places.find((item) => item.id === id);
  if (place) {
    detailReturnTarget = "globe";
    setDetail(place);
  }
}

function setDetail(place) {
  document.querySelector("#detail-year").textContent = place.year;
  document.querySelector("#detail-title").textContent = place.title;
  document.querySelector("#detail-description").textContent = place.description;
  document.querySelector("#detail-role").textContent = place.role;
  document.querySelector("#detail-output").textContent = place.output;
  document.querySelector("#detail-tags").replaceChildren(
    ...place.tags.map((tag) => {
      const item = document.createElement("span");
      item.textContent = tag;
      return item;
    }),
  );

  const image = document.querySelector("#detail-image");
  image.style.setProperty("--image-a", place.colors[0]);
  image.style.setProperty("--image-b", place.colors[1]);
  image.style.setProperty("--detail-image", `url('${place.cover}')`);
  image.classList.toggle("has-cover", Boolean(place.cover));
  caseGallery.replaceChildren(
    ...place.gallery.map((source, index) => {
      const figure = document.createElement("figure");
      figure.className = "case-gallery-item";
      figure.innerHTML = `<img src="${source}" alt="${place.title} project image ${index + 1}" loading="lazy" />`;
      return figure;
    }),
  );

  const currentIndex = places.findIndex((item) => item.id === place.id);
  const prev = places[(currentIndex - 1 + places.length) % places.length];
  const next = places[(currentIndex + 1) % places.length];
  prevProject.dataset.projectId = prev.id;
  nextProject.dataset.projectId = next.id;
  prevProjectTitle.textContent = prev.title;
  nextProjectTitle.textContent = next.title;

  detailView.classList.add("is-open");
  detailView.setAttribute("aria-hidden", "false");
  detailView.scrollTop = 0;
}

function moveProject(direction) {
  const currentId = window.location.hash.replace("#", "");
  const currentIndex = places.findIndex((item) => item.id === currentId);
  if (currentIndex === -1) return;
  const nextIndex = (currentIndex + direction + places.length) % places.length;
  openPlace(places[nextIndex].id, "projects");
}
