'use strict';

const fs = require('fs');
const path = require('path');
const write = require('write');

const createGraphqlClient = require('../graphql');
const queries = require('../graphql/queries');
const { paths } = require('../constants');

/**
 * Given a GitHub orgname, get all of the user's public repositories and save them in the specified JSON file.
 */

module.exports = async ({ orgname, filename = 'repos.json' }) => {
  if (!orgname) {
    throw new Error('Expected "orgname" to be specified');
  }

  const client = createGraphqlClient(process.env.GITHUB_TOKEN);

  console.log(`Getting repositories for "${orgname}".`);
  const repos = await queries.getOrgRepos(client, orgname);
  const datapath = path.join(paths.DATA_DIR, orgname, filename);

  console.log(`Writing repos to: ${datapath}`);
  return write(datapath, JSON.stringify(repos, null, 2)).then(() => repos);
};
