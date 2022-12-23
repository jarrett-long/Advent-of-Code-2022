export default (input) => {
  const IN_ORDER = -1
  const OUT_OF_ORDER = 1
  const UNDECIDED = 0

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

  let packets = input
    .split('\n\n')
    .flatMap((pair) => pair.split('\n'))
    .map((packet) => JSON.parse(packet))

  packets.push([[2]])

  packets.push([[6]])

  packets.sort((a, b) => loopDetermineOrder(a, b))

  const idx2 =
    1 +
    packets.findIndex(
      (x) => x[0] != undefined && x[0].length == 1 && x[0][0] === 2
    )

  const idx6 =
    1 +
    packets.findIndex(
      (x) => x[0] != undefined && x[0].length == 1 && x[0][0] === 6
    )

  const decoderKey = idx2 * idx6

  return `The decoder key of the distress signal is ${decoderKey}`
}
