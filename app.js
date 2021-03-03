require('./lib/process-env');
require('./lib/patch-log');
const { argv } = require('./lib/process-argv');

console.short("Hello", 42, "world!");