const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validatorRegister = [
  check("name", "El nombre es obligatorio").exists().notEmpty().isLength({ min: 3 }),
  check("email", "El email es obligatorio" ).isEmail(),
  check("password", "Debe tener minimo 6 caracteres").isLength({
    min: 6, max: 20,
  }),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatorLogin = [
  check("email", "Correo invalido").isEmail(),
  check("password", "Contraseña incorrecta").isLength({
    min: 6, max: 20,
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validatorRegister, validatorLogin };
