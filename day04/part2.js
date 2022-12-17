export default (input) => {
  // str = "16-80"
  const getRange = (str) => {
    const [start, end] = str.split('-').map((c) => parseInt(c))
    return { start, end }
  }

  const overlap = ({ r1, r2 }) => {
    return !(r1.end < r2.start || r2.end < r1.start)
  }

  const total = input
    .split('\n')
    .map((line) => line.split(','))
    .map((pairArr) => ({ r1: getRange(pairArr[0]), r2: getRange(pairArr[1]) }))
    .reduce((count, pair) => (overlap(pair) ? ++count : count), 0)

  return `Total partial overlaps: ${total}`
}
