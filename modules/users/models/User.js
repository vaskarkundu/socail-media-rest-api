const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      //unique: true,
      sparse: true,
    },

    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    profilePicture: {
      type: "String",
      default: "",
    },
    crofilePicture: {
      type: "String",
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verifyCode: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
