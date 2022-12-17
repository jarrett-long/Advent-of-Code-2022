class Directory {
  constructor(name, parent) {
    this.name = name
    this.parent = parent
    this.folders = {}
    this.files = {}
  }

  addFolder(name) {
    this.folders[name] = new Directory(name, this)
  }

  addFile(name, size) {
    this.files[name] = size
  }

  getSize() {
    let total = Object.values(this.files).reduce((sum, size) => sum + size, 0)

    Object.values(this.folders).forEach((folder) => {
      let childFolderSize = folder.getSize()
      total += childFolderSize
    })

    return total
  }
}

export default (input) => {
  const root = new Directory('/', null)
  let cd = root // "current" directory
  for (const line of input.split('\n')) {
    if (line == '$ ls') {
      continue
    }
    if (line == '$ cd /') {
      cd = root
      continue
    }
    if (line == '$ cd ..') {
      cd = cd.parent
      continue
    }
    const segs = line.split(' ')
    if (segs[0] == '$' && segs[1] == 'cd') {
      cd = cd.folders[segs[2]]
      continue
    }
    if (segs[0] == 'dir') {
      cd.addFolder(segs[1])
      continue
    }
    let fileSize = parseInt(segs[0])
    if (!isNaN(fileSize)) {
      cd.addFile(segs[1], fileSize)
    }
  }

  const maxDirSize = 100000

  const dirsUnder100k = []

  const crawl = (dir) => {
    const size = dir.getSize()
    if (size <= maxDirSize) {
      dirsUnder100k.push(size)
    }

    Object.values(dir.folders).forEach((folder) => {
      crawl(folder)
    })
  }

  crawl(root)

  var totalSize = dirsUnder100k.reduce((sum, size) => sum + size, 0)

  return `The sum of all directories under 100,000 is: ${totalSize}`
}
