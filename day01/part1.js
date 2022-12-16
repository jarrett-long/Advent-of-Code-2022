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

  const max = sums[0]

  return `Elf with the most goodies: ${max}`
}
