import * as THREE from "three";

export async function initGlobe({ places, openJourneyAt, isGlobeVisible }) {
  const canvas = document.querySelector("#globe");
  const labelLayer = document.querySelector("#label-layer");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.35, 7.2);

  const earthTexture = await new THREE.TextureLoader().loadAsync(
    new URL("../assets/earth_atmos_2048.jpg", import.meta.url).href,
  );
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (error) {
    earthTexture.dispose();
    throw error;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  earthTexture.colorSpace = THREE.SRGBColorSpace;
  earthTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);

  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(2, 72, 72),
    new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.84,
      metalness: 0.05,
      emissive: new THREE.Color("#08121f"),
      emissiveIntensity: 0.32,
    }),
  );
  globeGroup.add(earth);

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(2.06, 72, 72),
    new THREE.MeshBasicMaterial({
      color: "#38BDF8",
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    }),
  );
  globeGroup.add(atmosphere);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.38, 0.008, 8, 128),
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
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    moved: false,
  };
  let targetRotationX = 0.28;
  let targetRotationY = -0.58;
  let rotationX = targetRotationX;
  let rotationY = targetRotationY;
  let hoveredPin = null;
  let protectedAreas = [];
  let needsRender = true;
  let previousTick = 0;

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
      new THREE.RingGeometry(0.075, 0.122, 40),
      new THREE.MeshBasicMaterial({
        color: signal,
        transparent: true,
        opacity: 0.72,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );

    const pulse = new THREE.Mesh(
      new THREE.RingGeometry(0.16, 0.285, 48),
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
    label.addEventListener("click", () => openJourneyAt(place.id));
    labelLayer.appendChild(label);

    return { group, label, labelWidth: 110, place, pulse, surfaceRing, beam, glow };
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

  function latLngToVector3(lat, lng, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    );
  }

  function bindEvents() {
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    });

    canvas.addEventListener("pointerdown", (event) => {
      pointer.down = true;
      pointer.moved = false;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      canvas.classList.add("is-dragging");
      canvas.setPointerCapture(event.pointerId);
    });

    canvas.addEventListener("pointermove", (event) => {
      if (!pointer.down) return;
      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.moved = pointer.moved || Math.abs(dx) + Math.abs(dy) > 4;
      targetRotationY += dx * 0.0025;
      targetRotationX += dy * 0.0018;
      targetRotationX = Math.max(-0.86, Math.min(0.86, targetRotationX));
    });

    canvas.addEventListener("pointerup", (event) => {
      pointer.down = false;
      canvas.classList.remove("is-dragging");
      canvas.releasePointerCapture(event.pointerId);
      if (!pointer.moved && hoveredPin) {
        openJourneyAt(hoveredPin.place.id);
      }
    });

    canvas.addEventListener("pointerleave", () => {
      pointer.down = false;
      canvas.classList.remove("is-dragging");
    });

    canvas.addEventListener("pointercancel", () => {
      pointer.down = false;
      canvas.classList.remove("is-dragging");
    });
  }

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.position.z = Math.max(7.2, 2.5 / (Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect));
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    needsRender = true;
    protectedAreas = [".brand", ".page-nav", ".contact-dock"].map((selector) =>
      document.querySelector(selector).getBoundingClientRect(),
    );
    pins.forEach((pin) => { pin.labelWidth = pin.label.offsetWidth || 110; });
  }

  function tick(time) {
    requestAnimationFrame(tick);
    // Render loaded textures once even behind Projects, so the first return has a ready frame.
    const visible = isGlobeVisible();
    if (document.hidden || (!visible && !needsRender)) return;
    needsRender = false;
    const frame = previousTick ? Math.min(2, (time - previousTick) / 16.667) : 1;
    previousTick = time;
    const t = reducedMotion.matches ? 0 : time * 0.001;
    if (visible && !pointer.down && !reducedMotion.matches) {
      targetRotationY += 0.00042 * frame;
    }

    const settle = 1 - Math.pow(0.94, frame);
    rotationX += (targetRotationX - rotationX) * settle;
    rotationY += (targetRotationY - rotationY) * settle;
    globeGroup.rotation.x = rotationX;
    globeGroup.rotation.y = rotationY;
    if (!reducedMotion.matches) ring.rotation.z += 0.00055 * frame;

    pins.forEach((pin, index) => {
      const wave = (Math.sin(t * 1.25 + index * 0.7) + 1) / 2;
      pin.pulse.scale.setScalar(0.96 + wave * 0.18);
      pin.pulse.material.opacity = 0.18 + wave * 0.14;
      if (!reducedMotion.matches) pin.surfaceRing.rotation.z += (0.0018 + index * 0.00012) * frame;
      pin.beam.material.opacity = 0.42 + wave * 0.14;
      pin.glow.material.opacity = 0.3 + wave * 0.18;
    });

    updateLabels();
    renderer.render(scene, camera);
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
      let visible = normal.dot(cameraDirection) > 0.12;
      const projected = worldPosition.clone().project(camera);
      const labelWidth = pin.labelWidth;
      const x = Math.max(12, Math.min(window.innerWidth - labelWidth - 12, (projected.x * 0.5 + 0.5) * window.innerWidth + 16));
      const y = (-projected.y * 0.5 + 0.5) * window.innerHeight;
      visible = visible && !protectedAreas.some((area) =>
        x < area.right + 12 && x + labelWidth > area.left - 12 && y < area.bottom + 12 && y + 24 > area.top - 12,
      );
      pin.label.style.opacity = visible ? "1" : "0";
      if (pin.label.hidden === visible) pin.label.hidden = !visible;
      pin.label.style.transform = `translate(${x}px, ${y}px)`;

      const distance = pointerNdc.distanceTo(projected);
      if (visible && distance < 0.045) hoveredPin = pin;
    });
  }
}
