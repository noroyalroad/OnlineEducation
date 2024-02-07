const router = require("express").Router();
const bodyParser = require("body-parser");
const db = require("../DBC");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// 수강 중인 강의
router.get("/course", async (req, res) => {
  console.log(req.query);

  let sql = `SELECT DISTINCT
  e.UserID,
  e.LectureID,
  e.EnrollmentsDate,
  e.AttendanceRate,
  e.paymentstatus,
  l.*    
FROM
  Enrollments e
JOIN
  Lectures l ON e.LectureID = l.LectureID
WHERE
  e.UserID = ?
  AND e.paymentstatus = 'Y';`;

  const value = [req.query.UserID];

  db.query(sql, value, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// 강의 상세 페이지

router.get("/detail/:id", async (req, res) => {
  console.log(req.params.id);
  const info = `SELECT l.*, i.InstructorID, i.InstructorName, i.Email, i.Qualifications
  FROM Lectures l
  JOIN Instructor i ON l.InstructorID = i.InstructorID
  WHERE l.LECTUREID = ${req.params.id}; `;
  const toc = `SELECT * FROM LectureTOC WHERE LECTUREID = ${req.params.id} ;  `;
  const question = `SELECT * FROM Question WHERE LECTUREID =${req.params.id};`;

  //쿼리 3개 처리

  db.query(info, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      db.query(toc, (err, result2) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          db.query(question, (err, result3) => {
            if (err) {
              console.error(err);
              res.status(500).send("Internal Server Error");
            } else {
              console.log(result3);
              res.send({ info: result, toc: result2, question: result3 });
            }
          });
        }
      });
    }
  });
});

// 목차 클릭해서 강의 내용 가져오기
router.get("/toc/:id", async (req, res) => {
  console.log(req.params.id);

  let sql = `SELECT * FROM LecturesMaterial  WHERE TOCID = ${req.params.id};`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// 강의 질문
router.post("/ques", async (req, res) => {
  console.log(req.body);
  const { UserID, RectureID, Ques } = req.body;

  let sql = `INSERT INTO Question(UserID, LectureID, Ques)
  VALUES
  ( ?, ?, ?);`;
  const values = [UserID, RectureID, Ques];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send({ success: true });
    }
  });
});

// 수강신청
// paymentsstatus = n 이라면 insert  없어도 인서트
// paymentsstatus = y 이라면  이미 신청한 강의 메세지 전송
router.post("/enroll", async (req, res) => {
  console.log(req.body);
  const { UserID, LectureID } = req.body;

  let sql = `INSERT INTO Enrollments(UserID, LectureID)
  VALUES
  ( ?, ?);`;
  let sql2 = `SELECT PAYMENTSTATUS  FROM Enrollments WHERE USERID  = ? AND LECTUREID = ? ;`;
  const values = [UserID, LectureID];

  db.query(sql2, values, (err, result) => {
    if (!result[0]) {
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send({ success: true });
        }
      });
    } else {
      if (result[0].PAYMENTSTATUS === "N") {
        db.query(sql, values, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
          } else {
            res.send({ success: true });
          }
        });
      } else {
        res.send({ success: false, messege: "이미 수강신청한 강의입니다." });
      }
    }
  });
});

// 강의후기

router.post("/review", async (req, res) => {
  console.log(req.body);
  const { UserID, LectureID, Review } = req.body;

  let sql = `INSERT INTO Review(UserID, LectureID, Review)
  VALUES
  ( ?, ?, ?);`;
  const values = [UserID, LectureID, Review];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send({ success: true });
    }
  });
});

// 강의후기 가져오기

router.get("/review/:id", async (req, res) => {
  console.log(req.params.id);

  let sql = `SELECT * FROM Review  WHERE LectureID = ${req.params.id};`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

module.exports = router;

//결제
router.post("/payment", async (req, res) => {
  console.log(req.body);
  const { lectureID, userID, price, paymentMethod, name, phoneNumber, email, accountname, merchant_uid } = req.body;

  let sql = `INSERT INTO  PAY (LECTUREID, userid, PRICE, payments, USERNAME,PHONENUMBER ,EMAIL, Field, merchant_uid)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?,?);`;

  // let sql2 = `UPDATE ENROLLMENTS SET paymentstatus ="Y" WHERE USERID =? AND LECTUREID =?;`;
  const values = [lectureID, userID, price, paymentMethod, name, phoneNumber, email, accountname, merchant_uid];
  // const values2 = [userID, lectureID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    } else {
      res.send({ success: true });
    }

    // db.query(sql2, values2, (err, result) => {
    //   if (err) {
    //     console.error(err);
    //     return res.status(500).send("Internal Server Error");
    //   }

    //   console.log(result);
    //   res.send({ success: true });
    // });
  });
});

// 수강여부 확인 결제 여부 확인

router.get("/paymentstatus", async (req, res) => {
  let sql = `SELECT PAYMENTSTATUS 
  FROM Enrollments
  WHERE UserID = ${req.query.UserId}
  AND LectureID = ${req.query.LectureId}`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (!result[0]) {
        console.log("결제 안함");
        res.send({ PAYMENTSTATUS: "N" });
      } else {
        res.send(result[0]);
      }
    }
  });
});
