const express = require("express");
const router = express.Router();
const { loginCtr, registerCtr } = require("../controllers/authController");
const { validatorRegister, validatorLogin } = require("../validators/authV");


router.post("/register", validatorRegister, registerCtr);
router.post("/login", validatorLogin, loginCtr);

module.exports = router; 
