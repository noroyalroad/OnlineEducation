const router = require("express").Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const db = require("../DBC");
const path = require("path");
require("dotenv").config();
const { USERMAIL, PASS } = process.env;

const generateToken = () => {
  const token = crypto.randomBytes(20).toString("hex");
  const expires = new Date();
  expires.setHours(expires.getHours() + 24);

  return { token, expires };
};

const sendmail = (email, message) => {
  const result = generateToken();

  if (!message) message = "메일 인증을 위한 링크입니다.";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: USERMAIL,
      pass: PASS,
    },
  });
  const mailOptions = {
    from: USERMAIL,
    to: email,
    subject: `Message from 런럭스`,
    html: `
    <h3>메일 인증을 위해 아래 링크를 클릭해주세요.</h3>
    <p>${message}</p>
    <br/>
    <a href="http://localhost:4000/api/mail/check/?email=${email}&token=${result.token}">Click here to go to the website</a>
    <p>Expires at ${result.expires}</p>
    <p><a href="http://localhost:4000/api/mail/resend/?email=${email}">재전송</a></p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      const sql = "update Users set token = ? where email = ?";
      db.query(sql, [result.token, email], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      });

      console.log("Email sent: " + info.response);

      res.send("success");
    }
  });
};

router.post("/", (req, res) => {
  const { email } = req.body;
  // console.log(email);

  sendmail(email);

  res.send({ success: true, message: "메일을 전송했습니다. 메일함을 확인해주세요" });
});
router.get("/resend", (req, res) => {
  const email = req.query.email;
  sendmail(email, "재전송 메일입니다.");
  res.send({ message: "메일을 재전송했습니다." });
});

router.get("/check", (req, res) => {
  const email = req.query.email;
  const token = req.query.token;

  const sql = "SELECT * FROM Users WHERE email = ? AND token = ?";
  db.query(sql, [email, token], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      if (result.length > 0) {
        //토큰 유효시간 검사
        const now = new Date();
        const expires = generateToken.expires;
        if (now > expires) {
          res.sendFile(path.join(__dirname, "../view", "failmail.html"));
          return;
        }
        //토큰 삭제
        const sql = "UPDATE Users SET token = NULL WHERE email = ?";
        db.query(sql, [email], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            const sql = "UPDATE Users SET checkemail = 'Y' WHERE email = ?";
            db.query(sql, [email], (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log(result);
              }
            });
            res.sendFile(path.join(__dirname, "../view", "successmail.html"));
          }
        });
      } else {
        res.sendfile(path.join(__dirname, "../view", "failmail.html"));
      }
    }
  });
});

module.exports = router;
