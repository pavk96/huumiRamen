const mongoose = require("mongoose");
require("dotenv").config();
const { ID, PASSWORD } = process.env;
mongoose.connect(
  `mongodb+srv://${ID}:${PASSWORD}@huumiramen.9nidf.mongodb.net/huumiramen?retryWrites=true&w=majority`
);

const db = mongoose.connection;
module.exports = function () {
  db.on("error", () => {
    console.log("Connection Failed!");
  });
  db.on("open", () => {
    console.log("Connected!");
  });
};
