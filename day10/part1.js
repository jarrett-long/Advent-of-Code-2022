import { EventEmitter } from 'node:events'

class ClockCircuit extends EventEmitter {}

export default (input) => {
  const tick = 'cycle'
  let cycle = 0
  let x = 1
  let sum = 0

  const clock = new ClockCircuit()
  clock.on(tick, () => {
    cycle++
    if (
      cycle == 20 ||
      cycle == 60 ||
      cycle == 100 ||
      cycle == 140 ||
      cycle == 180 ||
      cycle == 220
    ) {
      sum += x * cycle
    }
  })

  input.split('\n').forEach((line) => {
    const [ins, val] = line.split(' ')
    clock.emit(tick)
    if (ins == 'addx') {
      clock.emit(tick)
      x += parseInt(val)
    }
  })

  return `The signal strength is ${sum}`
}
