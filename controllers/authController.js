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
    haddleHttpError(res, "El correo ya esta registrado", 500);
  }
};

const loginCtr = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel
      .findOne({ email: req.email })
      .select("password name role email");
    if (!user) {
      haddleHttpError(res, "Email no encontrado", 403);
      return;
    }
    const hashPassword = user.get("password");

    const check = await compare(req.password, hashPassword);

    if (!check) {
      haddleHttpError(res, "Contraseña Invalida", 403);
      return;
    }
    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user,
    };

    res.cookie(String(data.user._id), data.token, {
      path: "/",
      maxAge: 900000,
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      sameSite: "lax",
    });

    res.send({ data, message: "Bienvenido" });
    // res.send(localStorage.setItem("token", data.token))
  } catch (e) {
    haddleHttpError(res, "ERROR_LOGIN_USER", 403);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];

    if (!prevToken) {
      haddleHttpError(res, "No se encontro el token ", 401);
      return;
    }

    const dataToken = await tokenVerify(prevToken);

    if (!dataToken._id) {
      haddleHttpError(res, "No se encontro el id del token", 401);
      return;
    }

    res.clearCookie(String(dataToken._id));
    req.cookies[String(dataToken._id)] = "";

    const token = await tokenSign(dataToken);

    res.cookie(String(dataToken._id), token, {
      path: "/",
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = dataToken._id;
    // req.localStorage.setItem("token", token)
    next(); 
  } catch (error) {
    haddleHttpError(res, "ERROR_REFRESH TOKEN", 403);
  }


};

const logoutCtr = async (req, res) => {
  try {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];

    if (!prevToken) {
      haddleHttpError(res, "No se encontro el token ", 401);
      return;
    }

    const dataToken = await tokenVerify(prevToken);

    if (!dataToken._id) {
      haddleHttpError(res, "No se encontro el id del token", 401);
      return;
    }

    res.clearCookie(String(dataToken._id));
    req.cookies[String(dataToken._id)] = "";

    res.send({ data: "Sesion cerrada" });
  } catch (error) {
    haddleHttpError(res, "ERROR_LOGOUT_USER", 403);
  }
};

module.exports = { loginCtr, registerCtr, refreshToken, logoutCtr };
