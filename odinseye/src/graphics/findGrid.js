export const findGrid = (wallSize, partitions, reducer, nearest_square_root) => {

  const unit_Size = (wallSize / nearest_square_root)

  // Shifting the grid to center the objects hanging on it. 
  const shiftI = (wallSize / (nearest_square_root + 2)) * reducer - (wallSize / 2);
  const shiftJ = ((wallSize / (nearest_square_root + 2)) * reducer + (wallSize / 2) / 2);

  let grid = Array();

  for (let j = 0; j < nearest_square_root; j++) {
    for(let i = 0; i < nearest_square_root; i++) {
      grid.push({i: (i * unit_Size) + shiftI, j: (shiftJ) - (j * unit_Size / 2)}); 
    }
  }
  
  return grid; 
};