const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

router
  .post("/signin", userController.signIn)
  .post("/signup", userController.signUp);

module.exports = router;
