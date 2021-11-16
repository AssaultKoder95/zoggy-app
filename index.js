const express = require("express");
const app = express();
const config = require("config");

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

const PORT = config.has("App.port") ? config.get("App.port") : 5400;

app.listen(PORT, () => {
  console.log(`Project running at port ${PORT}`);
});
