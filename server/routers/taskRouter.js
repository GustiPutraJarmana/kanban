
"use strict";
const taskController = require("../controller/taskController");
const taskRouter = require("express").Router();
const authentication = require("../middleware/authentication");
const authorization = require('../middleware/authorization')

taskRouter
    .use(authentication)
taskRouter
    .post("/add", taskController.addTask)
    .get("/list", taskController.findAll)
    .put('/edit/:id',authorization, taskController.update)
    .delete('/delete/:id',authorization, taskController.delete)
module.exports = taskRouter;
