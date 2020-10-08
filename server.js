const path = require("path");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname, "dist"));

app.get("/", (req, res) => {
  const index = path.join(__dirname, "dist", "index.html");
  res.sendFile(index);
});

app.listen(PORT, () => console.log("running server"));
