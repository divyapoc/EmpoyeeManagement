const express = require("express");
const router = express.Router();
const {
  registerUser,
  userLogin,
} = require("../controllers/userControllers");
router.route("/").post(registerUser);
router.route("/login").post(userLogin);


module.exports = router;