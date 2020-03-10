/** @format */

"use strict";
const { User } = require("../models");
const { compare } = require("../helper/passHelper");
const { generateToken } = require("../helper/tokenHelper");

class UserController {
  static register(req, res, next) {
    const { username, email, password } = req.body;
    User.create({ username, email, password })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then(data => {
        console.log(data)
        if (compare(password, data.password)) {
          const obj = { id: data.id, email: data.email };
          res.status(200).json({ token: generateToken(obj) });
        } else {
          throw error;
        }
      })
      .catch(err => {
        const error = {
          status: 404,
          message: "data not found, you need to register first"
        };
        if (err) {
          next(error);
        }
      });
  }
}

module.exports = UserController;
