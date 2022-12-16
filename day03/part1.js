import { readLines } from '../utils/input-helper.js'
import { sumArray } from '../utils/sum.js'

export default (input) => {
  const priority = (char) => {
    const point = char.codePointAt(0)
    return point < 97 ? point - 38 : point - 96
  }

  const rucksack = (line) => ({
    c1: line
      .substr(0, line.length / 2)
      .split('')
      .map((c) => priority(c)),
    c2: line
      .substr(line.length / 2)
      .split('')
      .map((c) => priority(c)),
  })

  const rucksacks = readLines(input).map((l) => rucksack(l))

  const duplicateItems = rucksacks.map(
    (r) => r.c1.filter((p) => r.c2.includes(p))[0]
  )

  const sum = sumArray(duplicateItems)

  return `Sum: ${sum}`
}
