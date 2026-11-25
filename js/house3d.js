import * as THREE from './vendor/three.module.js';

// Stilisiertes 3D-Haus in den Logo-Farben. Reagiert auf gewählte Leistungen:
// house3d(canvas).set(['winter','solar',…])
export function house3d(canvas, { mouse = true } = {}) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch { return { set() {} }; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  cam.position.set(7.5, 6, 9.5); cam.lookAt(0, 1.2, 0);

  const BLUE = 0x008eef, GRAY = 0x979592, INK = 0x0b0f14, WHITE = 0xffffff, PINK = 0xffa7a9, GREEN = 0x4fb36b;
  const mat = (c, r = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: 0.05, ...extra });

  scene.add(new THREE.HemisphereLight(0xffffff, 0xcfe6fb, 1.1));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6);
  sun.position.set(5, 9, 6); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6 });
  scene.add(sun);

  const world = new THREE.Group(); scene.add(world);
  const ground = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.4, 0.4, 64), mat(WHITE, 0.9));
  ground.position.y = -0.2; ground.receiveShadow = true; world.add(ground);
  const lawnMat = mat(0xdff0d9, 0.95);
  const lawn = new THREE.Mesh(new THREE.CylinderGeometry(4.05, 4.05, 0.06, 64), lawnMat);
  lawn.position.y = 0.02; lawn.receiveShadow = true; world.add(lawn);
  const path = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.07, 2.4), mat(0xe9edf1, 0.9));
  path.position.set(0, 0.04, 2.7); path.receiveShadow = true; world.add(path);

  const house = new THREE.Group(); world.add(house);
  const bodyMat = mat(BLUE, 0.45, { emissive: 0x000000 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2, 2.4), bodyMat);
  body.position.y = 1; body.castShadow = body.receiveShadow = true; house.add(body);
  const roofShape = new THREE.Shape();
  roofShape.moveTo(-1.75, 0); roofShape.lineTo(0, 1.5); roofShape.lineTo(1.75, 0); roofShape.lineTo(-1.75, 0);
  const roof = new THREE.Mesh(new THREE.ExtrudeGeometry(roofShape, { depth: 2.8, bevelEnabled: false }), mat(GRAY, 0.7));
  roof.position.set(0, 2, -1.4); roof.castShadow = true; house.add(roof);
  const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1, 0.4), mat(INK));
  chimney.position.set(-0.9, 2.9, -0.4); chimney.castShadow = true; house.add(chimney);
  const door = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.1, 0.06), mat(GRAY));
  door.position.set(0.35, 0.55, 1.22); house.add(door);

  const winMat = new THREE.MeshStandardMaterial({ color: WHITE, emissive: 0xfff3c4, emissiveIntensity: 0.2 });
  const win = new THREE.Mesh(new THREE.CircleGeometry(0.26, 32), winMat); win.position.set(0, 2.75, 1.41); house.add(win);
  const wf = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.05), winMat); wf.position.set(-0.65, 1.15, 1.22); house.add(wf);
  for (const z of [-0.5, 0.5]) { const w = wf.clone(); w.rotation.y = Math.PI / 2; w.position.set(1.31, 1.15, z); house.add(w); }

  // --- Reaktive Elemente
  // Schnee auf dem Dach
  const snowRoof = new THREE.Group(); house.add(snowRoof);
  const sr = new THREE.Mesh(new THREE.ExtrudeGeometry((() => { const s = new THREE.Shape(); s.moveTo(-1.8, 0); s.lineTo(0, 1.56); s.lineTo(1.8, 0); s.lineTo(1.6, 0); s.lineTo(0, 1.38); s.lineTo(-1.6, 0); return s; })(), { depth: 2.9, bevelEnabled: false }), mat(WHITE, 0.95));
  sr.position.set(0, 2.03, -1.45); snowRoof.add(sr); snowRoof.scale.setScalar(0.001);
  // Solarpaneele
  const solar = new THREE.Group(); house.add(solar);
  const pm = mat(0x0d2a4a, 0.2, { metalness: 0.6 });
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.05, 0.8), pm);
    const x = 0.55 + j * 0.62; p.position.set(x, 2 + 1.5 * (1 - x / 1.75) + 0.26, -0.95 + i * 0.9); p.rotation.z = -Math.atan2(1.5, 1.75); solar.add(p);
  }
  solar.scale.setScalar(0.001);
  // Bäume
  const tree = (x, z, s = 1) => {
    const g = new THREE.Group();
    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.08 * s, 0.1 * s, 0.6 * s), mat(0x8a6a4b)); t.position.y = 0.3 * s; g.add(t);
    const c = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5 * s, 0), mat(GREEN, 0.8)); c.position.y = 0.95 * s; c.castShadow = true; g.add(c);
    g.position.set(x, 0, z); world.add(g); return g;
  };
  const trees = [tree(-2.7, 0.6, 1.1), tree(2.6, -1.4, 0.9), tree(-2.1, -2.2, 0.8)];
  const extraTrees = [tree(-3.2, -0.8, 0.7), tree(3.1, 0.4, 0.75), tree(1.8, -2.8, 0.7)];
  extraTrees.forEach((t) => t.scale.setScalar(0.001));
  const hedges = [-1.6, -1.1, 1.1, 1.6].map((x) => {
    const h = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.4, 0.45), mat(0x5cbf78, 0.85));
    h.position.set(x, 0.22, 3.1); h.castShadow = true; world.add(h); return h;
  });
  // Tonnen
  const bins = [[2.2, 1.6, BLUE], [2.7, 1.6, INK]].map(([x, z, c]) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.6, 0.38), mat(c)); b.position.set(x, 0.32, z); b.castShadow = true; world.add(b); return b;
  });
  // Notdienst-Licht
  const siren = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), new THREE.MeshStandardMaterial({ color: 0xff3b3b, emissive: 0xff2020, emissiveIntensity: 0 }));
  siren.position.set(-0.9, 3.55, -0.4); siren.visible = false; house.add(siren);
  // Kartons (Entrümpelung)
  const boxes = new THREE.Group(); world.add(boxes);
  [[-1.9, 1.7, 0.4], [-1.5, 1.9, 0.32], [-1.75, 1.75, 0.3]].forEach(([x, z, s], i) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), mat(0xc8a27a, 0.9)); b.position.set(x, s / 2 + (i === 2 ? 0.4 : 0), z); b.castShadow = true; boxes.add(b);
  });
  boxes.scale.setScalar(0.001);
  // Auto (Tiefgarage/Doppelparker)
  const car = new THREE.Group(); world.add(car);
  const cb = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.35, 0.6), mat(PINK, 0.4)); cb.position.y = 0.3; car.add(cb);
  const ct = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.28, 0.55), mat(WHITE, 0.3)); ct.position.set(-0.05, 0.6, 0); car.add(ct);
  car.position.set(1.9, 0, 2.6); car.scale.setScalar(0.001);
  // Schild (Gravur)
  const sign = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.18, 0.03), mat(0xd9b45a, 0.3, { metalness: 0.7 }));
  sign.position.set(-0.15, 1.05, 1.24); sign.scale.setScalar(0.001); house.add(sign);

  // Partikel: Markenfarben / Schnee / Funkeln
  const mkParts = (n, color, size, spread) => {
    const g = new THREE.BufferGeometry(), pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { pos[i * 3] = (Math.random() - 0.5) * spread; pos[i * 3 + 1] = Math.random() * 6; pos[i * 3 + 2] = (Math.random() - 0.5) * spread; }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0, depthWrite: false });
    const p = new THREE.Points(g, m); world.add(p); return p;
  };
  const snow = mkParts(500, 0xffffff, 0.09, 9);
  const sparkle = mkParts(120, 0xfff6c8, 0.12, 4);
  const confetti = [];
  const pg = new THREE.OctahedronGeometry(0.08, 0);
  [BLUE, PINK, WHITE, GRAY].forEach((c, k) => { for (let i = 0; i < 10; i++) {
    const m = new THREE.Mesh(pg, mat(c, 0.4)); const r = 3 + Math.random() * 2.5;
    m.userData = { r, a: Math.random() * 6.28, y: 0.5 + Math.random() * 4.5, s: 0.15 + Math.random() * 0.35 }; world.add(m); confetti.push(m);
  } });

  const ring = new THREE.Mesh(new THREE.TorusGeometry(4.9, 0.025, 8, 120), new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.5 }));
  ring.rotation.x = Math.PI / 2; ring.position.y = 0.1; world.add(ring);

  const resize = () => { const { clientWidth: w, clientHeight: h } = canvas; if (!w || !h) return; renderer.setSize(w, h, false); cam.aspect = w / h;
    const d = cam.aspect < 1.15 ? 1.18 / Math.max(cam.aspect, 0.6) : 1.02; cam.position.set(7.5 * d, 6 * d, 9.5 * d); cam.lookAt(0, 1.1, 0); cam.updateProjectionMatrix(); };
  new ResizeObserver(resize).observe(canvas); resize();

  let mx = 0, my = 0, tx = 0, ty = 0;
  if (mouse) addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });

  // Zielwerte, weich angesteuert
  const T = { snowRoof: 0, solar: 0, trees: 0, boxes: 0, car: 0, sign: 0, snow: 0, sparkle: 0, glow: 0.2, lawn: 0, facade: 0 };
  const C = { ...T };
  let on = new Set(), pulse = 0;
  const lerp = (a, b, k) => a + (b - a) * k;

  const clock = new THREE.Clock();
  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);
  (function loop() {
    requestAnimationFrame(loop);
    if (!visible) return;
    const t = clock.getElapsedTime(), dt = Math.min(t - (loop.last ?? t - 0.016), 0.05); loop.last = t;
    for (const k in T) C[k] = lerp(C[k], T[k], 0.06);
    tx += (mx - tx) * 0.05; ty += (my - ty) * 0.05;
    world.rotation.y = -0.5 + t * 0.12 + tx * 0.8;
    world.rotation.x = ty * 0.15;
    house.position.y = Math.sin(t * 1.2) * 0.05 + Math.max(0, pulse) * 0.25;
    pulse -= 0.05;
    const bounce = (v) => Math.max(0.001, v * (1 + Math.sin(t * 3) * 0.02));
    snowRoof.scale.setScalar(Math.max(0.001, C.snowRoof));
    solar.scale.setScalar(Math.max(0.001, C.solar));
    extraTrees.forEach((tr, i) => tr.scale.setScalar(bounce(C.trees * (0.9 + i * 0.05))));
    trees.forEach((tr, i) => { tr.children[1].rotation.y = Math.sin(t + i) * 0.2; tr.scale.setScalar(1 + C.trees * 0.15); });
    hedges.forEach((h) => (h.scale.y = 1 + C.trees * 0.3));
    boxes.scale.setScalar(Math.max(0.001, C.boxes));
    car.scale.setScalar(Math.max(0.001, C.car));
    sign.scale.setScalar(Math.max(0.001, C.sign));
    winMat.emissiveIntensity = C.glow + (C.glow > 0.3 ? Math.sin(t * 4) * 0.15 : 0);
    lawnMat.color.setHex(0xdff0d9).lerp(new THREE.Color(0xa7dc9c), C.lawn).lerp(new THREE.Color(0xf4f8fb), C.snowRoof * 0.8);
    bodyMat.emissive.setHex(0x0a5aa0); bodyMat.emissiveIntensity = C.facade * (0.25 + Math.sin(t * 2) * 0.1);
    siren.visible = on.has('notdienst'); siren.material.emissiveIntensity = (Math.sin(t * 10) > 0 ? 2 : 0.1);
    bins.forEach((b, i) => (b.position.y = 0.32 + (on.has('muelltonnen') ? Math.abs(Math.sin(t * 3 + i)) * 0.15 : 0)));
    snow.material.opacity = C.snow * 0.9; sparkle.material.opacity = C.sparkle;
    const sp = snow.geometry.attributes.position;
    for (let i = 0; i < sp.count; i++) { let y = sp.getY(i) - dt * 0.9; if (y < 0) y = 6; sp.setY(i, y); sp.setX(i, sp.getX(i) + Math.sin(t + i) * 0.002); }
    sp.needsUpdate = true;
    const kp = sparkle.geometry.attributes.position;
    for (let i = 0; i < kp.count; i++) { let y = kp.getY(i) + dt * 0.5; if (y > 4) y = 0.3; kp.setY(i, y); }
    kp.needsUpdate = true;
    sparkle.material.size = 0.1 + Math.sin(t * 6) * 0.03;
    confetti.forEach((p) => { const d = p.userData; d.a += 0.012 * d.s; d.y -= 0.006 * d.s; if (d.y < 0.2) d.y = 5;
      p.position.set(Math.cos(d.a) * d.r, d.y, Math.sin(d.a) * d.r); p.rotation.x += 0.02; p.rotation.y += 0.03; p.visible = C.snow < 0.5 && on.size < 1; });
    ring.scale.setScalar(1 + Math.sin(t * 1.5) * 0.015);
    renderer.render(scene, cam);
  })();

  return {
    set(ids) {
      const prev = on; on = new Set(ids);
      const has = (...a) => a.some((x) => on.has(x));
      Object.assign(T, {
        snowRoof: has('winter') ? 1 : 0, snow: has('winter') ? 1 : 0, solar: has('solar') ? 1 : 0,
        trees: has('gruen') ? 1 : 0, lawn: has('gruen') ? 1 : 0, boxes: has('entruempelung') ? 1 : 0,
        car: has('tiefgarage', 'doppelparker') ? 1 : 0, sign: has('gravur') ? 1 : 0,
        sparkle: has('treppenhaus', 'grund', 'end', 'bau', 'buero', 'glas') ? 1 : 0,
        glow: has('glas', 'buero', 'treppenhaus') ? 0.9 : has('hausmeister', 'reparatur') ? 0.5 : 0.2,
        facade: has('fassade') ? 1 : 0,
      });
      if ([...on].some((x) => !prev.has(x))) pulse = 1;
    },
  };
}
