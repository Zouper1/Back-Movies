const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign, tokenVerify } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const { haddleHttpError } = require("../utils/haddleError");

const registerCtr = async (req, res) => {
  try {
    
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.send({ data });
  } catch (error) {
    haddleHttpError(res, "ERROR_REGISTER_USER", 500);
    
  }
};

const loginCtr = async (req, res) => {
try {
  req = matchedData(req);
  const user = await usersModel.findOne({ email: req.email }).select("password name role email");
  if (!user) {
    haddleHttpError(res, "USER_NOT_EXIST", 403);
    return;
  }
  const hashPassword = user.get("password");
  
  const check = await compare(req.password, hashPassword);

  if (!check) {
    haddleHttpError(res, "PASSWORD_NOT_MATCH", 401);
    return;
  }
  user.set("password", undefined, { strict: false });
  const data = {
    token: await tokenSign(user),
    user,
  };
  res.send({ data });

} catch (e) {
  
  haddleHttpError(res, "ERROR_LOGIN_USER", 403);
}
};

module.exports = { loginCtr, registerCtr };