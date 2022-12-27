const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validatorRegister = [
  check("name", "Debes de ingresar un Nombre de Usuario").exists().notEmpty(),
  check("email").isEmail(),
  check("password", "La contraseña debe de tener almenos 6 caracteres").isLength({
    min: 5,
  }),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatorLogin = [
  check("email").isEmail(),
  check("password", "Contraseña incorrecta").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validatorRegister, validatorLogin };
