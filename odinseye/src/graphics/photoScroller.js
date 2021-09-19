import * as THREE from 'three';

export const photoScroller = (images, size, position, rotation, reducer, camera) => {
  let count = 0; 

  const boardSize = size * reducer;

  let photo = new THREE.TextureLoader().load(images[count]);
  let geometry = new THREE.BoxGeometry(boardSize * .95, 0, boardSize * .45); 
  let material = new THREE.MeshBasicMaterial({map: photo});

  const wall = new THREE.Mesh(geometry, material); 

  console.log(images[0]);
  wall.rotation.x = rotation.x;
  wall.rotation.y = rotation.y; 
  wall.rotation.z = rotation.z; 

  wall.position.x = position.x; 
  wall.position.y = position.y;
  wall.position.z = position.z;

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  window.addEventListener('click', event => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera); 

    if(raycaster.intersectObject(wall)){
      count = (count + 1) % images.length;
    }

    photo = new THREE.TextureLoader().load(images[count]);
    material = new THREE.MeshBasicMaterial({map: photo});
    wall.material = material; 
  });

  return wall; 
}; 