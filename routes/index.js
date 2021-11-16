const express = require("express");
const Router = express.Router();

const orders = require("./orders");
const payments = require("./payments");

Router.use("/api/orders", orders);
Router.use("/api/payments", auth, payments);
