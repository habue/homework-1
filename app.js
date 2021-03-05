const { firstName, lastName } = require('./lib/process-env');
const { argv } = require('./lib/process-argv');
const { returnOsInfo } = require('./lib/os-info');
require('./lib/patch-log');

console.short("Hello", 42, "world!");
console.log("env:", firstName, lastName);
returnOsInfo(argv);