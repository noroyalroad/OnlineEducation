const express = require("express");
const app = express();
const port = 4000;
const test = require("./Router/testRouter");
const main = require("./Router/mainRouter");
const mail = require("./Router/sendmail");
const auth = require("./Router/authRouter");
const lecuture = require("./Router/lecturesRouter");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // 쿠키 주고받기를 허용
};
app.use(cors(corsOptions));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/test", test);
app.use("/api/mail", mail);
app.use("/api", main);
app.use("/api/auth", auth);
app.use("/api/lectures", lecuture);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
