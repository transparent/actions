'use strict';

module.exports = async (client, login) => {
  const query = `
query ($login: String!, $after: String) {
  user(login: $login) {
    organizations(first: 100, after: $after) {
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
          login
          name
          organizationBillingEmail
        }
      }
    }
  }
}`;

  let after;
  let data = [];
  let hasNextPage = false;

  console.log(`Getting organizations for "${login}".`);

  do {
    const options = { login, after };
    const { user } = await client(query, options);
    const { totalCount, pageInfo, edges } = user.organizations;

    data.push(...edges.map(({ node }) => node));
    after = pageInfo.endCursor;
    hasNextPage = pageInfo.hasNextPage;
  } while (hasNextPage);

  return data;
};
