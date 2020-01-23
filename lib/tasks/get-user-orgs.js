'use strict';

const fs = require('fs');
const path = require('path');
const write = require('write');

const createGraphqlClient = require('../graphql');
const queries = require('../graphql/queries');
const { paths } = require('../constants');

/**
 * Given a GitHub username, get all of the user's public organizations and save them in the specified JSON file.
 */

module.exports = async ({ username, filename = 'orgs.json' }) => {
  if (!username) {
    throw new Error('Expected "username" to be specified');
  }

  const client = createGraphqlClient(process.env.GITHUB_TOKEN);

  console.log(`Getting organizations for "${username}".`);
  const orgs = await queries.getUserOrgs(client, username);
  const datapath = path.join(paths.DATA_DIR, username, filename);

  console.log(`Writing organizations to: ${datapath}`);
  return write(datapath, JSON.stringify(orgs, null, 2)).then(() => orgs);
};
