const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();
dotenv.config();

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware
app.use(morgan());
app.use(helmet("common"));

//route
app.use("/api", require("./modules/users/route"));
app.use("/api", require("./modules/auth/route"));
module.exports = app;
