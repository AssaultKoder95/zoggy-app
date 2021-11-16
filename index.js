
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());



// Routes
const orders = require("./routes/orders");
const payments = require("./routes/payments");
const dishes = require("./routes/dishes");
const users = require("./routes/users");


app.get("/", (req, res) => {
  res.send("Zoggy v1.0.1");
});

app.use("/api/orders", orders);
app.use("/api/payments", payments);
app.use("/api/dishes", dishes);
app.use("/api/users", users);

app.listen(process.env.PORT, () => {
  console.log(`Project running at port ${process.env.PORT}`);
});
