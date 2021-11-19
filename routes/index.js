const express = require("express");
const Router = express.Router();

const { auth } = require("../middlewares");

const orders = require("./orders");
const payments = require("./payments");
const dishes = require("./dishes");
const basicAuth = require("./auth");
const testCode = require("./testCode");

Router.use("/auth", basicAuth);
Router.use("/orders", auth, orders);
Router.use("/dishes", auth, dishes);
Router.use("/payments", auth, payments);

Router.use("/test-route", testCode);

module.exports = Router;
