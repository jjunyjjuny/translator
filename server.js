"use strict";

const { detectLanguage, translateText } = require("./google_translator");
const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
const DIST_DIR = path.join(__dirname, "dist");

app.use(express.static(DIST_DIR));

app.get("/", (req, res) => {
  const index = path.join(__dirname, "dist", "index.html");
  res.sendFile(index);
});

app.post("/translate", async (req, res) => {
  const response = {
    text: req.body.original,
    target: req.body.target,
  };
  const translation = await translateText(response.text, response.target);
  res.send({ result: translation });
});

app.listen(PORT, () => {
  console.log("server is running");
});
