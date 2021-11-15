const express = require("express");
const app = express();

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Zoggy v1.0");
});

app.listen(process.env.PORT, () => {
  console.log(`Project running at port ${process.env.PORT}`);
});
