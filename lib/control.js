const Storage = require('./storage')

class Control {
  constructor () {
    this.storage = new Storage()
  }

  create (content) {
    this.storage.save(content)
  }
}

module.exports = Control
