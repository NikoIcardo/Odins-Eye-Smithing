import * as THREE from "three";

export const contentWall = (size, position, content) => {

  const boardSize = size * .8; 

  const wallTexture = new THREE.TextureLoader().load('sign.jpg');
  let geometry = new THREE.BoxGeometry(boardSize, 0, boardSize / 2); 
  let material = new THREE.MeshBasicMaterial({map: wallTexture}); 

  const wall = new THREE.Mesh(geometry, material); 

  wall.rotation.x = Math.PI / 2;
  wall.position.x = position.x; 
  wall.position.y = position.y;
  wall.position.z = position.z;

  let plankLength = 0; 
  let plankWidth = 0; 
  let planks = Array();
  for(let i = 0; i < 4; i++){

    plankLength = (boardSize) * (i % 2) > 0 ? (boardSize) * (i % 2) + boardSize * .05: boardSize * .05; 
    plankWidth = (boardSize / 2) * ((i + 1) % 2) > 0 ? (boardSize / 2) * ((i + 1) % 2) - boardSize * .05: boardSize * .05;

    let plankGeometry = new THREE.BoxGeometry(plankLength, .5, plankWidth);
    const plankTexture = new THREE.TextureLoader().load('plank.jpg');
    let plankMaterial = new THREE.MeshBasicMaterial({map: plankTexture}); 

    const plank = new THREE.Mesh(plankGeometry, plankMaterial);
    plank.rotation.x = Math.PI / 2;
    plank.position.x = i < 2 ? (position.x + ((i + 1) % 2) * boardSize / 2): -1 * (position.x + ((i + 1) % 2) * boardSize / 2);
    plank.position.y = i < 2 ? position.y + ((i % 2) * boardSize / 4): position.y - ((i % 2) * boardSize / 4);
    plank.position.z = position.z;

    planks.push(plank);
  }

  return {wall, planks}; 
};