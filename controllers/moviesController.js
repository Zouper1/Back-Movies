const { matchedData } = require("express-validator");
const { moviesModel } = require("../models");
const { haddleHttpError } = require("../utils/haddleError");

//* obtener lista de la base de datos
const getItems = async (req, res) => {
  try {
    const data = await moviesModel.find({});
    res.send({ data });
  } catch (error) {
    haddleHttpError(res, "ERROR_GET_ITEMS", 403);
  }
};

//* obtener un item de la base de datos
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await moviesModel.findById(id);
    if (!id) {
      haddleHttpError(res, "No se encontro la ID", 403);
      return;
    }
    res.send({ data });
  } catch (error) {
    haddleHttpError(res, "ERROR_GET_ITEM", 403);
  }
};

//? crear un item en la base de datos
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await moviesModel.create(body);
    res.send({ data });
  } catch (error) {
    haddleHttpError(res, "ERROR_CREATE_ITEMS", 403);
  }
};

//? actualizar un item en la base de datos
const updateItem = async (req, res) => {
  try {
    const updatedMovies = await moviesModel.findByIdAndUpdate(req.params.id, {
      $set: {
        nameMovie: req.body.nameMovie, 
        imageMovie: req.body.imageMovie,
        descriptionMovie: req.body.descriptionMovie,
        deleted:  req.body.deleted,
        time1: req.body.time1,
        time2: req.body.time2,
        time3: req.body.time3,
      },
    }, { new: true });
    
    res.send({ data: updatedMovies, message: "Item actualizado" });
  } catch (error) {
    haddleHttpError(res, "ERROR_UPDATE_ITEMS", 403);
  }
};

//! eliminar un item en la base de datos
const deletetItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await moviesModel.delete({ _id: id });
    if (!id) {
      haddleHttpError(res, "No se encontro la ID para eliminar", 403);
      return;
    }
    res.send({ data, message: "Item eliminado" });
  } catch (error) {
    haddleHttpError(res, "ERROR_DELETE_ITEMS", 403);
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deletetItem };
