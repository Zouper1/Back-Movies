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

router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post(
  "/",
  validatorCreateItem,
  createItem
);
router.put("/:id", validatorGetItem, updateItem);
router.delete(
  "/:id",
  validatorGetItem,
  deletetItem
);

module.exports = router;
