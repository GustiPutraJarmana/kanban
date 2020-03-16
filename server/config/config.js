require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.USER ,
    "password": process.env.PASS,
    "database": "kanban_project",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "rykswfmutetobm",
    "password": "e773efa3b7f281553a73cd3d4fa36a81d2bc161ecd0ad1c47edf88bad562121c",
    "database": "d37frpmibjq7qe",
    "host": "ec2-3-229-210-93.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
