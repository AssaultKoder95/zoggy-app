const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { v4: uuid } = require("uuid");

const PaymentSchema = new Schema(
  {
    id: {
      type: String,
      default: uuid(),
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // will be a reference to Order Schema
    orderId: {
      type: String,
      required: true,
    },
    // will be a reference to User Schema ( not embedded document : pure reference )
    userId: {
      type: String,
      required: true,
    },
    status: {
      enum: ["Initiated", "In progress", "Cancelled", "Completed"],
      type: String,
      required: true,
      default: "Initiated",
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value > -1;
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
