const router = require("express").Router();
const bodyParser = require("body-parser");
const db = require("../DBC");
const bcrypt = require("bcrypt");
const saltRounds = 10;
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt-key.json");
const { auth } = require("../middleware/auth");
const CookieParser = require("cookie-parser");
router.use(CookieParser());

//회원가입
router.post("/signup", (req, res) => {
  console.log(req.body);
  const { UserName, Email, Password, Nickname } = req.body;
  console.log(Password);

  bcrypt.hash(Password, saltRounds, (err, hashpass) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      const sql = "INSERT INTO Users (username, email, password,  nickname) VALUES (?, ?, ?, ? )";
      const values = [UserName, Email, hashpass, Nickname];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
          //닉네임 중복시 에러
        } else if (result.code === "ER_DUP_ENTRY") {
          res.status(409).send("중복 된 닉네임입니다.");
        }
        // 유저네임 중복시
        else {
          console.log("Data inserted:", result);
          res.send({ success: true });
        }
      });
    }
  });
});
// 로그인을 하고 token을 cookie에 저장
router.post("/login", (req, res) => {
  const { Email, Password } = req.body;

  const sql = "SELECT * FROM Users WHERE email = ?";
  const values = [Email];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length === 0) {
        res.status(401).send("Invalid User");
      } else {
        bcrypt.compare(Password, result[0].Password, (err, compareResult) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
          } else if (!compareResult) {
            res.status(401).send("Invalid Password");
          } else {
            const token = jwt.sign(
              {
                email: result[0].Email,
                nickname: result[0].Nickname,
                isAuth: true,
              },
              secretObj["secret-key"],
              {
                expiresIn: "1h",
              }
            );
            res.cookie("x_auth", token);
            res.send({ success: true });
          }
        });
      }
    }
  });
});
// 사용자 정보 가져오기
router.get("/userinfo", auth, (req, res) => {
  const { email, nickname } = req.decoded;

  return res.status(200).json({
    email,
    nickname,
  });
});

// 사용자 정보 수정

router.post("/mypage/change", (req, res) => {
  const { UserCellphone, Nickname, UserID } = req.body;
  console.log(req.body);
  const sql = "UPDATE Users SET  UserCellphone = ?, Nickname = ? WHERE UserID = ?";
  const values = [UserCellphone, Nickname, UserID];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data inserted:", result);
      res.send({ success: true });
    }
  });
});

//로그아웃

router.get("/logout", (req, res) => {
  res.clearCookie("x_auth");
  res.send({ success: true });
});

module.exports = router;
