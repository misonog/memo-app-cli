const readline = require('readline')
const Control = require('./control')

class Command {
  constructor (argv) {
    this.argv = argv
  }

  run () {
    this.getStdin().then((result) => {
      const control = new Control()
      control.create(result)
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
