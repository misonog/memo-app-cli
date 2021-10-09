const readline = require('readline')
const Control = require('./control')

class Command {
  constructor (list = false) {
    this.listOption = list
  }

  run () {
    if (this.listOption === true) {
      this.list()
    } else {
      this.getStdin().then((result) => {
        const control = new Control()
        control.create(result)
      })
    }
  }

  list () {
    const control = new Control()
    control.index().then(titles => {
      titles.forEach(title => {
        console.log(title)
      })
    })
  }

  async getStdin () {
    const lines = []
    const rl = readline.createInterface({
      input: process.stdin
    })

    for await (const line of rl) {
      lines.push(line)
    }

    return lines.join('\n')
  }
}

module.exports = Command
