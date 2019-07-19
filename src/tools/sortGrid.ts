function sortGrid(grid: any[][], index: number, isRow: boolean, sortFunc: (arr: any[]) => any[]): any[][] {
  let clonedGrid = JSON.parse(JSON.stringify(grid))
  if (isRow) {
    return sort(clonedGrid)
  } else {
    const newGrid = transpose(clonedGrid);
    return transpose(sort(newGrid))
  }

  function sort(_grid: any[][]) {
    _grid[index] = sortFunc(_grid[index])
    return _grid
  }
}

function transpose(grid: any[][]) {
  const newGrid: any[][] = [];
  grid[0].forEach(() => {
    newGrid.push([])
  });

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      newGrid[j][i] = grid[i][j];
    }
  }
  return newGrid;

}

export default sortGrid