const Storage = require('./storage')

class Control {
  constructor () {
    this.storage = new Storage()
  }

  async index () {
    const rows = await this.storage.all()
    const titles = []
    rows.forEach(row => {
      titles.push(row.content.split(/\r\n|\r|\n/)[0])
    })
    return titles
  }

  create (content) {
    this.storage.save(content)
  }
}

module.exports = Control
