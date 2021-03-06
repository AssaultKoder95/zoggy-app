const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");

const UserModel = require("../schemas/users");

const { generateAccessToken } = require("../utils/jwt");

const encryptionRounds = 10;

Router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res
        .status(400)
        .send({ error: "Missing / invalid data", payload: req.body });
    }

    const user = await UserModel.findOne({ email: email });

    if (user) {
      // check user password with hashed password stored in the database
      // original string password sent by user
      // matches it against the hashed password stored in our DB
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        const accessToken = generateAccessToken({
          userId: user.id,
          name: user.name,
          email: user.email,
        });

        return res
          .status(200)
          .json({ message: "Login Successful", accessToken });
      } else {
        return res
          .status(400)
          .json({ error: "Either email / password are incorrect" });
      }
    }

    return res
      .status(401)
      .json({ error: "User does not exist, try signing up!" });
  } catch (error) {
    return res.json(error);
  }
});

Router.post("/signup", async (req, res) => {
  try {
    const { email, password, name, address } = req.body;

    // Validate the user input
    if (
      !(
        email &&
        password &&
        name &&
        address.name &&
        address.fullAddress &&
        address.type &&
        address.pincode
      )
    ) {
      return res
        .status(400)
        .send({ error: "Missing / invalid data", payload: req.body });
    }

    // Always check in DB if User exists / not
    const doesUserExist = await UserModel.findOne({ email }, { _id: 1 });

    if (doesUserExist) {
      return res
        .status(400)
        .send({ error: "User already exists, try logging in!" });
    }

    // Always store hashed passwords in your DB ( NEVER STORE ORIGINAL STRINGS )
    const salt = await bcrypt.genSalt(encryptionRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
      email,
      name,
      address,
      password: hashedPassword,
    });

    // trigger the DB call
    const savedUser = await user.save();

    console.log(savedUser); // mongoose object

    // Sanitize the O/P data for user security
    const userDetails = {
      ...savedUser._doc,
      password: undefined,
      __v: undefined,
      _id: undefined,
    };

    // return res.status(201); // => Resource was created successfully
    return res.status(200).send(userDetails); // => Request was completed successfully
  } catch (error) {
    return res.json(error);
  }
});

module.exports = Router;
