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

  let after = '';
  let orgs = [];
  let hasNextPage = false;

  do {
    const options = { login };
    if (after) options.after = after;
    const { user } = await client(query, options);
    const { organizations } = user;
    const { totalCount, pageInfo, edges } = organizations;

    orgs = orgs.concat(edges.map(({ node }) => node));
    after = pageInfo.endCursor;
    hasNextPage = pageInfo.hasNextPage;
  } while (hasNextPage);

  return orgs;
};
