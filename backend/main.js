const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
});
const db = require("./db.js");
const PhonebookDatabaseClient = require("./client/PhonebookDatabaseClient.js");
const RestApi = require("./api/RestApi.js");
const express = require("express");
let mongoose = require("mongoose");

async function main() {
  mongoose = await db
    .configureMongoose(mongoose)
    .connect(db.getConnectionString())
    .catch((err) => {console.error(err)});
  const dbClient = new PhonebookDatabaseClient(mongoose);
  const rest = new RestApi(dbClient);
  const app = express();

  rest.configure(app).then(rest => rest.start(app));
}

main();