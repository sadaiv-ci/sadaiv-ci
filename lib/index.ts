#!/usr/bin/env node
import { handler, help } from './handler'
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');

const args = process.argv.slice(2);

clear();
console.log(
  chalk.green(
    figlet.textSync('sadaiv-ci', { horizontalLayout: 'full' })
  )
);
console.log(chalk.grey("Backup your opensource contributions on to the decentralize network."))

if(args.length > 0){
  handler(args[0], args.slice(1));
} else {
  help();
}