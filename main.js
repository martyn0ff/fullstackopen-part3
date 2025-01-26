const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
});
const db = require("./out/db");
const {
  PhonebookDatabaseClient,
} = require("./out/client/PhonebookDatabaseClient");
const RestApi = require("./in/rest");
const express = require("express");
let mongoose = require("mongoose");

async function main() {
  mongoose = await db
    .configureMongoose(mongoose)
    .connect(db.getConnectionString())
    .catch((err) => {
      console.error(err);
      throw err;
    });
  const dbClient = new PhonebookDatabaseClient(mongoose);
  const rest = new RestApi(dbClient);
  const app = express();

  rest.configure(app).then((rest) => rest.start(app));
}

main();
