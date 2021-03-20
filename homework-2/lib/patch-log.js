
const { join } = require('path');
const { config } = require('dotenv');
const chalk = require('chalk');


config({ path: join(__dirname, '../.env') });

const { COLOR } = process.env;

const log = console.log;

global.console.log = (...args) => {
  try {
    log(chalk[COLOR](JSON.stringify(args, null, 1)));
  } catch(err) {
    console.warn('Color is not valid');
    process.exit(1);
  }
};