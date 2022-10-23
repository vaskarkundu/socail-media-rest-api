// ExpressJS Core
const express = require("express");
const { route } = require("../../app");
const router = express.Router();

//controller
const UserCntr = require("../users/controllers/user.controller");
router.get("/user", UserCntr.Got);
module.exports = router;
