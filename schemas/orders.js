const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({});

module.exports = mongoose.model("Order", OrderSchema);
