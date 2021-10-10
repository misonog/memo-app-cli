const readline = require('readline')
const { prompt } = require('enquirer')
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

  async getSelectedTitleIndex () {
    const control = new Control()
    const titles = await control.index()
    const questions = [
      {
        type: 'select',
        name: 'reference',
        message: 'Choose a note you want to see:',
        choices: titles,
        result (value) {
          // 選択されたchoice objectを返す
          // https://github.com/enquirer/enquirer/issues/51
          return this.choices.find(choice => choice.name === value)
        }
      }
    ]

    const answer = await prompt(questions)
    return answer.reference.index
  }

  reference () {
    const control = new Control()
    this.getSelectedTitleIndex()
      // SQLite3のrowidで検索するため+1する
      .then(id => control.show(id + 1))
      .then(console.log)
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
