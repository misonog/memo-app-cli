const readline = require('readline')
const { Select } = require('enquirer')
const Control = require('./control')

class Command {
  constructor (list = false, reference = false) {
    this.listOption = list
    this.referenceOption = reference
  }

  run () {
    if (this.listOption === true) {
      this.list()
    } else if (this.referenceOption === true) {
      this.reference()
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

  async reference () {
    const control = new Control()
    const titles = await control.index()
    const prompt = new Select({
      name: 'reference',
      message: 'Choose a note you want to see:',
      choices: titles
    })

    prompt.run()
      .then(() => control.show(prompt.state.index + 1)
        .then(console.log))
      .catch(console.error)
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
