const sqlite3 = require('sqlite3').verbose()

class Storage {
  constructor () {
    this.db = new sqlite3.Database('./:memo_app.db:')
  }

  all () {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT rowid AS id, * FROM memo ORDER BY id', (err, rows) => {
        if (err) return reject(err)
        resolve(rows)
      })
    })
  }

  findById (id) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT content FROM memo WHERE rowid = ?', id, (err, row) => {
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

  destroy (id) {
    return new Promise((resolve, reject) => {
      try {
        this.db.run('DELETE FROM memo WHERE rowid = ?', id)
        return resolve()
      } catch (err) {
        return reject(err)
      }
    })
  }
}

module.exports = Storage
