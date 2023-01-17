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
  const allRockLines = input
    .split('\n')
    .map((line) => line.split(' -> ').map((pointStr) => Point.parse(pointStr)))

  const invalidPointsIds = Array.from(
    new Set(
      Array.from(new Set(input.split('\n')))
        .map((line) =>
          line
            .split(' -> ')
            .map((pointStr) => Point.parse(pointStr))
            .reduce((arr, point) => {
              if (arr.length == 0) return [point]
              const lastPoint = arr[arr.length - 1]
              return [
                ...arr,
                ...range(
                  lastPoint.x,
                  point.x,
                  Math.sign(point.x - lastPoint.x)
                ).map((x) => new Point(x, point.y)),
                ...range(
                  lastPoint.y,
                  point.y,
                  Math.sign(point.y - lastPoint.y)
                ).map((y) => new Point(point.x, y)),
                point,
              ]
            }, [])
        )
        .flat()
        .map((point) => point.id())
    )
  )

  // actually "highest" bc of how the grid system works
  const lowestY = invalidPointsIds.reduce(
    (lowest, pointId) =>
      Point.parse(pointId).y > lowest ? Point.parse(pointId).y : lowest,
    0
  )

  const dropSand = () => {
    let grain = new Point(500, 0)
    while (grain.y < lowestY) {
      if (!invalidPointsIds.includes(grain.down().id())) {
        grain.move(grain.down())
        continue
      }
      if (!invalidPointsIds.includes(grain.downLeft().id())) {
        grain.move(grain.downLeft())
        continue
      }
      if (!invalidPointsIds.includes(grain.downRight().id())) {
        grain.move(grain.downRight())
        continue
      }
      return grain.id()
    }
    return undefined
  }

  let count = 0
  let restingPlace = dropSand()
  while (restingPlace != undefined) {
    count++
    invalidPointsIds.push(restingPlace)
    restingPlace = dropSand()
  }

  // have at it
  return `A total of ${count} grains of sand fell before falling to the abyss`
}
