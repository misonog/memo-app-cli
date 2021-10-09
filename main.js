#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2))
const Command = require('./lib/command')

const command = new Command(argv.l)
command.run()
