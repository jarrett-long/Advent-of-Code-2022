import Directory from './directory.js'

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

  const totalDiskSpace = 70000000

  const spaceRequired = 30000000

  const unusedSpace = totalDiskSpace - root.getSize()

  const requiredForDeletion = spaceRequired - unusedSpace

  const candidates = []

  const crawl = (dir) => {
    const size = dir.getSize()
    if (size > requiredForDeletion) {
      candidates.push(dir)
    }

    Object.entries(dir.folders).forEach(([_, folder]) => {
      crawl(folder)
    })
  }

  crawl(root)

  candidates.sort((a, b) => a.getSize() - b.getSize())

  var totalSize = candidates[0].getSize()

  return `The total size of the directory to delete is: ${totalSize}`
}
