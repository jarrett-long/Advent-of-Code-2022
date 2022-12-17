import Point from './point.js'

export default (input) => {
  const steps = input.split('\n').map((line) => {
    const [dir, amt] = line.split(' ')
    return { dir, amt: parseInt(amt) }
  })

  const rope = [...Array(10)].map(() => new Point(0, 0))

  for (let step of steps) {
    for (let s = 0; s < step.amt; s++) {
      rope[0].step(step.dir)
      for (let i = 1; i < rope.length; i++) {
        let thisKnot = rope[i]
        let thatKnot = rope[i - 1]
        if (!thisKnot.isAdjTo(thatKnot)) {
          thisKnot.step(thisKnot.dirOf(thatKnot))
        }
      }
    }
  }

  const answer = rope.pop().history.size

  return `Total visited positions: ${answer}`
}
