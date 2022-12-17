import { isNullOrWhitespace } from '../utils/strings.js'

export default (input) => {
  const [stacksTxt, proceduresTxt] = input.split('\n\n')

  const stacksLines = stacksTxt.split('\n')

  const stackNumbers = stacksLines
    .pop()
    .split(' ')
    .filter((x) => !isNullOrWhitespace(x))
    .reduce((o, p) => ({ ...o, [p]: [] }), {})

  while (stacksLines.length > 0) {
    let line = stacksLines.pop().split('')
    line.forEach((c, i) => {
      if (c == '[') {
        stackNumbers[Math.floor(i / 4) + 1].push(line[i + 1])
      }
    })
  }

  proceduresTxt.split('\n').forEach((prodecureLine) => {
    var [_, amt, _, stackA, _, stackB] = prodecureLine.split(' ')
    for (let i = 0; i < amt; i++) {
      stackNumbers[stackB].push(stackNumbers[stackA].pop())
    }
  })

  const answer = Object.entries(stackNumbers).reduce(
    (topCrates, [_, crates]) => topCrates + crates[crates.length - 1],
    ''
  )

  return `The crates that end up on top of each stack are: ${answer}`
}
