const express = require("express");
const router = express.Router();
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/moviesV");
const authMiddleware = require("../middleware/sesionM");
const { checkRol } = require("../middleware/rol");
const { refreshToken } = require("../controllers/authController");

const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deletetItem,
} = require("../controllers/moviesController");


//TODO se crea un crud para la colección movies


router.get("/",refreshToken ,getItems, );
router.get("/:id",refreshToken ,validatorGetItem, getItem);
router.post(
  "/", refreshToken,
  authMiddleware,
  checkRol(["admin"]),
  validatorCreateItem,
  createItem
);
router.put(
  "/:id",refreshToken,
  authMiddleware,
  checkRol(["admin"]),
  validatorGetItem,
  updateItem
);
router.delete(
  "/:id", refreshToken,
  authMiddleware,
  checkRol(["admin"]),
  validatorGetItem,
  deletetItem
);

module.exports = router;
