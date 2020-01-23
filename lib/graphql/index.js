'use strict';

const { graphql } = require('@octokit/graphql');

module.exports = (token, options) => {
  const headers = { authorization: `token ${token}` };
  const opts = { ...options, ...{ headers } };

  return (query, locals) => {
    return graphql(query, { ...opts, ...locals });
  };
};
