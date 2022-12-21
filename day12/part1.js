class Node {
  constructor(x, y, c) {
    this.x = x
    this.y = y
    this.c = c
    this.h = (c == 'S' ? 'a' : c == 'E' ? 'z' : c).charCodeAt()
    this.id = `(${x},${y})`
    this.count = 0
    this.prev = undefined
  }
}

export default (input) => {
  const heightMap = []
  const START = 'S'
  const END = 'E'
  let startNode = {}
  let endNode = {}
  const lines = input.split('\n')
  lines.reverse()
  lines.forEach((line, y) => {
    heightMap.push([])
    line.split('').forEach((c, x) => {
      const node = new Node(x, y, c)
      if (c == START) {
        startNode = node
      }
      if (c == END) {
        endNode = node
      }
      heightMap[y][x] = new Node(x, y, c)
    })
  })

  const render = (node) => {
    const map = [
      ...heightMap.map((line) =>
        line.map((n) => (node.id == n.id ? '#' : n.c))
      ),
    ]
    let prev = node.prev
    let curr = node
    while (prev != undefined) {
      let ch = '*'
      if (prev.y > curr.y) {
        ch = 'V'
      } else if (prev.y < curr.y) {
        ch = '^'
      } else if (prev.x > curr.x) {
        ch = '<'
      } else if (prev.x < curr.x) {
        ch = '>'
      }
      map[prev.y][prev.x] = ch
      curr = prev
      prev = prev.prev
    }
    const lines = map.map((line) => line.join('')).reverse()
    const str = lines.join('\n')
    console.log(str + '\n')
  }

  const getNextNodes = (current) => {
    let nextNodes = []
    if (current.y != 0) {
      nextNodes.push(heightMap[current.y - 1][current.x])
    }
    if (current.x != 0) {
      nextNodes.push(heightMap[current.y][current.x - 1])
    }
    if (current.y < heightMap.length - 1) {
      nextNodes.push(heightMap[current.y + 1][current.x])
    }
    if (current.x < heightMap[0].length - 1) {
      nextNodes.push(heightMap[current.y][current.x + 1])
    }

    nextNodes = nextNodes.filter((next) => next.h - current.h <= 1)

    // order the nodes that are closer to the end node first
    nextNodes.sort((na, nb) => {
      const dist = (nc, nd) => Math.sqrt(nc.x * nd.x + nc.y * nd.y)
      return dist(nb, endNode) - dist(na, endNode)
    })

    for (let next of nextNodes) {
      next.count = current.count + 1
    }

    return nextNodes
  }

  const search = () => {
    const unVisited = new Array()
    const visited = new Set()
    unVisited.push(startNode)
    while (unVisited.length > 0) {
      const current = unVisited.shift()
      if (visited.has(current.id)) continue
      visited.add(current.id)
      if (current.c == END) {
        return current
      }
      const nextNodes = getNextNodes(current).filter((n) => !visited.has(n.id))
      for (const next of nextNodes) {
        next.prev = current
        unVisited.push(next)
      }
    }
  }

  const result = search()

  render(result)

  return `Number of steps ${result?.count}`
}
