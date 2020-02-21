"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { handleToDo } = require("./handlers");
const PORT = process.env.PORT || 8000;

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints

app.get("/todos", handleToDo);
app.get("*", (req, res) => res.send("Dang. 404."));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
