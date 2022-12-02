#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handler_1 = require("./handler");
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var path = require('path');
var program = require('commander');
var args = process.argv.slice(2);
clear();
console.log(chalk.green(figlet.textSync('sadaiv-ci', { horizontalLayout: 'full' })));
console.log(chalk.grey("Backup your opensource contributions on to the decentralize network."));
if (args.length > 0) {
    (0, handler_1.handler)(args[0], args.slice(1));
}
else {
    (0, handler_1.help)();
}
