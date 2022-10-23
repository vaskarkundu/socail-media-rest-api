// External Routes
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Internal Routes
const UserModel = require("../../users/models/User");
const { hashSync, compareSync } = require("bcrypt");

//Hash Password
const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hashSync(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error);
  }
};

module.exports = securePassword;
