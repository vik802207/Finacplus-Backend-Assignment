// utils.js
const { v4: uuidv4 } = require('uuid');

function now() { return new Date(); }

function toNumber(x) {
  if (x === null || x === undefined) return 0;
  return Number(x);
}

module.exports = { uuidv4, now, toNumber };
