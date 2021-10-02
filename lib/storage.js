const sqlite3 = require('sqlite3').verbose()

class Storage {
  constructor () {
    this.db = new sqlite3.Database('./:memo_app.db:')
  }

  save (content) {
    const stmt = this.db.prepare('INSERT INTO memo VALUES (?)')
    stmt.run(content)
    stmt.finalize()
  }
}

module.exports = Storage
