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
}`;

  let after;
  let data = [];
  let hasNextPage = false;

  console.log(`Getting repositories for "${login}".`);

  do {
    const options = { login, after };
    const { user } = await client(query, options);
    const { totalCount, pageInfo, edges } = user.repositories;

    data.push(...edges.map(({ node }) => node));
    after = pageInfo.endCursor;
    hasNextPage = pageInfo.hasNextPage;
  } while (hasNextPage);

  return data;
};
