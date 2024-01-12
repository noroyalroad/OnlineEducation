const express = require("express");
const app = express();
const port = 4000;
const test = require("./Router/testRouter");
const main = require("./Router/mainRouter");
const auth = require("./Router/authRouter");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/test", test);
app.use("/api", main);
app.use("/api/auth", auth);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
