const mongoose = require("mongoose");

const config = require("../config");
const db_uri = config.db_uri;

mongoose
  .connect(`${db_uri}/urls`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });
mongoose.connection.on("connected", () => {
  console.log(`Connected to ${db_uri} successfully`);
});
mongoose.connection.on("error", (err) => {
  console.log(`Connection error ${db_uri}`, err.message);
});
const db = mongoose.connection;

module.exports = db;
