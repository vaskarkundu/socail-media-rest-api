//Internal routes
const UserRepo = require("../repositories/user.repository");
const securePassword = require("../../auth/services/securePassword");
exports.Update = async (req, res, next) => {
  console.log(req.body.city);
  let userID = req.params.id;
  let user = await UserRepo.Single({ _id: userID });
  console.log(user);
  try {
    if (req.body.password) {
      try {
        let hasspass = await securePassword(req.body.password);
        req.body.password = hasspass;
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    user = Object.assign(user, req.body);
    user = await user.save();
    return res.json({ message: "User updated successfully", data: user });
  } catch (error) {
    next(error);
  }
};

exports.Details = async (req, res, next) => {
  try {
    let userID = req.params.id;
    let user = await UserRepo.Single({ _id: userID });
    const { password, updatedAt, ...other } = user._doc;
    res.json({ message: "user founded successfully", data: other });
  } catch {
    res.json({
      message: "user not found",
      data: user,
    });
  }
};

exports.Remove = async (req, res, next) => {
  try {
    let userID = req.params.id;
    let user = await UserRepo.Delete({ _id: userID });
    return res.json({ message: "user removed successfully" });
  } catch {
    res.json({
      message: "user not found",
    });
  }
};

// follow a user

exports.Follow = async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await UserRepo.Single({ _id: req.params.id });
      console.log(user);
      const currentUser = await UserRepo.Single({ _id: req.body.userId });
      console.log(currentUser);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User Follower anf Following is updated");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't follow yourself");
  }
};

// unfolow
// follow a user

exports.Unfollow = async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await UserRepo.Single({ _id: req.params.id });
      console.log(user);
      const currentUser = await UserRepo.Single({ _id: req.body.userId });
      console.log(currentUser);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User unFollower and unFollowing is updated");
      } else {
        res.status(403).json("you are not follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't unfollow yourself");
  }
};
