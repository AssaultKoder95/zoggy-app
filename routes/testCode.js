const express = require("express");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

var url = "mongodb://localhost:27017/";

const Router = express.Router();

Router.get("/mongodb", (req, res) => {
  MongoClient.connect(url, function (err, DatabaseInterface) {
    if (err) throw err;

    var DatabaseObject = DatabaseInterface.db("local");

    DatabaseObject.collection("stationary_shop").findOne(
      { item: "paper" },
      function (err, result) {
        if (err) throw err;

        console.log(result);

        res.json(result);

        DatabaseInterface.close();
      }
    );
  });
});

Router.get("/mongodb/:objectId", (req, res) => {
  const objectId = req.params.objectId;

  MongoClient.connect(url, function (err, DatabaseInterface) {
    if (err) throw err;

    var DatabaseObject = DatabaseInterface.db("local");

    DatabaseObject.collection("stationary_shop").findOne(
      { _id: ObjectId(objectId) },
      function (err, result) {
        if (err) throw err;

        console.log(result);

        res.json(result);

        DatabaseInterface.close();
      }
    );
  });
});

Router.post("/mongodb", (req, res) => {
  const payload = req.body;

  // Validate ( JOI Schema)

  // Post successful validation

  MongoClient.connect(url, function (err, DatabaseInterface) {
    if (err) throw err;

    var DatabaseObject = DatabaseInterface.db("local");

    DatabaseObject.collection("stationary_shop").insertOne(
      payload,
      function (err, result) {
        if (err) throw err;

        res.json({
          message: "successfully inserted data",
          payload: { ...payload, itemId: result.insertedId },
        });

        DatabaseInterface.close();
      }
    );
  });
});

Router.get("/mongoose", (req, res) => {});

module.exports = Router;
