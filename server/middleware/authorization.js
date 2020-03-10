"use strict"
const { Task } = require('../models')
module.exports = (req, res, next) => {
    const UserId = +req.user.id
    const id = req.params.id
    Task.findOne({where : {id, UserId}})
        .then(data => {
            console.log(data)
            if (data !== null && UserId === UserId) {
                next()
            } else {
                const error = {
                    status : 404,
                    message : 'Data not found'
                }
                throw(error)
            }
        })
        .catch(err => {
            next(err)
        })


}