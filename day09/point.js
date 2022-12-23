export default class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.history = new Set([this.pos()])
  }

  pos = () => `(${this.x},${this.y})`

  move = {
    U: (amt) => (this.y += amt),
    D: (amt) => (this.y -= amt),
    L: (amt) => (this.x -= amt),
    R: (amt) => (this.x += amt),
  }

  step(dir) {
    dir.split('').forEach((d) => {
      this.move[d](1)
    })
    this.history.add(this.pos())
  }

  dirOf(point) {
    const yDist = point.y - this.y
    const yDir = yDist > 0 ? 'U' : yDist < 0 ? 'D' : ''

    const xDist = point.x - this.x
    const xDir = xDist > 0 ? 'R' : xDist < 0 ? 'L' : ''

    return yDir + xDir
  }

  isAdjTo(point) {
    const yDist = Math.abs(this.y - point.y)
    const xDist = Math.abs(this.x - point.x)
    return yDist <= 1 && xDist <= 1
  }
}
