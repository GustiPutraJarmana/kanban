/** @format */

"use strict";
const { Task } = require("../models");

class taskController {
  static addTask(req, res, next) {
    const UserId = req.user.id;
    const body = {
      title : req.body.title,
      category : 'todo',
      description : req.body.description,
      UserId : UserId
    }
    Task.create(body)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        console.log(err)
        next(err);
      });
  }

  static findAll(req, res, next) {
    const UserId = +req.user.id;
    Task.findAll({where : {UserId}})
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }

  static update(req, res, next) {
    console.log(req.body)
    const UserId = +req.user.id;
    const id = +req.params.id;
    const { title, category, description } = req.body;
    Task.update({ title, category, description }, { where: { id, UserId }, returning: true })
      .then(data => {
        res.status(200).json(data[1]);
      })
      .catch(err => {
        next(err);
      });
  }

  static delete(req, res, next) {
    const UserId = +req.user.id;
    const id = +req.params.id;
      Task.findOne({ where: { id, UserId }})
        .then(data => {
            if (data !== null) {
                res.status(200).json(data)
            } else {
                const error = {
                    status : 404,
                    message : 'Data not found'
                }
                throw(error)
            }
            return Task.destroy({ where: { id, UserId }})
        })
        .catch(err => {
            next(err)
        })
  }
}
  


module.exports = taskController;
