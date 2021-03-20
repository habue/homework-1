
const { join } = require('path');
const { config } = require('dotenv');
const chalk = require('chalk');


config({ path: join(__dirname, '../.env') });

// On my OS "COLOR" env is use
const { CONSOLE_COLOR } = process.env;

const log = console.log;

global.console.log = (...args) => {
  try {
    log(chalk[CONSOLE_COLOR](require('util').inspect(args, {depth: null})));
  } catch(err) {
    console.warn('Color is not valid');
    process.exit(1);
  }
};