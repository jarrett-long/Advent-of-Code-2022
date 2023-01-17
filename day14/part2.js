import { range } from 'lodash-es'

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  static parse(pointStr) {
    const [x, y] = pointStr.split(',')
    return new Point(parseInt(x), parseInt(y))
  }

  id = () => `${this.x},${this.y}`

  down = () => new Point(this.x, this.y + 1)

  downLeft = () => new Point(this.x - 1, this.y + 1)

  downRight = () => new Point(this.x + 1, this.y + 1)

  move = (point) => {
    this.x = point.x
    this.y = point.y
  }
}

export default (input) => {
  let lowestY = 0
  const caveMap = input.split('\n').reduce((map, line) => {
    const coords = line
      .split(' -> ')
      .map((p) => Point.parse(p))
      .reduce((arr, point) => {
        if (arr.length == 0) return [point]
        const lastPoint = arr[arr.length - 1]
        return [
          ...arr,
          ...range(lastPoint.x, point.x, Math.sign(point.x - lastPoint.x)).map(
            (x) => new Point(x, point.y)
          ),
          ...range(lastPoint.y, point.y, Math.sign(point.y - lastPoint.y)).map(
            (y) => new Point(point.x, y)
          ),
          point,
        ]
      }, [])

    for (const point of coords) {
      map.set(point.id(), point)
      lowestY = point.y > lowestY ? point.y : lowestY
    }

    return map
  }, new Map())

  const floorY = lowestY + 2

  const dropSand = () => {
    const grain = new Point(500, 0)
    while (grain.y < floorY) {
      if (grain.down().y === floorY) {
        break
      }
      if (!caveMap.has(grain.down().id())) {
        grain.move(grain.down())
        continue
      }
      if (!caveMap.has(grain.downLeft().id())) {
        grain.move(grain.downLeft())
        continue
      }
      if (!caveMap.has(grain.downRight().id())) {
        grain.move(grain.downRight())
        continue
      }
      break
    }
    return grain
  }

  let count = 0
  let restingPlace = dropSand()
  while (restingPlace.id() != new Point(500, 0).id()) {
    count++
    caveMap.set(restingPlace.id(), restingPlace)
    restingPlace = dropSand()
  }

  count++

  // have at it
  return `A total of ${count} grains of sand fell before falling to the abyss`
}
