const chalk = require('chalk');
const { argv } = require('./process-argv');

const log = console.log;

global.console.short = (...args) => {
  if (!args || !args.length) return;

  const argsLength = args.length;
  const countToReplace = argsLength < 2 ? 0 : argsLength - 2;
  argsLength >= 2 && args.splice(1, countToReplace, "...");

  log(...args);
};


global.console.log = (...args) => {
  const { _ } = argv;
  const argvColor = _.find(arg => arg.toLowerCase().includes('color='));
  const colorName = argvColor && argvColor.split('=')[1];

  try {
    if (!colorName) return log(...args);
    
    log(chalk[colorName](...args));
  } catch(err) {
    console.warn('Color is not valid');
    process.exit(1);
  }
};