const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

const DIST_DIR = path.join(__dirname, "dist");

app.use(express.static(DIST_DIR));

app.get("/", (req, res) => {
  const index = path.join(__dirname, "dist", "index.html");
  res.sendFile(index);
});

app.listen(port, () => console.log("running server"));
