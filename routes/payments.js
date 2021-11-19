const express = require("express");
const Router = express.Router();

const PaymentsModel = require("../schemas/payments");

const removeProjections = {
  _id: 0,
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};

Router.get("/", async (req, res) => {
  const allPayments = await PaymentsModel.find({}, removeProjections);

  return res.json(allPayments);
});

Router.get("/:paymentId", async (req, res) => {
  try {
    const paymentId = req.params.paymentId;

    const paymentDetails = await PaymentsModel.findById(
      paymentId,
      removeProjections
    );

    if (paymentDetails) {
      return res.json(paymentDetails);
    } else {
      return res.json({ error: "no matching payments found!!" });
    }
  } catch (error) {
    return res.json(error);
  }
});

Router.post("/", async (req, res) => {
  try {
    const payload = req.body;

    const payment = new PaymentsModel(payload);
    const savedPayment = await payment.save();

    return res.json({ message: "successfully inserted", data: savedPayment });
  } catch (error) {
    return res.json(error);
  }
});

Router.put("/:paymentId", async (req, res) => {
  try {
    const paymentId = req.params.paymentId;

    const payload = req.body;

    await PaymentsModel.findByIdAndUpdate(paymentId, payload);

    res.json("Successfully updated the payment");
  } catch (error) {
    res.json(error.details);
  }
});

Router.delete("/:paymentId", async (req, res) => {
  try {
    const paymentId = req.params.paymentId;

    const paymentDetails = await PaymentsModel.findById(paymentId);

    if (paymentDetails) {
      await PaymentsModel.deleteOne({ _id: paymentId });
    } else {
      throw new Error("No matching entry found!");
    }

    res.json({ message: "successfully deleted entry!" });
  } catch (error) {
    res.json(error);
  }
});

module.exports = Router;
