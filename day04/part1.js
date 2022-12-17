export default (input) => {
  const getRange = (str) => {
    const [start, end] = str.split('-').map((c) => parseInt(c))
    return { start, end }
  }

  const fullyContains = ({ r1, r2 }) => {
    return (
      (r1.start <= r2.start && r1.end >= r2.end) ||
      (r2.start <= r1.start && r2.end >= r1.end)
    )
  }

  const total = input
    .split('\n')
    .map((line) => line.split(','))
    .map((pairArr) => ({ r1: getRange(pairArr[0]), r2: getRange(pairArr[1]) }))
    .reduce((count, pair) => (fullyContains(pair) ? ++count : count), 0)

  return `Total full overlaps: ${total}`
}
