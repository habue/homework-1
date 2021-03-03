const chalk = require('chalk');

global.console.short = (...args) => {
    if (!args) return;

    const argsLength = args.length;
    const countToReplace = argsLength < 2 ? 0 : argsLength - 2;
    argsLength >= 2 && args.splice(1, countToReplace, "...");

    argsLength && console.log(...args);
}

// global.console.log = () =>