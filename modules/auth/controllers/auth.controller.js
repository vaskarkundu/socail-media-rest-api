const AuthRepo = require("../repositories/auth.repository");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { hashSync, compareSync } = require("bcrypt");
const MailTemplates = require("../services/template");
const sendmail = require("../services/mail");
const securePassword = require("../services/securePassword");
//register
//have to start from here
exports.Register = async (req, res) => {
  const currentUser = await AuthRepo.Single({ email: req.body.email });
  if (currentUser) {
    res.json({
      message: "This user is already exits",
    });
  }
  if (currentUser.username == req.body.username) {
    res.json({
      message: "This username is already exits",
    });
  }
  let user = await AuthRepo.Create(req.body);

  console.log(user);

  const user1 = await AuthRepo.Single({ email: req.body.email });
  if (!user1) {
    res.status(400).json({
      message: "something went worng",
      error: err,
    });
  }

  const token = Math.floor(1000 + Math.random() * 9000);
  const code = token.toString();

  user.verifyCode = code;
  user = await user.save();
  const mailObject = MailTemplates.VerifyRegister(user);
  await sendmail(mailObject);
  res.status(200).json({
    message: "User created successfully",
    user: {
      id: user._id,
      username: user.email,
    },
  });
};

exports.Verify = async (req, res) => {
  let user = await AuthRepo.Single({ email: req.body.email });
  const tokenData = user.verifyCode;

  const token = req.body.token;
  if (!tokenData)
    return res.status(400).json({ message: "verification code not available" });
  if (tokenData !== token)
    return res.status(400).json({ message: "verification code not matched" });
  if (tokenData === token) {
    const pass = req.body.password;
    const hashPass = await securePassword(pass);
    user.password = hashPass;
    const _user = await user.save();
    return res.status(200).json({ message: "verified and password updated" });
  }
};
exports.Login = async (req, res) => {
  const user = await AuthRepo.Single({ email: req.body.email });
  //No user found
  if (!user) {
    return res.status(401).json({
      message: "Could not find the user",
    });
  }
  //Incorrect Password
  if (!compareSync(req.body.password, user.password)) {
    return res.status(401).json({
      message: "Incorrect Password",
    });
  }

  const payload = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.status(200).json({
    message: "Logged in successfully",
    token: token,
  });
};
