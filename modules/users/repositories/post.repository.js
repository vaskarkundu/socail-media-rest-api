const { query } = require("express");
const PostModel = require("../models/Post");

const Create = async (data) => {
  const post = new PostModel(data);

  return await post.save();
};

const Single = async (query) => {
  return await PostModel.findOne(query);
};
const Find = async (query) => {
  return await PostModel.findById(query);
};
const Delete = async (query) => {
  return await PostModel.deleteOne(query);
};
const Follower = async (query) => {
  return await UserModel.updateOne({ $push: { followers: query } });
};
const Following = async (query) => {
  return await UserModel.updateOne({ $push: { followings: query } });
};
module.exports = {
  Single,
  Delete,
  Follower,
  Following,
  Create,
  Find,
};
