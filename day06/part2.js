import { isArrayUnique } from '../utils/arrays.js'

export default (input) => {
  const stream = input.split('')
  const getStartIndex = (stream) => {
    for (let i = 14; i < stream.length; i++) {
      const marker = []
      for (let j = i; j > i - 14; j--) {
        marker.push(stream[j])
      }
      if (isArrayUnique(marker)) {
        return i
      }
    }
  }

  const charsProcessed = getStartIndex(stream) + 1

  return `${charsProcessed} characters were processed before the first start-of-message marker was detecter`
}
