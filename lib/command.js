const readline = require('readline')
const { prompt } = require('enquirer')
const Control = require('./control')

class Command {
  constructor (listOption = false, referenceOption = false, deleteOption = false) {
    this.listOption = listOption
    this.referenceOption = referenceOption
    this.deleteOption = deleteOption
  }

  async run () {
    if (this.listOption) {
      await this.list()
    } else if (this.referenceOption) {
      await this.reference()
    } else if (this.deleteOption) {
      await this.delete()
    } else {
      const result = await this.getStdin()
      const control = new Control()
      control.create(result)
    }
  }

  async list () {
    const control = new Control()
    try {
      const titles = await control.index()
      titles.forEach(title => {
        console.log(title)
      })
    } catch (err) {
      console.error(err.message)
    }
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

  async reference () {
    const control = new Control()
    try {
      const id = await this.getSelectedTitleIndex('Choose a note you want to see:')
      // SQLite3のrowidで検索するため+1する
      console.log(await control.show(id + 1))
    } catch (err) {
      console.error(err.message)
    }
  }

  async delete () {
    const control = new Control()
    const id = await this.getSelectedTitleIndex('Choose a note you want to delete:')
    // SQLite3のrowidで検索するため+1する
    await control.delete(id + 1)
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
