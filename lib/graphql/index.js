'use strict';

const { graphql } = require('@octokit/graphql');

module.exports = config => {
  const options = { token: process.env.GITHUB_TOKEN, ...config };
  const headers = { authorization: `token ${options.token}` };
  delete options.token;

  const opts = { ...options, ...{ headers } };

  return (query, locals) => {
    return graphql(query, { ...opts, ...locals });
  };
};
