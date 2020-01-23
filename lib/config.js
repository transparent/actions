'use strict';

let env;
try {
  env = require('../tmp/env');
} catch (err) { /* ignore */ }

const constants = require('./constants');
const argv = require('minimist')(process.argv.slice(2));

module.exports = { ...constants, ...env, ...argv };
