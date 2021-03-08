const { resolve } = require('path');
const { config } = require('dotenv');

config({ path: resolve(__dirname, '../.env.test') });

const { FIRST_NAME, LAST_NAME } = process.env;

exports.firstName = FIRST_NAME;
exports.lastName = LAST_NAME;