/** @format */

"use strict";
const { hash } = require("../helper/passHelper");
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class User extends Model {}
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "username can not be empty"
          },
          notEmpty: {
            args: true,
            msg: "username can not be empty"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notNull: true,
          notEmpty: {
            args: true,
            msg: "validation email error"
          }
        },
        unique: {
          args: true,
          msg: "Email address already in use!"
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: {
            args: true,
            msg: "password can not be empty"
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate(user, options) {
         const hashPass = hash(user.password)
              user.password = hashPass 
        }
      },
      sequelize
    }
  );
  User.associate = function(models) {
    User.hasMany(models.Task);
  };
  return User;
};
