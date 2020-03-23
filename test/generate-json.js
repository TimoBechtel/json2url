const spawner = require('json-spawn');
const chance = require('chance').Chance();

// types from chance.js
const types = ['string', 'floating', 'bool', 'sentence', 'url', 'street'];

const attribueCount = 50;

const randomScheme = () => {
  let scheme = '';
  for (let i = 0; i < attribueCount; i++) {
    scheme += `${i}:${chance.pickone(types)}`;
    scheme += chance.bool({ likelihood: 1 })
      ? `{${chance.natural({ min: 0, max: 10 })}}`
      : '';
    if (i < attribueCount - 1)
      scheme += chance.bool({ likelihood: 30 }) ? '/' : ',';
  }
  return scheme;
};

const spawn = spawner(chance);

exports.generate = spawn;
exports.scheme = randomScheme;
