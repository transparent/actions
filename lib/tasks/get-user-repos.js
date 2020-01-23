'use strict';

const createTask = require('./create-task');

/**
 * Given a GitHub username, get all of the user's public repositories
 * and save them in the specified JSON file.
 */

module.exports = createTask({
  queryName: 'get-user-repos',
  filename: 'repos.json'
});
