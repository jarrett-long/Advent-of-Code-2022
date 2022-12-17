import Point from './point.js'

export default (input) => {
  const steps = input.split('\n').map((line) => {
    const [dir, amt] = line.split(' ')
    return { dir, amt: parseInt(amt) }
  })

  const head = new Point(0, 0)
  const tail = new Point(0, 0)

  for (let step of steps) {
    for (let s = 0; s < step.amt; s++) {
      head.step(step.dir)
      if (!tail.isAdjTo(head)) {
        tail.step(tail.dirOf(head))
      }
    }
  }

  const answer = tail.history.size

  return `Total visited positions: ${answer}`
}
