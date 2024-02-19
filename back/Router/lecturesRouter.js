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

// router.post("/review", async (req, res) => {
//   console.log(req.body);
//   const { UserID, LectureID, Review } = req.body;

//   let sql = `INSERT INTO Review(UserID, LectureID, Review)
//   VALUES
//   ( ?, ?, ?);`;
//   const values = [UserID, LectureID, Review];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     } else {
//       res.send({ success: true });
//     }
//   });
// });

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

//결제
router.post("/payment", async (req, res) => {
  console.log(req.body);
  const { lectureID, userID, price, paymentMethod, name, phoneNumber, email, accountname, merchant_uid } = req.body;
  console.log("before====>", merchant_uid);
  let selecpay = `SELECT paystatus FROM pay WHERE lectureid = ? and userid = ? ;`; // 중복결제 방지
  const value = [lectureID, userID];

  db.query(selecpay, value, (err, result) => {
    console.log("payment!!==>", result);

    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    } else {
      if (result.length === 0) {
        res.send({ success: true });
      } else {
        res.send({ success: false, messege: "이미 결제한 강의입니다." });
      }
    }
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

// 동영상 시청시간 저장
//조회먼저 때리고 결과가 있다면  업데이트 없다면 인서트인데
router.post("/watchtime", async (req, res) => {
  try {
    const checkQuery = "SELECT * FROM VideoProgress WHERE UserID = ? AND tocid = ?";
    const checkValues = [req.body.userId, req.body.tocId];

    db.query(checkQuery, checkValues, (err, result) => {
      if (err) {
        console.error("Error checking video progress:", err);
        return res.status(500).send("Internal Server Error");
      }

      if (result.length === 0) {
        const insertQuery = "INSERT INTO VideoProgress(UserID, TOCID, LectureID) VALUES (?, ?, ?)";
        const insertValues = [req.body.userId, req.body.tocId, req.body.lectureId];

        db.query(insertQuery, insertValues, (err, insertResult) => {
          if (err) {
            console.error("Error inserting video progress:", err);
            return res.status(500).send("Internal Server Error");
          }

          return res.json({ result });
        });
      } else {
        console.log(result[0]);
        if (req.body.progress !== undefined && req.body.currentTime !== undefined && result[0].progress !== 100) {
          const updateQuery = "UPDATE VideoProgress SET Progress = ?, CurrentTime = ? WHERE UserID = ? AND TOCID = ?";
          const updateValues = [req.body.progress, req.body.currentTime, req.body.userId, req.body.tocId];

          db.query(updateQuery, updateValues, (err, updateResult) => {
            if (err) {
              console.error("Error updating video progress:", err);
              return res.status(500).send("Internal Server Error");
            } else {
              return res.json({ success: true });
            }
          });
        } else {
          return res.json(result[0]);
        }
      }
    });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("Internal Server Error");
  }
});
// 질문 작성

router.post("/question", async (req, res) => {
  const { lectureId, userId, review, tocId } = req.body;

  let sql = `INSERT INTO Question(LectureID, UserID, Ques, tocid) VALUES(?, ?, ?, ?);`;
  const values = [lectureId, userId, review, tocId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send({ success: true });
    }
  });
});

// 질문 조회 (강의별)

router.get("/question", async (req, res) => {
  const sql = `SELECT  q.*, s.username, s.img_file_path   FROM Question q  LEFT JOIN Users s  ON q.userid = s.userid  WHERE  LECTUREID = ? AND tocid =? order by createat desc;`;
  const values = [req.query.lectureId, req.query.tocId];

  console.log("쿼리", req.query.lectureId);
  console.log("쿼리", req.query.tocId);
  console.log("쿼리", req.params);

  db.query(sql, values, (err, result) => {
    console.log(result);
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(result);
    }
  });
});

// 리뷰 작성

router.post("/review", async (req, res) => {
  const { lectureId, userId, review } = req.body;

  let sql = `INSERT INTO Review(LectureID, UserID, Review) VALUES(?, ?, ?);`;
  const values = [lectureId, userId, review];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send({ success: true });
    }
  });
});

// 리뷰 조회

router.get("/review", async (req, res) => {
  const sql = `SELECT r.*, s.username, s.img_file_path FROM Review r LEFT JOIN Users s ON  r.userid = s.userid WHERE LECTUREID = ? order by createat desc;`;
  const values = [req.query.lectureId];

  console.log(req.query);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(result);
    }
  });
});

//리뷰 수정

router.post("/review/edit", async (req, res) => {
  const { reviewId, review, userId } = req.body;

  let sql = `UPDATE Review SET Review = ? WHERE ReviewID = ? and userid = ? ;`;
  const values = [review, reviewId, userId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send({ success: true });
    }
  });
});

//리뷰 삭제

router.post("/review/delete", async (req, res) => {
  const { reviewId, userId } = req.body;

  let sql = `DELETE FROM Review WHERE ReviewID = ? and userid = ? ;`;
  const values = [reviewId, userId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send({ success: true });
    }
  });
});

// 질문 수정

router.post("/question/edit", async (req, res) => {
  const { questionId, question, userId, tocId } = req.body;

  let sql = `UPDATE Question SET Ques = ? WHERE QuestionID = ? and userid = ? and tocid =  ?;`;
  const values = [question, questionId, userId, tocId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send({ success: true });
    }
  });
});
module.exports = router;
