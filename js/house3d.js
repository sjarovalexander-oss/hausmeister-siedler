import * as THREE from './vendor/three.module.js';

// Stilisiertes 3D-Haus in den Logo-Farben (blau, grau, schwarz)
export function house3d(canvas) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  cam.position.set(7.5, 6, 9.5);
  cam.lookAt(0, 1.2, 0);

  const BLUE = 0x008eef, GRAY = 0x979592, INK = 0x0b0f14, WHITE = 0xffffff, PINK = 0xffa7a9, GREEN = 0x4fb36b;
  const mat = (c, r = 0.55) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: 0.05 });

  scene.add(new THREE.HemisphereLight(0xffffff, 0xcfe6fb, 1.1));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6);
  sun.position.set(5, 9, 6); sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6 });
  scene.add(sun);

  const world = new THREE.Group(); scene.add(world);

  // Boden-Insel
  const ground = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.4, 0.4, 64), mat(0xffffff, 0.9));
  ground.position.y = -0.2; ground.receiveShadow = true; world.add(ground);
  const lawn = new THREE.Mesh(new THREE.CylinderGeometry(4.05, 4.05, 0.06, 64), mat(0xdff0d9, 0.95));
  lawn.position.y = 0.02; lawn.receiveShadow = true; world.add(lawn);
  const path = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.07, 2.4), mat(0xe9edf1, 0.9));
  path.position.set(0, 0.04, 2.7); path.receiveShadow = true; world.add(path);

  // Haus
  const house = new THREE.Group(); world.add(house);
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2, 2.4), mat(BLUE, 0.45));
  body.position.y = 1; body.castShadow = body.receiveShadow = true; house.add(body);

  const roofShape = new THREE.Shape();
  roofShape.moveTo(-1.75, 0); roofShape.lineTo(0, 1.5); roofShape.lineTo(1.75, 0); roofShape.lineTo(-1.75, 0);
  const roof = new THREE.Mesh(new THREE.ExtrudeGeometry(roofShape, { depth: 2.8, bevelEnabled: false }), mat(GRAY, 0.7));
  roof.position.set(0, 2, -1.4); roof.castShadow = true; house.add(roof);

  const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1, 0.4), mat(INK));
  chimney.position.set(-0.9, 2.9, -0.4); chimney.castShadow = true; house.add(chimney);

  const door = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.1, 0.06), mat(GRAY));
  door.position.set(0.35, 0.55, 1.22); house.add(door);
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), mat(INK));
  knob.position.set(0.15, 0.55, 1.26); house.add(knob);

  const win = new THREE.Mesh(new THREE.CircleGeometry(0.26, 32), new THREE.MeshStandardMaterial({ color: WHITE, emissive: 0xfff3c4, emissiveIntensity: 0.25 }));
  win.position.set(0, 2.75, 1.41); house.add(win);
  const winFront = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.05), new THREE.MeshStandardMaterial({ color: WHITE, emissive: 0xfff3c4, emissiveIntensity: 0.2 }));
  winFront.position.set(-0.65, 1.15, 1.22); house.add(winFront);
  for (const z of [-0.5, 0.5]) {
    const w = winFront.clone(); w.rotation.y = Math.PI / 2; w.position.set(1.31, 1.15, z); house.add(w);
  }

  // Bäume & Hecken
  const tree = (x, z, s = 1) => {
    const g = new THREE.Group();
    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.08 * s, 0.1 * s, 0.6 * s), mat(0x8a6a4b));
    t.position.y = 0.3 * s; g.add(t);
    const c = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5 * s, 0), mat(GREEN, 0.8));
    c.position.y = 0.95 * s; c.castShadow = true; g.add(c);
    g.position.set(x, 0, z); world.add(g); return c;
  };
  const crowns = [tree(-2.7, 0.6, 1.1), tree(2.6, -1.4, 0.9), tree(-2.1, -2.2, 0.8)];
  [-1.6, -1.1, 1.1, 1.6].forEach((x) => {
    const h = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.4, 0.45), mat(0x5cbf78, 0.85));
    h.position.set(x, 0.22, 3.1); h.castShadow = true; world.add(h);
  });

  // Mülltonnen
  [[2.2, 1.6, BLUE], [2.7, 1.6, INK]].forEach(([x, z, c]) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.6, 0.38), mat(c));
    b.position.set(x, 0.32, z); b.castShadow = true; world.add(b);
  });

  // Schwebende Partikel (Schnee/Blätter) in Markenfarben
  const parts = [];
  const pg = new THREE.OctahedronGeometry(0.08, 0);
  const pcols = [BLUE, PINK, WHITE, GRAY];
  for (let i = 0; i < 40; i++) {
    const m = new THREE.Mesh(pg, mat(pcols[i % 4], 0.4));
    const r = 3 + Math.random() * 2.5, a = Math.random() * Math.PI * 2;
    m.userData = { r, a, y: 0.5 + Math.random() * 4.5, s: 0.15 + Math.random() * 0.35 };
    world.add(m); parts.push(m);
  }

  // Ring
  const ring = new THREE.Mesh(new THREE.TorusGeometry(4.9, 0.025, 8, 120), new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.5 }));
  ring.rotation.x = Math.PI / 2; ring.position.y = 0.1; world.add(ring);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(canvas); resize();

  let mx = 0, my = 0, tx = 0, ty = 0;
  addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });

  const clock = new THREE.Clock();
  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);
  (function loop() {
    requestAnimationFrame(loop);
    if (!visible) return;
    const t = clock.getElapsedTime();
    tx += (mx - tx) * 0.05; ty += (my - ty) * 0.05;
    world.rotation.y = -0.5 + t * 0.12 + tx * 0.8 + scrollY * 0.0015;
    world.rotation.x = ty * 0.15;
    house.position.y = Math.sin(t * 1.2) * 0.05;
    crowns.forEach((c, i) => (c.rotation.y = Math.sin(t + i) * 0.2));
    ring.scale.setScalar(1 + Math.sin(t * 1.5) * 0.015);
    parts.forEach((p) => {
      const d = p.userData; d.a += 0.004 * d.s * 3; d.y -= 0.006 * d.s; if (d.y < 0.2) d.y = 5;
      p.position.set(Math.cos(d.a) * d.r, d.y, Math.sin(d.a) * d.r); p.rotation.x += 0.02; p.rotation.y += 0.03;
    });
    renderer.render(scene, cam);
  })();
}
