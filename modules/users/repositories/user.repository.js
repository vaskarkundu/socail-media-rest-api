const { query } = require("express");
const UserModel = require("../models/User");

let Find = async function (query) {
  let user = await UserModel.findOne(query);

  return user;
};

const Single = async (query) => {
  return await UserModel.findOne(query);
};
const Delete = async (query) => {
  return await UserModel.deleteOne(query);
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
  Find,
  Follower,
  Following,
};
