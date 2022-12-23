export default (input) => {
  const IN_ORDER = 'IN ORDER'
  const OUT_OF_ORDER = 'OUT OF ORDER'
  const UNDECIDED = 'UNDECIDED'

  const loopDetermineOrder = (lArr, rArr) => {
    let result = UNDECIDED
    let i = 0
    while (result == UNDECIDED && i < lArr.length && i < rArr.length) {
      result = determineOrder(lArr[i], rArr[i])
      i++
    }
    if (result === UNDECIDED) {
      if (lArr[i] == undefined && rArr[i] == undefined) {
        return UNDECIDED
      }
      if (lArr[i] === undefined) {
        return IN_ORDER
      }
      if (rArr[i] === undefined) {
        return OUT_OF_ORDER
      }
    }

    return result
  }

  const determineOrder = (l, r) => {
    if (Number.isInteger(l) && Number.isInteger(r)) {
      return l == r ? UNDECIDED : l < r ? IN_ORDER : OUT_OF_ORDER
    }

    if (Number.isInteger(l) && !Number.isInteger(r)) {
      return loopDetermineOrder([l], r)
    }

    if (!Number.isInteger(l) && Number.isInteger(r)) {
      return loopDetermineOrder(l, [r])
    }

    return loopDetermineOrder(l, r)
  }

  const sum = input
    .split('\n\n')
    .map((pairTxt) => pairTxt.split('\n'))
    .map((pairArr) => [JSON.parse(pairArr[0]), JSON.parse(pairArr[1])])
    .map((p) => loopDetermineOrder(p[0], p[1]))
    .map((r, i) => (r == IN_ORDER ? i + 1 : 0))
    .reduce((sum, i) => sum + i, 0)

  return `The sum of the indexes of the in-order pairs is ${sum}`
}
