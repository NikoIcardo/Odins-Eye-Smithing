import * as THREE from "three";

export const contentWall = (size, position, rotation, reducer = 0, orientation = 'x', photo, description = '') => {

  const boardSize = size * reducer; 
  //position.x = position.x + boardSize * .05; // This aligns the left side of the frame with the x value passed in. 

  const wallTexture = new THREE.TextureLoader().load(photo);
  let geometry = new THREE.BoxGeometry(boardSize, 0, boardSize / 2); 
  let material = new THREE.MeshBasicMaterial({map: wallTexture}); 

  const wall = new THREE.Mesh(geometry, material); 

  wall.rotation.x = rotation.x;
  wall.rotation.y = rotation.y; 
  wall.rotation.z = rotation.z; 

  wall.position.x = position.x; 
  wall.position.y = position.y;
  wall.position.z = position.z;

  wall.userData = {photo: photo, description: description};
  let plankLength = 0; 
  let plankWidth = 0; 
  let planks = Array();
  
  for(let i = 0; i < 4; i++){

    plankLength = (boardSize) * (i % 2) > 0 ? (boardSize) * (i % 2) + boardSize * .05: boardSize * .05; 
    plankWidth = (boardSize / 2) * ((i + 1) % 2) > 0 ? (boardSize / 2) * ((i + 1) % 2) - boardSize * .05: boardSize * .05;

    let plankGeometry = new THREE.BoxGeometry(plankLength, .5, plankWidth);
    const plankTexture = new THREE.TextureLoader().load('./wall/plank.jpg');
    let plankMaterial = new THREE.MeshBasicMaterial({map: plankTexture}); 

    const plank = new THREE.Mesh(plankGeometry, plankMaterial);

    plank.rotation.x = rotation.x;
    plank.rotation.y = rotation.y; 
    plank.rotation.z = rotation.z; 

    if(orientation === 'x') {
      plank.position.x = i < 2 ? (position.x + ((i + 1) % 2) * boardSize / 2) : (position.x - ((i + 1) % 2) * boardSize / 2);
      plank.position.y = i < 2 ? position.y + ((i % 2) * boardSize / 4) : position.y - ((i % 2) * boardSize / 4);
      plank.position.z = position.z;
    } else {
      plank.position.z = i < 2 ? (position.z + ((i + 1) % 2) * boardSize / 2) : (position.z - ((i + 1) % 2) * boardSize / 2);
      plank.position.y = i < 2 ? position.y + ((i % 2) * boardSize / 4) : position.y - ((i % 2) * boardSize / 4);
      plank.position.x = position.x;
    }
    planks.push(plank);
  }

  return {wall, planks}; 
};