'use strict';

const fs = require('fs');
const path = require('path');

const createGraphqlClient = require('../graphql');
const queries = require('../graphql/queries');
const { paths } = require('../constants');
const { write } = require('../actions');

/**
 * Given a GitHub orgname, get all of the user's public repositories and save them in the specified JSON file.
 */

module.exports = async ({ orgname, filename = 'repos.json' }) => {
  if (!orgname) {
    throw new Error('Expected "orgname" to be specified');
  }

  const client = createGraphqlClient();
  const datapath = path.join(paths.DATA_DIR, orgname, filename);

  console.log(`Getting repositories for "${orgname}".`);
  const repos = await queries.getOrgRepos(client, orgname);

  return write(datapath, repos, 'repos');
};
