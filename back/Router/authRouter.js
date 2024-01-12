const router = require("express").Router();
const bodyParser = require("body-parser");
const db = require("../DBC");
const bcrypt = require("bcrypt");
const saltRounds = 10;
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//회원가입
router.post("/signup", (req, res) => {
  console.log(req.body);
  const { UserName, Email, Password, UserCellphone, UserType, Nickname, CheckEmail } = req.body;
  console.log(Password);

  bcrypt.hash(Password, saltRounds, (err, hashpass) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      const sql = "INSERT INTO Users (username, email, password, usercellphone, usertype, nickname, checkemail) VALUES (?, ?, ?, ?, ?, ?, ? )";
      const values = [UserName, Email, hashpass, UserCellphone, UserType, Nickname, CheckEmail];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          console.log("Data inserted:", result);
          res.send({ success: true });
        }
      });
    }
  });
});

module.exports = router;
