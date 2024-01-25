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

  const isValid = /([^가-힣\x20])/i.test(UserName);
  const isValid2 = /^[a-zA-Z0-9]+$/.test(UserName);
  const isValidlength = UserName.length >= 2 && UserName.length <= 10;
  const containsSpace = UserName.includes(" "); // !containsSpace
  const containsSpecial = /[~!@#$%^&*()_+|<>?:{}]/.test(UserName);

  const namecheck = !isValid && !isValid2 && isValidlength && !containsSpace && !containsSpecial;
  const emailcheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(Email);
  const nicknamecheck = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z]{2,10}$/.test(Nickname);
  const passwordcheck = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/.test(Password);

  if (!namecheck) {
    res.status(500).send({ success: false, messege: "유저네임을 확인해주세요." });
    return;
  }
  if (!emailcheck) {
    res.status(500).send({ success: false, messege: "이메일을 확인해주세요." });
    return;
  }
  if (!nicknamecheck) {
    res.status(500).send({ success: false, messege: "닉네임을 확인해주세요." });
    return;
  }
  if (!passwordcheck) {
    res.status(500).send({ success: false, messege: "비밀번호를 확인해주세요." });
    return;
  }

  bcrypt.hash(Password, saltRounds, (err, hashpass) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      const sql = "INSERT INTO Users (username, email, password,  nickname) VALUES (?, ?, ?, ? )";
      const values = [UserName, Email, hashpass, Nickname];

      db.query(sql, values, (err, result) => {
        console.error("결과", err);
        if (err) {
          if (err.errno === 1062) {
            res.status(500).send({ success: false, messege: "중복된 닉네임입니다." });
          }

          //닉네임 중복시 에러
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
    console.log(result);
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length === 0) {
        res.status(401).send({ success: false, messege: "존재하지 않는 이메일입니다." });
      } else {
        bcrypt.compare(Password, result[0].Password, (err, compareResult) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
          } else if (!compareResult) {
            res.status(401).send({ success: false, messege: "비밀번호가 일치하지 않습니다." });
          } else {
            const token = jwt.sign(
              {
                email: result[0].Email,
                nickname: result[0].Nickname,
                name: result[0].UserName,
                bio: result[0].bio,
                isAuth: true,
              },
              secretObj["secret-key"],
              {
                expiresIn: "1h",
              }
            );
            res.cookie("x_auth", token, { path: "/" });
            res.send({ success: true });
          }
        });
      }
    }
  });
});
// 사용자 정보 가져오기
router.get("/userinfo", auth, (req, res) => {
  const { email, nickname, name, bio, isAuth } = req.decoded;
  // console.log(req.decoded);

  return res.status(200).json({
    email,
    nickname,
    name,
    bio,
    isAuth,
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

//로그아웃 시 쿠키 삭제
router.get("/logout", (req, res) => {
  res.clearCookie("x_auth", { path: "/", httpOnly: true });
  res.status(200).send({ success: true });
  // res.redirect("/");
  // }
});

module.exports = router;
