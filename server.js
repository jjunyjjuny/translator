const path = require("path");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

const DIST_DIR = path.join(__dirname, "dist");

app.use(express.static(DIST_DIR));

app.get("/", (req, res) => {
  const index = path.join(__dirname, "dist", "index.html");
  res.sendFile(index);
});

app.listen(PORT, () => {
  console.log("run server");
});
