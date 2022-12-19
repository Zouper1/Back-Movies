const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");


const validatorCreateItem = [
  check("nameMovie").exists().notEmpty().isLength({ min: 5, max: 50 }),
  check("imageMovie").exists().notEmpty().isLength(),
  check("timesMovies").exists().notEmpty().isLength(),
  check("timesMovies.time1").exists().notEmpty().isLength({  max: 7 }),
  check("timesMovies.time2").exists().notEmpty().isLength({  max: 7 }),
  check("timesMovies.time3").exists().notEmpty().isLength({  max: 7 }),
  check("descriptionMovie").exists().notEmpty().isLength({ min: 5 }),
  
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

const validatorGetItem = [
  check("id").exists().notEmpty().isMongoId(),
]

module.exports = { validatorCreateItem, validatorGetItem };
