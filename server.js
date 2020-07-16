const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const salt = 10;
const port = 3000;

const users = [];

app.use(bodyParser.json());

app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`));
app.get("/style.css", (req, res) => res.sendFile(`${__dirname}/style.css`));
app.get("/script.js", (req, res) => res.sendFile(`${__dirname}/script.js`));

app.post("/signup", (req, res) => {
  const user = users.find((user) => user.username === req.body.username);
  if (user) {
    res.status(400).send("This user name already exist");
  } else {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      users.push({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      console.log(users);
      res.send();
    });
  }
});

app.post("/login", (req, res) => {
  const user = users.find((user) => user.username === req.body.username);
  if (!user) {
    res.status(401).json({username: "User not found"});
  } else {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result === true) {
        res.send(user);
      } else {
        res.status(401).json({password: "Invalid password"});
      }
    });
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
