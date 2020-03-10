
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(obj) {
  return jwt.sign(obj, process.env.SECRET_WORD);
}

function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET_WORD)
}

module.exports = { generateToken, verifyToken };
