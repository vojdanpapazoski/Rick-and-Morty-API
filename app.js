
const express = require("express");
const { rickmorty } = require("./handlers/handlers");

const app = express();

app.get("/location/:id", rickmorty);

app.listen(10000, (err) => {
  if (err) console.log(err);
  console.log("Server started successfully at port 10000");
});