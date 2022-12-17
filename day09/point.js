export default class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.history = new Set([this.pos()])
  }

  pos = () => `(${this.x},${this.y})`

  up(amt) {
    this.y += amt
  }

  right(amt) {
    this.x += amt
  }

  down(amt) {
    this.y -= amt
  }

  left(amt) {
    this.x -= amt
  }

  step(dir) {
    switch (dir) {
      case 'U':
        this.up(1)
        break
      case 'R':
        this.right(1)
        break
      case 'D':
        this.down(1)
        break
      case 'L':
        this.left(1)
        break
      case 'UR':
        this.up(1)
        this.right(1)
        break
      case 'UL':
        this.up(1)
        this.left(1)
        break
      case 'DR':
        this.down(1)
        this.right(1)
        break
      case 'DL':
        this.down(1)
        this.left(1)
        break
    }
    this.history.add(this.pos())
  }

  dirOf(point) {
    let dir = ''

    const yDist = point.y - this.y
    if (yDist != 0) {
      if (yDist > 0) {
        dir += 'U'
      } else {
        dir += 'D'
      }
    }

    const xDist = point.x - this.x
    if (xDist != 0) {
      if (xDist > 0) {
        dir += 'R'
      } else {
        dir += 'L'
      }
    }

    return dir
  }

  isAdjTo(point) {
    const yDist = Math.abs(this.y - point.y)
    const xDist = Math.abs(this.x - point.x)
    return yDist <= 1 && xDist <= 1
  }
}
