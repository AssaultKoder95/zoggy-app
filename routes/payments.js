const express = require("express");
const Router = express.Router();

const { payments } = require("../placeholder-data");

const {
  addPaymentSchema,
  editPaymentSchema,
} = require("../validators/payments");

Router.get("/", (req, res) => {
  res.json(payments);
});

Router.get("/:paymentId", (req, res) => {
  const paymentId = parseInt(req.params.paymentId, 10);

  const paymentDetails = payments.filter(({ id }) => id === paymentId);

  if (paymentDetails.length) {
    res.json(paymentDetails[0]);
  } else {
    res.json({ error: "no matching payments found!!" });
  }
});

Router.post("/", (req, res) => {
  try {
    const payload = req.body;

    const { value: paymentEntry, error } = addPaymentSchema.validate(payload);

    if (error.length) {
      throw error;
    }

    // more like your DB op
    payments.push(paymentEntry);

    res.json(payments);
  } catch (error) {
    console.log(error);
    res.json(error.details);
  }
});

Router.put("/:paymentId", (req, res) => {
  try {
    const paymentId = parseInt(req.params.paymentId, 10);

    const payload = req.body;

    const { value: paymentEntry, error } = editPaymentSchema.validate(payload);

    if (error) {
      throw error;
    }

    // find whether that entry exists, if it does : proceed to delete
    // else throw an error
    const payment = payments.filter(({ id }) => id === paymentId);

    const updatedPayment = {
      ...payment[0],
      ...paymentEntry,
    };

    if (payment.length) {
      payments.splice(payment[0].id, 1, updatedPayment);
    } else {
      throw new Error("No matching entry found!");
    }

    res.json("Successfully updated the payment");
  } catch (error) {
    console.log(error);
    res.json(error.details);
  }
});

Router.delete("/:paymentId", (req, res) => {
  try {
    const paymentId = parseInt(req.params.paymentId, 10);

    // find whether that entry exists, if it does : proceed to delete
    // else throw an error
    const payment = payments.filter(({ id }) => id === paymentId);

    if (payment.length) {
      payments.splice(payment[0].id, 1);
    } else {
      throw new Error("No matching entry found!");
    }

    res.json({ message: "successfully deleted entry!" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = Router;
