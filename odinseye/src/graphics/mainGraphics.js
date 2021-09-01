import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const graphics = () => {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer();
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
  //camera.rotation.x = Math.PI / 2;
  

  const gridHelper = new THREE.GridHelper(100, 100);
  scene.add(gridHelper);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  //Structure
  const addStructure = (size) => {
    const wallTexture = new THREE.TextureLoader().load('castle_wall.jpg');
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

    const floorTexture = new THREE.TextureLoader().load('floor.jpg');
    geometry = new THREE.BoxGeometry(size, 1, size);
    material = new THREE.MeshBasicMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(geometry, material);
    scene.add(floor);
  };

  addStructure(50);

  //sky
  const skyTexture = new THREE.TextureLoader().load('sky.jpg');
  scene.background = skyTexture;

  //Particle Effect
  let particles = Array();

  const particleGen = () => {
    for (let i = 0; i < 500; i++) {
      const geometry = new THREE.SphereGeometry(.001, 24, 24);
      const material = new THREE.MeshBasicMaterial({ color: 0x2ec946 });
      const particle = {
        particle: new THREE.Mesh(geometry, material),
        coords: { x: 0, y: 0, z: 0 },
      };

      const x = THREE.MathUtils.randFloatSpread(200);
      const y = 100.5 + THREE.MathUtils.randFloatSpread(2);
      const z = 0;
      particle.particle.position.set(x, y, z);
      particle.coords = {x, y, z};

      scene.add(particle.particle);
      particles.push(particle);
    }
  };

  particleGen();

  const particleEffect = () => {
    particles.forEach(function(particle){
      particle.coords.x = particle.coords.x + .001; 
      particle.particle.position.x = 1.5 * Math.cos(particle.coords.x);
    });
    particles.forEach(function(particle){
      particle.coords.z = particle.coords.z + .001; 
      particle.particle.position.z = .01 * Math.cos(particle.coords.z);
    });
  };

  //Text 
  // const tLoader = new THREE.FontLoader(); 
  
  // tLoader.load('../fonts/Norse_Regular.json', function (font) {
  //   const tGeometry = {
  //     font: font,
  //     size: 80,
  //     height: 5,
  //     curveSegments: 12,
  //     bevelEnabled: true,
  //     bevelThickness: 10,
  //     bevelSize: 8,
  //     bevelOffset: 0,
  //     bevelSegments: 5
  //   };
  //   let textGeometry = new THREE.TextGeometry('Odin\'s Eye Black Smithing', tGeometry);
  //   let textMat = new THREE.MeshBasicMaterial({color: 0x2ec946});

  //   let text = new THREE.Mesh(textGeometry, textMat);

  //   text.position.set(0, 0, 0); 
  //   scene.add(text);
  // });

  //Move Camera
  const moveCamera = () => {
    const t = document.body.getBoundingClientRect().top;
    camera.rotation.y = camera.rotation.y - t * 1;
  };
  document.body.onscroll = moveCamera;

  
  //const controls = new OrbitControls(camera, renderer.domElement);

  // animate
  const animate = () => {
    requestAnimationFrame(animate);

    //controls
    //controls.update();
    particleEffect();

    renderer.render(scene, camera);
  };

  animate();
};
