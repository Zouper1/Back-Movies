const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validatorCreateItem = [
  check("name").exists().notEmpty().isLength({  max: 20 }),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 6, max: 20 }),
  check("role").exists().notEmpty().isIn(["admin", "user"]),

  (req, res, next) => {
    return validateResult(req, res, next);
  }
];

const validatorGetItem = [
  check("id").exists().notEmpty().isMongoId(),
]

module.exports = { validatorCreateItem, validatorGetItem };