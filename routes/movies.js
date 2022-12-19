const express = require("express");
const router = express.Router();
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/moviesV");
const authMiddleware = require("../middleware/sesionM");
const { checkRol } = require("../middleware/rol");

const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deletetItem,
} = require("../controllers/moviesController");

//TODO se crea un crud para la colección movies

router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post(
  "/",
  authMiddleware,
  checkRol(["admin"]),
  validatorCreateItem,
  createItem
);
router.put(
  "/:id",
  authMiddleware,
  checkRol(["admin"]),
  validatorGetItem,
  validatorCreateItem,
  updateItem
);
router.delete(
  "/:id",
  authMiddleware,
  checkRol(["admin"]),
  validatorGetItem,
  deletetItem
);

module.exports = router;
