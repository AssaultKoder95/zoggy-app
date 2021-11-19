const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  fullAddress: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  type: {
    enum: ["home", "work", "other"],
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
  additionalDirectionsInfo: {
    type: String,
  },
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, // validator
    unique: true, // validator
    lowercase: true, // option
  },
  password: {
    type: String,
    required: true,
  },
  address: [AddressSchema],
});

module.exports = mongoose.model("User", UserSchema);
