export default (input) => {
  const grid = input
    .split('\n')
    .map((line) => line.split('').map((tree) => parseInt(tree)))

  const countVisible = (trees, tree) => {
    let visible = 0
    for (let t of trees) {
      visible++
      if (t >= tree) {
        break
      }
    }
    return visible
  }

  let highestScenicScore = 0

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const tree = grid[i][j]

      const upTrees = [...Array(i).keys()].reduce(
        (upTrees, k) => [...upTrees, grid[i - (k + 1)][j]],
        []
      )

      const rightTrees = [...Array(grid[i].length - j - 1).keys()].reduce(
        (rightTrees, k) => [...rightTrees, grid[i][j + k + 1]],
        []
      )

      const downTrees = [...Array(grid.length - i - 1).keys()].reduce(
        (downTrees, k) => [...downTrees, grid[i + k + 1][j]],
        []
      )

      const leftTrees = [...Array(j).keys()].reduce(
        (leftTrees, k) => [...leftTrees, grid[i][j - (k + 1)]],
        []
      )

      const scenicScore =
        countVisible(upTrees, tree) *
        countVisible(rightTrees, tree) *
        countVisible(downTrees, tree) *
        countVisible(leftTrees, tree)

      if (scenicScore > highestScenicScore) {
        highestScenicScore = scenicScore
      }
    }
  }

  return `The highest scenic score is ${highestScenicScore}`
}
