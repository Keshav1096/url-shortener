const express = require("express");
const app = express();
const port = 3005;
const Routes = require("./src/routes");

//initializing processes
require("./src/db");

app.use(express.json());

app.use("/", Routes);

app.use("/api", Routes);

app.listen(port, () => {
  console.log(`Url Shortener on port ${port}`);
});
