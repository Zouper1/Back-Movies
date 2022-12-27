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

router.get("/", getItems, refreshToken);
router.get("/:id", validatorGetItem, getItem, refreshToken);
router.post(
  "/",
  authMiddleware,
  checkRol(["admin"]),
  validatorCreateItem,
  createItem,
  refreshToken
);
router.put(
  "/:id",
  authMiddleware,
  checkRol(["admin"]),
  validatorGetItem,
  updateItem,
  refreshToken
);
router.delete(
  "/:id",
  authMiddleware,
  checkRol(["admin"]),
  validatorGetItem,
  deletetItem,
  refreshToken
);

module.exports = router;
