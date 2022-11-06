// ExpressJS Core
const express = require("express");
const router = express.Router();
const passport = require("passport");

//Internal routes
const PostCtrl = require("./controllers/post.controller");

// router.all(
//   "*",
//   passport.authenticate("jwt", { session: false }),
//   (req, res, next) => next()
// );

router.put("/posts/:id/update", PostCtrl.Update);
router.put("/posts/:id/likes", PostCtrl.Likes);
router.get("/posts/:id/get", PostCtrl.Gets);
router.post("/posts/", PostCtrl.Create);
router.post("/posts/:id/remove", PostCtrl.Remove);
// router.put("/unfollow/:id", UserCtrl.Unfollow);

//Exports router
module.exports = router;
