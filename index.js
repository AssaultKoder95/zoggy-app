require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");

const public = path.join(__dirname, "public");

// eg of in-built middleware
app.use(express.json());

// Eg. of another in-built middleware
// app.use(express.urlencoded());
// => api/txns?app=1&version=2&userId=4
// => req.params => { app: 1, version: 2, userId: 4 }

// Routes Imported
const apiRoutes = require("./routes");

// Middlewares Imported
const { logger } = require("./middlewares");

// Route Handling
app.use(logger);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Zoggy v1.0.1");
});

app.use("/api", apiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Project running at port ${process.env.PORT}`);
});
