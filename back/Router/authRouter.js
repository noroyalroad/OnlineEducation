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
const multer = require("multer");
const express = require("express");
router.use("/back/profileimage", express.static("back/profileimage"));
const axios = require("axios");
const jwt_decode = require("jwt-decode");
require("dotenv").config();
const fs = require("fs");
const { IMP_KEY, IMP_SECRET } = process.env;

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
                userId: result[0].UserId,
                profile_image: result[0].img_file_path,
                is: true,
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
  const { email, nickname, name, bio, userId, profile_image, isAuth } = req.decoded;
  console.log(req.decoded);

  return res.status(200).json({
    email,
    nickname,
    name,
    bio,
    userId,
    profile_image,
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

// 이미지 파일에 포함 된 사용자 formdata를 받고 업데이트
// 이미지 업로드 시 multer를 사용하여 이미지를 저장하고 이미지 경로를 DB에 저장
// 이미지 경로를 DB에 저장하고 사용자 정보를 업데이트

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "back/profileimage/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/mypage/update", upload.single("img"), auth, (req, res) => {
  const { name, nickname, bio, UserId } = req.body;

  const image = req.file.path;
  if (!image) {
    const sql = "UPDATE Users SET  username = ?, nickname = ?, bio = ? where UserID = ?";
    const values = [name, nickname, bio, UserId];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Data inserted:", result);

        const token = jwt.sign(
          {
            email: req.decoded.email,
            nickname: nickname,
            name: name,
            bio: bio,
            userId: UserId,
            profileimage: image,
            is: true,
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
    return;
  }

  const sql = "UPDATE Users SET  username = ?, nickname = ?, bio = ? , img_file_path = ? where UserID = ?";
  const values = [name, nickname, bio, image, UserId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data inserted:", result);

      const token = jwt.sign(
        {
          email: req.decoded.email,
          nickname: nickname,
          name: name,
          bio: bio,
          userId: UserId,
          profile_image: image,
          is: true,
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
});

// 결제
router.post("/payment/complete", async (req, res) => {
  try {
    const { imp_uid, merchant_uid } = req.body;
    console.log(req.body);

    let body = {
      imp_key: IMP_KEY,
      imp_secret: IMP_SECRET,
    };

    const response = await axios.post("https://api.iamport.kr/users/getToken", body, {
      headers: { "Content-Type": "application/json" },
    });
    const token = response.data.response.access_token;

    const getPaymentData = await axios.get(`https://api.iamport.kr/payments/${imp_uid}`, {
      headers: { Authorization: token },
    });

    console.log("tokennn!!", token);

    const payments = getPaymentData.data;

    console.log("payments", payments);

    const query = "select price from pay where merchant_uid = ? ";
    const values = [merchant_uid];
    let price = 0;

    db.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        price = result[0].price;
      }
    });

    if (price !== payments.response.amount) {
      switch (payments.response.status) {
        case "ready":
          const query = "update pay set status = ? where merchant_uid = ?";
          const values = ["ready", merchant_uid];
          db.query(query, values, (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).send("Internal Server Error");
            } else {
              res.send({ success: true });
            }
          });
          break;
        case "paid":
          // 결제성공
          const suceessquery = "update pay set paystatus = 'Y' where merchant_uid = ?";
          const suceessvalues = [merchant_uid];

          db.query(suceessquery, suceessvalues, (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).send("Internal Server Error");
            } else {
              res.send({ success: true, messege: "결제성공" });
            }
          });

          break;
      }
    }

    // console.log("엑세스 ", getToken.response);
  } catch (error) {}
});

//kakaologin

router.post("/kakaologin", (req, res) => {
  const query = "select * from kakaouser where email = ?";
  const values = [req.body.email];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("결과", result[0]);
      if (result.length === 0) {
        const query = "insert into kakaouser (userid, email, nickname, username, profile_img,password) values (?,?,?,?,?,?)";
        const values = [req.body.id, req.body.email, req.body.nickname, req.body.nickname, req.body.profile_image, req.body.id];
        db.query(query, values, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
          } else {
            const token = jwt.sign(
              {
                userId: req.body.id,
                email: req.body.email,
                nickname: req.body.nickname,
                profile_image: req.body.profile_image,
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
      } else {
        const token = jwt.sign(
          {
            userId: result[0].userId,
            email: result[0].email,
            nickname: result[0].nickname,
            profile_image: result[0].profile_img,
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
    }
  });
});
//googlelogin

router.get("/googlelogin", (req, res) => {
  const token = req.cookies.x_auth;
  console.log("구글토큰", token);

  const decoded = jwt.decode(token);

  const query = "select * from kakaouser where email = ?";
  const values = [decoded.email];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length === 0) {
        const query = "insert into kakaouser (userid, email, nickname, username, profile_img,password) values (?,?,?,?,?,?)";
        const values = [decoded.nbf, decoded.email, decoded.name, decoded.name, decoded.picture, decoded.nbf];
        db.query(query, values, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
          } else {
            const token = jwt.sign(
              {
                email: decoded.email,
                nickname: decoded.nickname,
                profile_image: decoded.picture,
                userId: decoded.nbf,
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
      } else {
        const token = jwt.sign(
          {
            email: result[0].email,
            userId: result[0].userid,
            nickname: result[0].nickname,
            profile_image: result[0].profile_img,
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
    }
  });
});

module.exports = router;
