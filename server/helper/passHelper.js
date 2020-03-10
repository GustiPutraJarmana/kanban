/** @format */

"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

function hash(password) {
  return bcrypt.hashSync(password, saltRounds)
}

function compare(password, databasePass) {
  return bcrypt.compare(password, databasePass)
}

module.exports = { hash, compare };
