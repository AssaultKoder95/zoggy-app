require("dotenv").config();

const express = require("express");
const app = express();

// eg of in-built middleware
app.use(express.json());

// Eg. of another in-built middleware
// app.use(express.urlencoded());
// => api/txns?app=1&version=2&userId=4
// => req.params => { app: 1, version: 2, userId: 4 }

// Routes Imported
const orders = require("./routes/orders");
const payments = require("./routes/payments");

// Middlewares Imported
const { logger, auth } = require("./middlewares");

// Route Handling
app.use(logger);

app.get("/", (req, res) => {
  res.send("Zoggy v1.0.1");
});

app.use("/api/orders", orders);
app.use("/api/payments", auth, payments);

app.listen(process.env.PORT, () => {
  console.log(`Project running at port ${process.env.PORT}`);
});
