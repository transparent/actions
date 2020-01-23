'use strict';

const fs = require('fs');
const path = require('path');
const write = require('write');

const createGraphqlClient = require('../graphql');
const queries = require('../graphql/queries');
const { paths } = require('../constants');

/**
 * Given a GitHub username, get all of the user's public repositories and save them in the specified JSON file.
 */

module.exports = async ({ username, filename = 'repos.json' }) => {
  if (!username) {
    throw new Error('Expected "username" to be specified');
  }

  const client = createGraphqlClient(process.env.GITHUB_TOKEN);

  console.log(`Getting repositories for "${username}".`);
  const repos = await queries.getUserRepos(client, username);
  const datapath = path.join(paths.DATA_DIR, username, filename);

  console.log(`Writing repositories to: ${datapath}`);
  return write(datapath, JSON.stringify(repos, null, 2)).then(() => repos);
};
