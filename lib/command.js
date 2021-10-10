const readline = require('readline')
const { prompt } = require('enquirer')
const Control = require('./control')

class Command {
  constructor (listOption = false, referenceOption = false, deleteOption = false) {
    this.listOption = listOption
    this.referenceOption = referenceOption
    this.deleteOption = deleteOption
  }

  run () {
    if (this.listOption === true) {
      this.list()
    } else if (this.referenceOption === true) {
      this.reference()
    } else if (this.deleteOption === true) {
      this.delete()
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

  async getSelectedTitleIndex (message) {
    const control = new Control()
    const titles = await control.index()
    const questions = [
      {
        type: 'select',
        name: 'reference',
        message: message,
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
    this.getSelectedTitleIndex('Choose a note you want to see:')
      // SQLite3のrowidで検索するため+1する
      .then(id => control.show(id + 1))
      .then(console.log)
  }

  delete () {
    const control = new Control()
    this.getSelectedTitleIndex('Choose a note you want to delete:')
      // SQLite3のrowidで検索するため+1する
      .then(id => control.delete(id + 1))
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
