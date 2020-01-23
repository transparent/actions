'use strict';

const Composer = require('composer');
const composer = new Composer();
const config = require('./lib/config');
const tasks = require('./lib/tasks');
const keys = Object.keys(tasks);
const names = config._.length ? config._ : keys;

for (const key of keys) {
  composer.task(key, async () => console.log(await tasks[key](config)));
}

composer.build(names);
