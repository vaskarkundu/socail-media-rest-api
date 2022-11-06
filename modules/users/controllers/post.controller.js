//Internal routes
const Post = require("../models/Post");
const User = require("../models/User");
const router = require("../PostRoute");
const PostRepo = require("../repositories/post.repository");
const UserRepo = require("../repositories/user.repository");
//const securePassword = require("../../auth/services/securePassword");
exports.Create = async (req, res) => {
  try {
    const post = await PostRepo.Create(req.body);
    res.status(200).json({ message: "Post created successfully", data: post });
  } catch (err) {
    res.status(500).json(err);
  }
};
//need to chnage like delete route
exports.Update = async (req, res, next) => {
  let postID = req.params.id;
  try {
    let post = await PostRepo.Single({ _id: postID });
    if (post.userId === req.body.userId) {
      post = Object.assign(post, req.body);
      post = await post.save();
      return res.json({ message: "Post updated successfully", data: post });
    }
  } catch (error) {
    res.status(500).json(err);
  }
};

// exports.Details = async (req, res, next) => {
//   try {
//     let userID = req.params.id;
//     let user = await UserRepo.Single({ _id: userID });
//     const { password, updatedAt, ...other } = user._doc;
//     res.json({ message: "user founded successfully", data: other });
//   } catch {
//     res.json({
//       message: "user not found",
//       data: user,
//     });
//   }
// };

exports.Remove = async (req, res, next) => {
  try {
    let postID = req.params.id;
    let post = await PostRepo.Single({ _id: postID });

    if (post.userId == req.body.userId) {
      let post = await PostRepo.Delete({ _id: postID });
      res
        .status(200)
        .json({ message: "The post deleted successfully", data: post });
    } else {
      res.status(403).json({ message: "You can only delete your post" });
    }
  } catch {
    res.status(500).json({
      message: "post not found",
    });
  }
};

// follow a user

exports.Likes = async (req, res) => {
  try {
    const post = await PostRepo.Find(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
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
exports.Gets = async (req, res) => {
  try {
    const post = await PostRepo.Find(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Timeliners
exports.Timeline = async (req, res) => {
  try {
    const currentUser = await UserRepo.FindId(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
};
