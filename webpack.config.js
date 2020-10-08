const path = require("path");

module.exports = {
  entry: "google_translator.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
