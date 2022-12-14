// ExpressJS Core
const express = require("express");
const router = express.Router();
const passport = require("passport");

//Internal routes
const UserCtrl = require("./controllers/user.controller");

// router.all(
//   "*",
//   passport.authenticate("jwt", { session: false }),
//   (req, res, next) => next()
// );

router.put("/user/:id", UserCtrl.Update);
router.get("/user/:id", UserCtrl.Details);
router.post("/user/:id", UserCtrl.Remove);
router.put("/follow/:id", UserCtrl.Follow);
router.put("/unfollow/:id", UserCtrl.Unfollow);

//Exports router
module.exports = router;
