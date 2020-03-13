
"use strict";
const taskController = require("../controller/taskController");
const taskRouter = require("express").Router();
const authentication = require("../middleware/authentication");
const authorization = require('../middleware/authorization')

taskRouter
    .use(authentication)
    .post("/", taskController.addTask)
    .get("/", taskController.findAll)
    .put('/:id',authorization, taskController.update)
    .delete('/:id',authorization, taskController.delete)
module.exports = taskRouter;
