'use strict';

module.exports = async (client, login) => {
  const query = `
query ($login: String!, $after: String) {
  organization(login: $login) {
    repositories(first: 100, after: $after, isFork: false, isLocked: false, privacy: PUBLIC) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          id
          name
          nameWithOwner
          owner {
            login
          }
        }
      }
    }
  }
}`;

  let after = '';
  let repos = [];
  let hasNextPage = false;

  do {
    const options = { login };
    if (after) options.after = after;
    const { organization } = await client(query, options);
    const { repositories } = organization;
    const { totalCount, pageInfo, edges } = repositories;

    repos = repos.concat(edges.map(({ node }) => node));
    after = pageInfo.endCursor;
    hasNextPage = pageInfo.hasNextPage;
  } while (hasNextPage);

  return repos;
};
