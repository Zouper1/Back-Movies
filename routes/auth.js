const express = require("express");
const router = express.Router();
const { loginCtr, registerCtr, refreshToken, logoutCtr} = require("../controllers/authController");
const { validatorRegister, validatorLogin } = require("../validators/authV");



router.post("/register", validatorRegister, registerCtr);
router.post("/login", validatorLogin,loginCtr);
router.get("/logout", logoutCtr);




module.exports = router; 
