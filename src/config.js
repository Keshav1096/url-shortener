let config = {};

const environment = process.env.NODE_ENV;

switch (environment) {
  case "development":
    config = {
      db_uri: process.env.db_uri || "mongodb://127.0.0.1:27023",
    };
    break;
  case "production":
    config = {
      db_uri: process.env.db_uri || "mongodb://127.0.0.1:27023",
    };
    break;
  default:
    config = {
      db_uri: process.env.db_uri || "mongodb://127.0.0.1:27023",
    };
    break;
}

module.exports = config;
