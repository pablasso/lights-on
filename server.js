"use latest";
import bodyParser from "body-parser";
import express from "express";
import Webtask from "webtask-tools";
import { MongoClient } from "mongodb";
import { ObjectID } from "mongodb";

const database = "tecel";
const collection = "lights";
const server = express();

server.use(bodyParser.json());
server.get("/", (req, res, next) => {
  const { MONGO_URL } = req.webtaskContext.secrets;
  MongoClient.connect(MONGO_URL, (err, client) => {
    if (err) return next(err);
    const db = client.db(database);
    db.collection(collection)
      .find()
      .toArray((qerr, items) => {
        client.close();
        if (err) return next(err);
        res.status(200).send(items);
      });
  });
});

server.post("/", (req, res, next) => {
  const { MONGO_URL } = req.webtaskContext.secrets;
  const model = req.body;
  MongoClient.connect(MONGO_URL, (err, client) => {
    if (err) return next(err);
    const db = client.db(database);
    db.collection(collection).insertOne(model, (qerr, result) => {
      client.close();
      if (qerr) return next(qerr);
      res.status(201).send(result);
    });
  });
});
module.exports = Webtask.fromExpress(server);
