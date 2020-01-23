'use strict';

const path = require('path');
const Composer = require('composer');
const composer = new Composer();
const config = require('./lib/config');
const tasks = require('./lib/tasks');
const { writeJson } = require('./lib/utils');

for (const key of Object.keys(tasks)) {
  composer.task(key, async () => {
    const { datapath, run } = await tasks[key](config);
    const data = await run();

    if (data && datapath) {
      await writeJson(path.join(config.paths.DATA_DIR, datapath), data);
    }
  });
}

composer.build(config._.length ? config._ : ['default'])
  .catch(console.error);
