'use strict';

const path = require('path');
const createGraphqlClient = require('../graphql');
const queries = require('../graphql/queries');

module.exports = ({ queryName, filename } = {}) => {
  return (options = {}) => {
    const { login } = options;

    if (!login || typeof login !== 'string') {
      throw new Error(`Expected "login" to be a non-empty string`);
    }

    const client = createGraphqlClient();
    const datapath = path.join(login, ...[].concat(filename));
    return { datapath, run: () => queries[queryName](client, login, options) };
  };
};
