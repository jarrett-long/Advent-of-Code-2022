import { EventEmitter } from 'node:events'

class ClockCircuit extends EventEmitter {}

export default (input) => {
  const tick = 'cycle'
  let x = 1
  let cycle = 0
  const crtPos = () => cycle % 40
  const crtRow = () => Math.floor(cycle / 40) % 6
  const sprite = () => [x - 1, x, x + 1]
  const crt = [[], [], [], [], [], []]
  const render = () => crt.map((px) => px.join('') + '\n').join('')

  const clock = new ClockCircuit()
  clock.on(tick, () => {
    crt[crtRow()][crtPos()] = sprite().includes(crtPos()) ? '#' : '.'
    cycle++
  })

  input.split('\n').forEach((line) => {
    const [ins, val] = line.split(' ')
    clock.emit(tick)
    if (ins == 'addx') {
      clock.emit(tick)
      x += parseInt(val)
    }
  })

  return render()
}
