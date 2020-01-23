'use strict';

const write = require('write');

module.exports = (filepath, data) => {
  return write(filepath, JSON.stringify(data, null, 2)).then(() => data);
};
