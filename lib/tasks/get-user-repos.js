'use strict';

const fs = require('fs');
const path = require('path');

const createGraphqlClient = require('../graphql');
const queries = require('../graphql/queries');
const { paths } = require('../constants');
const { write } = require('../utils');

/**
 * Given a GitHub username, get all of the user's public repositories and save them in the specified JSON file.
 */

module.exports = async ({ username, filename = 'repos.json' }) => {
  if (!username) {
    throw new Error('Expected "username" to be specified');
  }

  const client = createGraphqlClient();
  const datapath = path.join(paths.DATA_DIR, username, filename);

  console.log(`Getting repositories for "${username}".`);
  const repos = await queries.getUserRepos(client, username);

  return write(datapath, repos, 'repos');
};
