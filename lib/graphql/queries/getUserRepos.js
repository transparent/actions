'use strict';

module.exports = async (client, login) => {
  const query = `
query ($login: String!, $after: String) {
  user(login: $login) {
    repositories(first: 100, isFork: false, privacy: PUBLIC, after: $after) {
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
        }
      }
    }
  }
}
      `;

  let after = '';
  let repos = [];
  let hasNextPage = false;

  do {
    const options = { login };
    if (after) options.after = after;
    const { user } = await client(query, options);
    const { repositories } = user;
    const { totalCount, pageInfo, edges } = repositories;

    repos = repos.concat(edges.map(({ node }) => node));
    after = pageInfo.endCursor;
    hasNextPage = pageInfo.hasNextPage;
  } while (hasNextPage);

  return repos;
};
