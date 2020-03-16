/** @format */

"use strict";
const { User } = require("../models");
const { compare } = require("../helper/passHelper");
const { generateToken } = require("../helper/tokenHelper");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
  static register(req, res, next) {
    console.log(req.body);
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
        console.log(data);
        if (data) {
          if (compare(password, data.password)) {
            const obj = { id: data.id, email: data.email };
            res.status(200).json({ token: generateToken(obj) });
          } else {
            const error = {
              status: 404,
              message: "email or password wrong"
            };
            throw error;
          }
        } else {
          const error = {
            status: 404,
            message: "email or password wrong"
          };
          throw error;
        }
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  }

  static googleLogin(req, res, next) {
    const token = req.body.token;
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
      });
      const payload = ticket.getPayload();
      User.findOne({ where: { email: payload.email } })
        .then(data => {
          if (data === null) {
            User.create({
              email: payload.email,
              password: "12345qwerty",
              username: payload.name
            }).then(data => {
              console.log(data.id);
              res
                .status(201)
                .json({ token: generateToken(data.id, data.username) });
            });
          } else {
            console.log(data.id, "data udah dibuat");
            console.log(
              generateToken({ id: data.id, username: data.username })
            );
            res
              .status(200)
              .json({
                token: generateToken({ id: data.id, username: data.username })
              });
          }
        })
        .catch(err => {
          next(err);
        });
    }
    verify().catch(console.error);
  }
}

module.exports = UserController;
