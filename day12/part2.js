class Node {
  constructor(x, y, c) {
    this.x = x
    this.y = y
    this.c = c
    this.h = (c == 'S' ? 'a' : c == 'E' ? 'z' : c).charCodeAt()
    this.id = `(${x},${y})`
    this.count = 0
  }
}

export default (input) => {
  const heightMap = []
  const START = 'S'
  const END = 'E'
  let startNodes = []
  let endNode = {}
  const lines = input.split('\n')
  lines.reverse()
  lines.forEach((line, y) => {
    heightMap.push([])
    line.split('').forEach((c, x) => {
      const node = new Node(x, y, c)
      if (c == START || c == 'a') {
        startNodes.push(node)
      }
      if (c == END) {
        endNode = node
      }
      heightMap[y][x] = new Node(x, y, c)
    })
  })

  const getNextNodes = (node) => {
    let nextNodes = []
    if (node.y != 0) {
      nextNodes.push(heightMap[node.y - 1][node.x])
    }
    if (node.x != 0) {
      nextNodes.push(heightMap[node.y][node.x - 1])
    }
    if (node.y < heightMap.length - 1) {
      nextNodes.push(heightMap[node.y + 1][node.x])
    }
    if (node.x < heightMap[0].length - 1) {
      nextNodes.push(heightMap[node.y][node.x + 1])
    }

    nextNodes = nextNodes.filter((next) => next.h - node.h <= 1)

    // order the nodes that are closer to the end node first
    nextNodes.sort((na, nb) => {
      const dist = (nc, nd) => Math.sqrt(nc.x * nd.x + nc.y * nd.y)
      return dist(nb, endNode) - dist(na, endNode)
    })

    for (let n of nextNodes) {
      n.count = node.count + 1
    }

    return nextNodes
  }

  const search = (source) => {
    const unVisited = new Array()
    const visited = new Set()
    unVisited.push(source)
    while (unVisited.length > 0) {
      const current = unVisited.shift()
      if (visited.has(current.id)) continue
      visited.add(current.id)
      if (current.c == END) {
        return current
      }
      const nextNodes = getNextNodes(current)
      for (const next of nextNodes) {
        unVisited.push(next)
      }
    }
  }

  const results = []
  for (let s of startNodes) {
    // reset graph
    heightMap.forEach((line) => line.forEach((node) => (node.count = 0)))

    const r = { ...search(s) }

    results.push(r.count)
  }

  const result = results.sort((a, b) => a - b)[0]

  return `Number of steps ${result}`
}
