const express = require("express");
const app = express();
const morgan = require("morgan");
const logger = require("./logger.js");
const authorize = require("./authorize.js");
let { people } = require("./data.js");

app.use(express.static("./methods-public"));
app.use(express.urlencoded({extended: true}));

app.get("/about/duc", (req, res) => {
  res.status(200).send({ success: true, data: people });
});

app.post("/login", (req, res) => {
  const {name} = req.body
  if(name){
    console.log(name);
    return res.status(200).send(`Welcome ${name}`)
  }

  // console.log(name);
  res.status(401).send('Please provide credential');
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
