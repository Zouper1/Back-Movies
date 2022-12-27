const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");


const validatorCreateItem = [
  check("nameMovie").exists().notEmpty().isLength({ min: 3, max: 50 }),
  check("imageMovie").exists().notEmpty(),
  check("price").exists().notEmpty().isLength({ min: 1, max: 5 }),
  check("time1").exists().notEmpty().isLength({  max: 10 }),
  check("time2").exists().notEmpty().isLength({  max: 10 }),
  check("time3").exists().notEmpty().isLength({  max: 10 }),
  check("descriptionMovie").exists().notEmpty().isLength({ min: 5 }),
  
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

const validatorGetItem = [
  check("id").exists().notEmpty().isMongoId(),
]

module.exports = { validatorCreateItem, validatorGetItem };
