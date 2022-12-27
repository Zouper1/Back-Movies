const express = require("express");
const router = express.Router();
const {
  getUser,
  getUsers,
  updateUser,
} = require("../controllers/usersController");
const { refreshToken } = require("../controllers/authController");

router.get("/", refreshToken ,getUsers);
router.get("/:id", refreshToken ,getUser);
router.put("/:id",refreshToken ,updateUser);

module.exports = router;
