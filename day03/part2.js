import { readLines } from '../utils/input-helper.js'
import { sumArray } from '../utils/sum.js'
import { chunk } from '../utils/chunk.js'

export default (input) => {
  const priority = (char) => {
    const point = char.codePointAt(0)
    return point < 97 ? point - 38 : point - 96
  }

  const rucksack = (line) => line.split('').map((c) => priority(c))

  const rucksacks = readLines(input).map((l) => rucksack(l))

  const groups = chunk(rucksacks, 3)

  const duplicateItems = groups.map(
    (group) =>
      group[0].filter((p) => group[1].includes(p) && group[2].includes(p))[0]
  )

  const sum = sumArray(duplicateItems)

  return `Sum: ${sum}`
}
