const { usersModel } = require("../models");
const { haddleHttpError } = require("../utils/haddleError");



const getUsers = async (req, res) => {
  try {
    const data = await usersModel.find({});
    res.send({ data });
  } catch (error) {
    haddleHttpError(res, "ERROR_GET_USERS", 403);
  }
};



const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await usersModel.findOne({ email: id });
    res.send({ data });
  } catch (error) {
    haddleHttpError(res, "ERROR_GET_USER", 403);
  }
};


const updateUser = async (req, res) => {
  try {
    const updatedUsers = await usersModel.findOneAndUpdate({ email: req.params.id }, {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        credits: req.body.credits,
        deleted: req.body.deleted,
      },
    }, { new: true });

    res.send({ data: updatedUsers, message: "Usuario actualizado" });
    
  } catch (error) {
    
  }
}


//? actualizar un item en la base de datos
const updateUser1 = async (req, res) => {
  try {
    const updatedUsers = await usersModel.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        credits: req.body.credits,
        deleted: req.body.deleted,
      },
    }, { new: true });

    res.send({ data: updatedUsers, message: "Item actualizado" });
  } catch (error) {
    haddleHttpError(res, "ERROR_UPDATE_USERS", 403);
  }
};


module.exports = { getUsers, getUser, updateUser};
