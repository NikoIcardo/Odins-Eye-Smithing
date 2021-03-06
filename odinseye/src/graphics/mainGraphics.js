import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { addStructure } from './addStructure';
import { contentWall } from './contentWall';
import { findGrid } from './findGrid';
import { particleGen, particleEffect } from './particles';
import { inventory } from './inventory';
import { photoScroller } from './photoScroller';
import { welcomeWallImages } from './welcomeWallImages';

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

  // inventory frames
  const reducer = 0.8;

  const nearest_square_root = Math.ceil(Math.sqrt(inventory.length));

  const grid1 = findGrid(
    wallSize,
    inventory.length,
    reducer,
    nearest_square_root
  );
  const contentWalls = Array();

  inventory.forEach((item) => {
    const index = inventory.indexOf(item);

    const { i, j } = grid1[index];

    const { wall, planks } = contentWall(
      wallSize / (nearest_square_root + 2),
      { x: wallSize / 2 - 0.51, y: j, z: i },
      { x: Math.PI / 2, y: 0, z: Math.PI / 2 },
      reducer,
      'z',
      inventory[index].photo,
      inventory[index].description
    );

    scene.add(wall);
    contentWalls.push(wall);

    planks.forEach((plank) => scene.add(plank));
  });

  //Blog Wall
  const image = './wall/papyrus.jpg';
  const { wall, planks } = contentWall(
    wallSize,
    { x: 0, y: wallSize / 4, z: -wallSize / 2 + 0.51 },
    { x: Math.PI / 2, y: 0, z: 0 },
    reducer,
    'x',
    image
  );

  scene.add(wall);
  console.log(wall);
  planks.forEach((plank) => scene.add(plank));

  //const controls = new OrbitControls( camera, renderer.domElement );

  const animate = () => {
    requestAnimationFrame(animate);

    moveCamera();

    //controls.update();

    particleEffect(particles, camera);

    renderer.render(scene, camera);
  };

  animate();

  //raycaster
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let intersects = null;
  let wallMaterial = null;

  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    if (raycaster.intersectObjects(contentWalls).length < 1 && wallMaterial) {
      intersects[0].object.material = wallMaterial;
      wallMaterial = null;
    }

    intersects = raycaster.intersectObjects(contentWalls);
    if (intersects.length > 0) {
      wallMaterial =
        wallMaterial === null ? intersects[0].object.material : wallMaterial;
      intersects[0].object.material = new THREE.MeshBasicMaterial({
        color: 0x32a852,
      });
    }
  });

  //Inventory modals
  const modal = document.getElementById('modal');

  const raycaster1 = new THREE.Raycaster();
  const mouse1 = new THREE.Vector2();

  window.addEventListener('click', (event) => {
    if (modal.style.display !== 'none') {
      modal.style.display = 'none';
    }
    mouse1.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse1.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster1.setFromCamera(mouse1, camera);

    const intersects1 = raycaster1.intersectObjects(contentWalls);

    if (intersects1.length > 0) {
      const photo = intersects1[0].object.userData.photo;
      const description = intersects1[0].object.userData.description;

      modal.style.display = 'flex';

      const content = document.getElementsByClassName('modal_content')[0];
      content.innerHTML = `<img alt="item" src="${photo}"/>`;
      content.innerHTML += `<p> ${description} </p>`;
    }
  });

  // Welcome Text
  scene.add(
    photoScroller(
      welcomeWallImages,
      wallSize,
      { x: 0, y: wallSize / 4, z: -wallSize / 2 + 0.52 },
      { x: Math.PI / 2, y: 0, z: 0 }, 
      reducer, 
      camera
    )
  );
};
