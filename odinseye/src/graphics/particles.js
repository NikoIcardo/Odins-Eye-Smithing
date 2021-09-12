import * as THREE from 'three';

let particles = Array();

export const particleGen = (scene) => {
  for (let i = 0; i < 500; i++) {
    const geometry = new THREE.SphereGeometry(0.001, 24, 24);
    const material = new THREE.MeshBasicMaterial({ color: 0x2ec946 });
    const particle = {
      particle: new THREE.Mesh(geometry, material),
      coords: { x: 0, y: 0, z: 0 },
    };

    const x = THREE.MathUtils.randFloatSpread(200);
    const y = 100.5 + THREE.MathUtils.randFloatSpread(2);
    const z = 0;
    particle.particle.position.set(x, y, z);
    particle.coords = { x, y, z };

    scene.add(particle.particle);
    particles.push(particle);
  }

  return particles;
};


export const particleEffect = (particles, camera) => {
  //particle x motion
  particles.forEach(function (particle) {
    particle.coords.x = particle.coords.x + 0.0002;
    particle.particle.position.x = 1.5 * Math.cos(particle.coords.x);
  });

  //particle z motion
  particles.forEach(function (particle) {
    particle.coords.z = particle.coords.z + 0.0002;
    particle.particle.position.z = 0.01 * Math.cos(particle.coords.z);
  });

  particles.forEach(function (particle) {
    particle.coords.y = particle.coords.y + 0.00002;
    particle.particle.position.y = 0.000001 * Math.sin(particle.coords.y);
  });

  //particle scroll with camera
  let t = window.scrollY;
  let scrollBreak = 0;
  particles.forEach(function (particle) {
    particle.particle.position.y =
      camera.position.y > 10
        ? particle.coords.y - t * 0.09
        : particle.particle.position.y;

    scrollBreak =
      camera.position.y <= 10 && scrollBreak === 0 ? t : scrollBreak;

    particle.particle.position.y =
      camera.position.y <= 10 && t < scrollBreak
        ? particle.coords.y - t * 0.09
        : particle.particle.position.y;
  });
};

