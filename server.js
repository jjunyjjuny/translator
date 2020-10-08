const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
express.static(path.join(__dirname, "/"));
app.get("/", (req, res) => {
  const index = path.join(__dirname, "index.html");
  res.sendFile(index);
});

app.listen(port, () => console.log("Example"));
