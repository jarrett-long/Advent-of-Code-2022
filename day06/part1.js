import { isArrayUnique } from '../utils/arrays.js'

export default (input) => {
  const stream = input.split('')
  const getStartIndex = (stream) => {
    for (let i = 3; i < stream.length; i++) {
      if (
        isArrayUnique([stream[i], stream[i - 1], stream[i - 2], stream[i - 3]])
      ) {
        return i
      }
    }
  }

  const charsProcessed = getStartIndex(stream) + 1

  return `${charsProcessed} characters were processed before the first start-of-packet marker was detecter`
}
