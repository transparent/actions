'use strict';

const write = require('write');
const { writeJson } = require('../utils');

module.exports = (filepath, data, type) => {
  if (type) console.log(`Writing ${type} to: ${filepath}`);
  return writeJson(filepath, data).then(() => data);
};
