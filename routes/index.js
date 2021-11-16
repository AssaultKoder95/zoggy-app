const express = require("express");
const Router = express.Router();

const { auth } = require("../middlewares");

const orders = require("./orders");
const payments = require("./payments");
const dishes = require("./dishes");

Router.use("/orders", orders);
Router.use("/payments", auth, payments);
Router.use("/dishes", auth, dishes);

module.exports = Router;
