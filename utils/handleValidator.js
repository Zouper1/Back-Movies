const { validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    next(); //TODO continua con el siguiente controlador
  } catch (err) {
    res.status(403);
    res.send({ error: err.array()})
  }
};


module.exports = { validateResult };