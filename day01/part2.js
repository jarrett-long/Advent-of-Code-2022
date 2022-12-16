export default function solve(input) {
  const sums = new Int32Array(
    input
      .split('\n\n')
      .map((group) => {
        return group
          .split('\n')
          .map((food) => parseInt(food))
          .reduce((a, v) => a + v, 0)
      })
      .filter((sum) => !isNaN(sum))
  )
    .sort()
    .reverse()

  const topThree = sums.slice(0, 3).reduce((a, v) => a + v, 0)

  return `Top 3 elves: ${topThree}`
}
