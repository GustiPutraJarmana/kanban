/** @format */

"use strict";
module.exports = (err, req, res, next) => {
  if (err.name === "SequelizeValidationError") {
    let msg = err.errors.map(data => data.message);
    res.status(400).json({ message: msg }); //err udah di handle dalam array
  } else if (err.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({ message: [err.message] });
  } else if (err.status === 404) {
    res.status(404).json({ message: [err.message] });
  } else if (err.status === 401) {
    res.status(401).json({ message: [err.message] });
  } else {
    res.status(500).json({message : ['internal server error']})
  }
};
