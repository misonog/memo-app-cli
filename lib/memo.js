const Storage = require('./memo-repository')

class Memo {
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

  async show (id) {
    const row = await this.storage.findById(id)
    return row.content
  }

  create (content) {
    this.storage.create(content)
  }

  async delete (id) {
    await this.storage.destroy(id)
  }
}

module.exports = Memo
