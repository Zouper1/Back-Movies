const express = require("express");
const router = express.Router();
const {
  getUser,
  getUsers,
  updateUser,
} = require("../controllers/usersController");


router.get("/" ,getUsers);
router.get("/:id" ,getUser);
router.put("/:id",updateUser);

module.exports = router;
