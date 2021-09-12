import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { addStructure } from './addStructure';
import { contentWall } from './contentWall';
import { findGrid } from './findGrid';
import { particleGen, particleEffect } from './particles';


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
    camera.position.y > cameraHeight ? 100 - t * 0.09 : cameraHeight;

  scrollBreak =
    camera.position.y === cameraHeight && scrollBreak === 0 ? t : scrollBreak;
  camera.rotation.y =
    camera.position.y === cameraHeight ? (scrollBreak - t) * 0.001 : 0;

  camera.position.y =
    camera.position.y === cameraHeight && t < scrollBreak
      ? 100 - t * 0.09
      : camera.position.y;
};

//Particles
//ParticleGen


export const graphics = () => {
  const wallSize = 50;

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  let forge = addStructure(wallSize);
  forge.forEach((item) => {
    scene.add(item);
  });

  const sky = new THREE.TextureLoader().load('sky.jpg');
  scene.background = sky;

  const particles = particleGen(scene);

  const inventory = [
    './inventory/halberd.jpg',
    './inventory/sword.jpg',
    './inventory/sword2.jpg',
    './inventory/dagger.jpg',
    './inventory/battleaxe.jpg',
    './inventory/mace.jpg', 
    './inventory/spartan laser.png',
    './inventory/machete.jpg',
    './inventory/hotdog.jpg'
  ];

  const reducer = 0.8;
  const nearest_square_root = Math.ceil(Math.sqrt(inventory.length)); 

  const grid1 = findGrid(wallSize, inventory.length, reducer, nearest_square_root);
  console.log(grid1);

  inventory.forEach((item) => {
    const index = inventory.indexOf(item);

    const { i, j } = grid1[index];

    const { wall, planks } = contentWall(
      wallSize / (nearest_square_root + 2),
      { x: i + (wallSize * .04), y: j, z: -wallSize / 2 + 0.51 },
      { x: Math.PI / 2, y: 0, z: 0 },
      inventory[index],
      reducer
    );

    scene.add(wall);

    console.log(wall.position);

    planks.forEach((plank) => scene.add(plank));
  });

  //const controls = new OrbitControls( camera, renderer.domElement );
  const animate = () => {
    requestAnimationFrame(animate);

    moveCamera();

    //controls.update();

    particleEffect(particles, camera);

    renderer.render(scene, camera);
  };

  animate();
};
