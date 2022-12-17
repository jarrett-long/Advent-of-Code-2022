export default (input) => {
  const grid = input
    .split('\n')
    .map((line) => line.split('').map((tree) => parseInt(tree)))

  // perimeter - 4 double-counted corners
  let visibleTrees = (grid.length + grid[0].length) * 2 - 4

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      const tree = grid[i][j]

      const hiddenUp = [...Array(i).keys()]
        .reduce((upTrees, t) => [...upTrees, grid[i - (t + 1)][j]], [])
        .some((t) => t >= tree)

      const hiddenRight = [...Array(grid[i].length - j - 1).keys()]
        .reduce((rightTrees, t) => [...rightTrees, grid[i][j + t + 1]], [])
        .some((t) => t >= tree)

      const hiddenDown = [...Array(grid.length - i - 1).keys()]
        .reduce((downTrees, t) => [...downTrees, grid[i + t + 1][j]], [])
        .some((t) => t >= tree)

      const hiddenLeft = [...Array(j).keys()]
        .reduce((leftTrees, t) => [...leftTrees, grid[i][j - (t + 1)]], [])
        .some((t) => t >= tree)

      if (!hiddenUp || !hiddenRight || !hiddenDown || !hiddenLeft) {
        visibleTrees++
      }
    }
  }

  return `The number of visible trees is ${visibleTrees}`
}
