'use strict';

const { defineProperty } = Reflect;
const fs = require('fs');
const path = require('path');
const camelcase = require('camelcase');

module.exports = (dir, requires = {}, filter = () => true) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const extname = path.extname(file.name);

    if (file.isFile() && extname !== '.js') continue;
    if (file.name !== 'index.js' && file.name[0] !== '_' && filter(file)) {
      const stem = extname === '.js' ? file.name.slice(0, -3) : file.name;
      const name = camelcase(stem);

      defineProperty(requires, stem, {
        configurable: true,
        enumerable: true,
        get() {
          return require(path.join(dir, file.name));
        }
      });

      if (stem !== name) {
        defineProperty(requires, name, {
          configurable: true,
          enumerable: true,
          get() {
            return require(path.join(dir, file.name));
          }
        });
      }
    }
  }

  return requires;
};
