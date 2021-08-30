import React, { useRef }from 'react';
import './App.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


function App() {
  const canvas = useRef();


  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas.current,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 0;
  camera.position.y = 300;
  camera.rotation.y = Math.PI / 2;

  const gridHelper = new THREE.GridHelper(100, 100);
  scene.add(gridHelper);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight); 

  //Structure 
  const addStructure = (size) => {
    const wallTexture = new THREE.TextureLoader().load('castle_wall.jpg'); 
    let geometry = new THREE.BoxGeometry(size, 1, size/2); 
    let material = new THREE.MeshBasicMaterial({map: wallTexture});

    for(let i = 0; i < 4; i++){
      const wall = new THREE.Mesh(geometry, material);
      wall.rotation.x = Math.PI / 2
      wall.rotation.z = (Math.PI / 2) * (i + 1); 
      wall.position.x = ((-size / 2) + (size / 2 * i)) * Math.ceil((1 - (i / 3)));
      wall.position.y = size / 4;
      wall.position.z = Math.ceil((1 - ((3 - i) / 3))) * (size) - ((size / 2) * (i));
      console.log(wall.position.z);
      scene.add(wall);
    }

    const floorTexture = new THREE.TextureLoader().load('floor.jpg');
    geometry = new THREE.BoxGeometry(size, 1, size); 
    material = new THREE.MeshBasicMaterial({map: floorTexture});
    const floor = new THREE.Mesh(geometry, material);
    scene.add(floor);
  }

  addStructure(50);

  //sky 
  const skyTexture = new THREE.TextureLoader().load('sky.jpg');
  scene.background = skyTexture;
  

  //Camera 
  const moveCamera = () => {

    const t = document.body.getBoundingClientRect().top;
    
    
    camera.rotation.y = camera.rotation.y - (t * 1);

  }
  document.body.onscroll = moveCamera;

  //const controls = new OrbitControls(camera, renderer.domElement);
  // animate
  const animate = () => {
    requestAnimationFrame(animate);
  
    //controls
    //controls.update();

    renderer.render(scene, camera);
  };

  animate();

  return <main>
    <section>
      <h1>Hello</h1>
      <canvas ref={canvas} id="bg"></canvas>
    </section>
  </main>;
}

export default App;
