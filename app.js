const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
// const passport = require("passport");

const app = express();
dotenv.config();

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware
app.use(morgan());
app.use(helmet("common"));

// app.use(passport.initialize());
// require("./modules/auth/services/passport");
//route
app.use("/api", require("./modules/users/route"));
app.use("/api", require("./modules/auth/route"));
app.use("/api", require("./modules/users/PostRoute"));
module.exports = app;
