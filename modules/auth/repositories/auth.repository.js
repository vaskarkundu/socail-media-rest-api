const UserModel = require("../../users/models/User");

const Create = async (data) => {
  const user = new UserModel(data);

  return await user.save();
};

const Single = async (query) => {
  return await UserModel.findOne(query);
};
const Delete = async (query) => {
  return await UserModel.deleteOne(query);
};
module.exports = {
  Create,
  Single,
  Delete,
};
