"use strict";

const { detectLanguage, googleTranslator } = require("./translator/google");
const { papagoTranslator } = require("./translator/papago");
const { kakaoTranslator } = require("./translator/kakao");

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

// google translate
app.post("/translate", async (req, res) => {
  const response = {
    text: req.body.original,
    target: req.body.target,
    type: req.body.type,
    source: req.body.source,
  };
  let translation = "";
  switch (response.type) {
    case "google":
      translation = await googleTranslator(response.text, response.target);
      console.log("google");
      break;
    case "papago":
      translation = await papagoTranslator(
        response.text,
        response.source,
        response.target
      );
      console.log("papago");
      break;
    case "kakao":
      translation = await kakaoTranslator(
        response.text,
        response.source,
        response.target
      );
      console.log("kakao");
      break;
  }
  console.log("server.js - translation :", translation);
  res.send({ result: translation });
});

app.listen(PORT, () => {
  console.log("server is running");
});
