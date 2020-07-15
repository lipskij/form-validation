const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const users = [];

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("hello world"));

app.post("/", (req, res) => {
  console.log(req.body);
  users.push({
    username: req.body.username,
  });
  console.log(users);
  res.send(`goodbye ${req.body.username}`);
});


app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
