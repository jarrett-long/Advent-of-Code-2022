class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

export default (input) => {
  const rockPoints = input.split('\n').map((line) =>
    line.split(' -> ').map((p) => {
      let [x, y] = p.split(',')
      return new Point(x, y)
    })
  )

  let hi = rockPoints
  // have at it
  return `part`
}
