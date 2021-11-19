const express = require("express");
const Router = express.Router();

const { authorizeUser } = require("../middlewares");

const orders = require("./orders");
const payments = require("./payments");
const dishes = require("./dishes");
const basicAuth = require("./auth");
const testCode = require("./testCode");

Router.use("/auth", basicAuth);

// req.user will be available in all below routes
Router.use("/orders", authorizeUser, orders);
Router.use("/dishes", authorizeUser, dishes);
Router.use("/payments", authorizeUser, payments);

Router.use("/test-route", testCode);

module.exports = Router;
