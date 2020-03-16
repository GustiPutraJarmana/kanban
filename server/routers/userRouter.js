"use strict";
const userRouter = require("express").Router();
const userController = require("../controller/userController");

userRouter
    .post("/register", userController.register)
    .post("/login", userController.login)
    .post('/googleLogin', userController.googleLogin)

module.exports = userRouter;
