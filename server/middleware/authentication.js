"use strict";
const { verifyToken } = require("../helper/tokenHelper");
const { User } = require("../models");

module.exports = (req, res, next) => {
  const token = req.headers.token;
  if (!token) res.status(401).send("Access denied. No token provided.");
  try {
    const decode = verifyToken(token)
    User.findOne({ where: { id: decode.id } })
      .then(data => {
        if (decode.id == data.id) {
          req.user = decode;
          next();
        }
      })
      .catch(err => {
        res.status(401).send("Access denied. No token provided.");
      });
  } catch (err) {
    const error = {
      status: 404,
      message: "Invaled token"
    };
    next(error);
  }
};
