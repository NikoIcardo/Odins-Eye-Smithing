import * as THREE from "three";

export const contentWall = (size, position, content) => {

  const wallTexture = new THREE.TextureLoader().load(`${content}`);
  let geometry = new THREE.BoxGeometry(size, 0, size / 2); 
  let material = new THREE.MeshBasicMaterial({map: wallTexture}); 

  const wall = new THREE.Mesh(geometry, material); 
  wall.rotation.x = Math.PI / 2;
  wall.position.x = position.x; 
  wall.position.y = position.y;
  wall.position.z = position.z;

  return wall; 
};