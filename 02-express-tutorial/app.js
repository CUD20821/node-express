const express = require('express');
const app = express();

app.get("/", (req, res) => {
  res.json([{ name: "duc" }, { name: "le" }]);
});

app.listen(5000, (req, res) => {
  console.log("server is listening on port 5000...");
});
