import * as THREE from "three";

//Add the Smithy.
export const addStructure = (size) => {
  const wallTexture = new THREE.TextureLoader().load("castle_wall.jpg");
  let geometry = new THREE.BoxGeometry(size, 1, size / 2);
  let material = new THREE.MeshBasicMaterial({ map: wallTexture });

  let forge = Array();

  for (let i = 0; i < 4; i++) {
    const wall = new THREE.Mesh(geometry, material);
    wall.rotation.x = Math.PI / 2;
    wall.rotation.z = (Math.PI / 2) * (i + 1);
    wall.position.x = (-size / 2 + (size / 2) * i) * Math.ceil(1 - i / 3);
    wall.position.y = size / 4;
    wall.position.z = Math.ceil(1 - (3 - i) / 3) * size - (size / 2) * i;
    forge.push(wall);
  }

  const floorTexture = new THREE.TextureLoader().load("floor.jpg");
  geometry = new THREE.BoxGeometry(size, 1, size);
  material = new THREE.MeshBasicMaterial({ map: floorTexture });

  const floor = new THREE.Mesh(geometry, material);
  
  forge.push(floor);

  return forge;
};