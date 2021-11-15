const express = require("express");
const Router = express.Router();

const { orders } = require("../placeholder-data");

Router.get("/history", (req, res) => {
  res.json(orders);
});

Router.get("/:orderId", (req, res) => {
  const orderId = parseInt(req.params.orderId, 10);

  const order = orders.filter(({ id }) => id === orderId);

  if (order.length) {
    res.json(order[0]);
  } else {
    res.json({ error: "no matching order found!!" });
  }
});

Router.get("*", (req, res) => {
  res.send("Invalid route in /orders");
});

module.exports = Router;
