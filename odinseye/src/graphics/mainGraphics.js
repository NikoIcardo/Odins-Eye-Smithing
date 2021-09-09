import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { contentWall } from './contentWall'; 

//setup
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);

document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 1;
camera.position.y = 100;

//Move Camera
let scrollBreak = 0;
let cameraHeight = 18; 
const moveCamera = () => {
  const t = window.scrollY;

  camera.position.y =
    camera.position.y > cameraHeight ? 100 - t * 0.09 :  cameraHeight;

  scrollBreak =
    camera.position.y === cameraHeight && scrollBreak === 0 ? t : scrollBreak;
  camera.rotation.y = camera.position.y === cameraHeight ? ((scrollBreak - t) * 0.001) : 0;

  camera.position.y =
    camera.position.y === cameraHeight && t < scrollBreak
      ? 100 - t * 0.09
      : camera.position.y;
};

//Add the Smithy.
const addStructure = (size) => {
  const wallTexture = new THREE.TextureLoader().load("castle_wall.jpg");
  let geometry = new THREE.BoxGeometry(size, 1, size / 2);
  let material = new THREE.MeshBasicMaterial({ map: wallTexture });

  for (let i = 0; i < 4; i++) {
    const wall = new THREE.Mesh(geometry, material);
    wall.rotation.x = Math.PI / 2;
    wall.rotation.z = (Math.PI / 2) * (i + 1);
    wall.position.x = (-size / 2 + (size / 2) * i) * Math.ceil(1 - i / 3);
    wall.position.y = size / 4;
    wall.position.z = Math.ceil(1 - (3 - i) / 3) * size - (size / 2) * i;
    scene.add(wall);
  }

  const floorTexture = new THREE.TextureLoader().load("floor.jpg");
  geometry = new THREE.BoxGeometry(size, 1, size);
  material = new THREE.MeshBasicMaterial({ map: floorTexture });
  const floor = new THREE.Mesh(geometry, material);
  scene.add(floor);
};

//Particles 
//ParticleGen 
let particles = Array();
const particleGen = () => {
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
};

//particle motion
const particleEffect = () => {
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

const findGrid = (wallSize, partitions) => {

  const nearest_square_root = Math.ceil(Math.sqrt(partitions)); 

  const unit_Size = (wallSize / partitions); 

  let grid = Array();

  for (let j = 0; j < nearest_square_root; j++) {
    for(let i = 0; i < nearest_square_root; i++) {
      grid.push({i: (i * unit_Size) - (wallSize / 2) + wallSize / partitions, j: (nearest_square_root - j) * unit_Size / 2 + wallSize / 12}); 
    }
  }

  return grid; 
};

export const graphics = () => {
  const wallSize = 50;
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  addStructure(wallSize);

  const sky = new THREE.TextureLoader().load("sky.jpg");
  scene.background = sky;

  particleGen(); 

  const inventory = ['./inventory/halberd.jpg', './inventory/sword.jpg', './inventory/sword2.jpg', './inventory/sword2.jpg', './inventory/sword2.jpg'];

  
  const grid1 = findGrid(wallSize, inventory.length);
  console.log(grid1);

  inventory.forEach(item => {
    
    const index = inventory.indexOf(item);

    const {i, j} = grid1[index];   
    
    const {wall, planks} = contentWall(wallSize / inventory.length, {x: i, y: j, z: (-wallSize / 2) + .51}, {x: Math.PI / 2, y: 0, z: 0}, inventory[index]); 
    
    scene.add(wall);
    console.log(wall.position);

    planks.forEach(plank => scene.add(plank));
  }); 

  //const controls = new OrbitControls( camera, renderer.domElement );
  const animate = () => {
    requestAnimationFrame(animate);
    
    moveCamera();

    //controls.update();

    particleEffect();

    renderer.render(scene, camera);
  };

  animate(); 
};
