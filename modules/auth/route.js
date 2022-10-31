// ExpressJS Core
const express = require("express");
// const passport = require("passport");

const { route } = require("../../app");
const router = express.Router();
//Internal routes
const authCtrl = require("./controllers/auth.controller");

router.post("/register", authCtrl.Register);
router.post("/verify", authCtrl.Verify);
router.post("/login", authCtrl.Login);
// router.get("/logout", passport.authenticate("jwt", { session: false }));

//Exports router
module.exports = router;
