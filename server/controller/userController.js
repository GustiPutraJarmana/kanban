/** @format */

"use strict";
const { User } = require("../models");
const { compare } = require("../helper/passHelper");
const { generateToken } = require("../helper/tokenHelper");

class UserController {
  static register(req, res, next) {
    console.log(req.body)
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
      if (data) {
        if (compare(password, data.password)) {
          const obj = { id: data.id, email: data.email };
          res.status(200).json({ token: generateToken(obj) });
        } else {
          const error = {
              status: 404,
              message: "email or password wrong"
            };
          throw(error);
        }
      }else {
        const error = {
          status: 404,
          message: "email or password wrong"
        };
      throw(error);
      }
        
      })
      .catch(err => {

        console.log(err)
          next(err);
      });
  }

  static googleLogin(req, res, next) {
    this.$gAuth.getAuthCode()
.then(authCode => {
  //on success
  return this.$http.post('http://your-backend-server.com/auth/google', { code: authCode, redirect_uri: 'postmessage' })
})
.then(response => {
  //after ajax
})
.catch(error => {
  //on fail do something
})
  }
}

module.exports = UserController;
