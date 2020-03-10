/** @format */

const Router = require("express").Router();
const taskRouter = require("./taskRouter");
const userRouter = require("./userRouter");

Router
    .use('/user', userRouter)
    .use('/task', taskRouter);

module.exports = Router;
