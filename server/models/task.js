/** @format */

"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Task extends Model {}
  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args : true,
            msg : 'title can not be empty'
          },
          notEmpty: {
            args: true,
            msg: "title can not be empty"
          }
        }
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args : true,
            msg: "catagoty can not empty"
          },
          notEmpty: {
            args: true,
            msg: "catagoty can not empty"
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
          notNull: {
            args: true,
            msg: 'description can not empty'
          },
          notEmpty: {
            args: true,
            msg: 'description can not empty'
          }
        }
      }
    },
    { sequelize }
  );
  Task.associate = function(models) {
    Task.belongsTo(models.User);
  };
  return Task;
};
