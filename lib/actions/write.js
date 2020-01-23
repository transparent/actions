'use strict';

const write = require('write');

module.exports = (filepath, data, type) => {
  if (type) console.log(`Writing ${type} to: ${filepath}`);
  return write(filepath, JSON.stringify(data, null, 2)).then(() => data);
};
