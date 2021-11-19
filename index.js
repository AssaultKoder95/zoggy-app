const express = require("express");
const app = express();
const config = require("config");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const PORT = config.has("App.port") ? config.get("App.port") : 5400;
const MONGODB_URL = config.has("DB.url")
  ? config.get("Database.url")
  : "mongodb://localhost:27017/local";

const { logger } = require("./middlewares");

const apiRoutes = require("./routes");

async function main() {
  mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const connection = mongoose.connection;

  connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
  });

  app.use(express.json());
  app.use(logger);
  app.use(express.static("public"));

  app.get("/", (req, res) => {
    res.send("Zoggy v1.0.1");
  });

  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Project running at port ${PORT}`);
  });
}

main().catch((err) => console.log(err));
