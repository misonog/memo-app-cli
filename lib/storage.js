const sqlite3 = require('sqlite3').verbose()

class Storage {
  constructor () {
    this.db = new sqlite3.Database('./:memo_app.db:')
  }

  all () {
    const db = this.db
    return new Promise((resolve, reject) => {
      db.all('SELECT rowid AS id, * FROM memo ORDER BY id', (err, rows) => {
        if (err) return reject(err)
        resolve(rows)
      })
    })
  }

  findById (id) {
    const db = this.db
    return new Promise((resolve, reject) => {
      db.get('SELECT content FROM memo WHERE rowid = ?', id, (err, row) => {
        if (err) return reject(err)
        resolve(row)
      })
    })
  }

  create (content) {
    const stmt = this.db.prepare('INSERT INTO memo VALUES (?)')
    stmt.run(content)
    stmt.finalize()
  }
}

module.exports = Storage
