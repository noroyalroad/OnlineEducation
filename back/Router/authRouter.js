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
      // const sql = "INSERT INTO Users (username, email, password,  nickname) VALUES (?, ?, ?, ? )";
      const sql = "select * from Users where email = ? ";
      const values = [Email];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          if (result.length === 0) {
            const sql = "INSERT INTO Users (username, email, password,  nickname) VALUES (?, ?, ?, ? )";
            const values = [UserName, Email, hashpass, Nickname];
            db.query(sql, values, (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
              } else {
                console.log("Data inserted:", result);
                res.send({ success: true });
              }
            });
          } else {
            res.status(500).send({ success: false, messege: "이미 가입된 이메일이거나 닉네임입니다." });
          }
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
          } else if (result[0].checkemail !== "Y") {
            res.status(401).send({ success: false, messege: "이메일 인증을 완료해주세요." });
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
  const { name, nickname, bio, userId } = req.body;

  const image = req.file ? "http://localhost:4000/api/auth/" + req.file.path : req.decoded.profile_image;
  console.log("imgae===>", image);

  const sql = "UPDATE Users SET  username = ?, nickname = ?, bio = ? , img_file_path = ? where UserID = ?";
  const values = [name, nickname, bio, image, userId];

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
          userId: userId,
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
    const { imp_uid, merchant_uid, payinfo } = req.body;
    console.log(req.body);

    let sql = `INSERT INTO pay (LECTUREID, userid, PRICE, payments, USERNAME,PHONENUMBER ,EMAIL, Field, merchant_uid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    const value = [payinfo.lectureID, payinfo.userID, payinfo.price, payinfo.paymentMethod, payinfo.name, payinfo.phoneNumber, payinfo.email, payinfo.accountname, merchant_uid];

    db.query(sql, value, async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      console.log("Insertion successful");

      try {
        const response = await axios.post("https://api.iamport.kr/users/getToken", {
          imp_key: IMP_KEY,
          imp_secret: IMP_SECRET,
        });

        const token = response.data.response.access_token;

        const getPaymentData = await axios.get(`https://api.iamport.kr/payments/${imp_uid}`, {
          headers: { Authorization: token },
        });

        const payments = getPaymentData.data;

        console.log("Payment details", payments);

        const query = "SELECT price FROM pay WHERE merchant_uid = ? UNION ALL SELECT price FROM Lectures WHERE lectureid = ?";
        const values = [merchant_uid, payinfo.lectureID];

        db.query(query, values, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
          }

          console.log("Prices retrieved from database", result);

          if (result[0].price !== payments.response.amount && result[1].price !== payments.response.amount) {
            switch (payments.response.status) {
              case "ready":
                const updateReadyQuery = "UPDATE pay SET status = ? WHERE merchant_uid = ?";
                const updateReadyValues = ["ready", merchant_uid];
                db.query(updateReadyQuery, updateReadyValues, (err, result) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).send("Internal Server Error");
                  }
                  res.send({ success: true });
                });
                break;
              case "paid":
                const updatePaidQuery = "UPDATE pay SET paystatus = 'Y' WHERE merchant_uid = ?";
                const updatePaidValues = [merchant_uid];
                db.query(updatePaidQuery, updatePaidValues, (err, result) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).send("Internal Server Error");
                  }
                  res.send({ success: true, message: "결제 성공" });
                });
                break;
            }
          } else {
            res.send({ success: true, message: "결제 금액이 일치하지 않습니다." });
          }
        });
      } catch (error) {
        console.error("Error fetching payment details:", error);
        res.status(500).send("Internal Server Error");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

//kakaologin

router.post("/kakaologin", (req, res) => {
  const query = "select * from Users where email = ? or nickname = ?";
  const values = [req.body.email, req.body.nickname];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("카카오셀렉결과", result[0]);
      if (result[0].length === 0) {
        const query = "insert into Users (email, nickname, username, img_file_path,password, checkemail) values (?,?,?,?,?,?)";
        const values = [req.body.email, req.body.nickname + req.body.id.toString(), req.body.nickname, req.body.profile_image, req.body.id, "Y"];
        db.query(query, values, (err, result) => {
          console.log("카카오인서트결과", result);

          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
          } else {
            const query = "select * from Users where email = ?";
            const values = [req.body.email];

            db.query(query, values, (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
              } else {
                console.log("결과", result[0]);
                const token = jwt.sign(
                  {
                    userId: result[0].UserId,
                    email: result[0].Email,
                    name: result[0].UserName,
                    nickname: result[0].Nickname,
                    profile_image: result[0].img_file_path,
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
        });
      } else {
        const token = jwt.sign(
          {
            userId: result[0].UserId,
            name: result[0].UserName,
            email: result[0].email,
            nickname: result[0].Nickname,
            profile_image: result[0].img_file_path,
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

  const query = "select * from Users where email = ?";
  const values = [decoded.email];

  db.query(query, values, (err, result) => {
    console.log("구글셀렉결과", result);
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length === 0) {
        const query = "insert into Users ( email, nickname, username, img_file_path, password, checkemail) values (?,?,?,?,?,?)";
        const values = [decoded.email, decoded.name + decoded.nbf.toString(), decoded.name, decoded.picture, decoded.nbf, "Y"];
        db.query(query, values, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
          } else {
            const query = "select * from Users where email = ?";
            const values = [decoded.email];

            db.query(query, values, (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
              } else {
                console.log("결과", result[0]);
                const token = jwt.sign(
                  {
                    userId: result[0].UserId,
                    email: result[0].Email,
                    name: result[0].UserName,
                    nickname: result[0].Nickname,
                    profile_image: result[0].img_file_path,
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
        });
      } else {
        console.log("구글로그인======>", result[0]);
        const token = jwt.sign(
          {
            email: result[0].Email,
            userId: result[0].UserId,
            name: result[0].UserName,
            nickname: result[0].Nickname,
            profile_image: result[0].img_file_path,
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

// 닉네임 중복체크

router.post("/nicknamecheck", (req, res) => {
  const { Nickname } = req.body;
  console.log(req.body);
  const sql = "select * from Users where nickname = ?";
  const values = [Nickname];

  db.query(sql, values, (err, result) => {
    console.log(result);
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length === 0) {
        res.send({ success: true });
      } else {
        res.send({ success: false });
      }
    }
  });
});

//이메일 중복체크

router.post("/emailcheck", (req, res) => {
  const { Email } = req.body;
  console.log(req.body);
  const sql = "select * from Users where email = ?";
  const values = [Email];
  db.query(sql, values, (err, result) => {
    console;
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length === 0) {
        res.send({ success: true });
      } else {
        res.send({ success: false });
      }
    }
  });
});

module.exports = router;
