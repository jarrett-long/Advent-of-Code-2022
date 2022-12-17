export default class Directory {
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
