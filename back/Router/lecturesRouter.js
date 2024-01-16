const router = require("express").Router();
const bodyParser = require("body-parser");
const db = require("../DBC");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// 수강 중인 강의
router.get("/course", async (req, res) => {
  console.log(req.query);

  let sql = `SELECT
  e.UserID,
  e.LectureID,
  e.EnrollmentsDate,
  e.AttendanceRate,
  e.paymentstatus,
  l.title,           
  l.InstructorID     
  FROM
  Enrollments e
  JOIN
  Lectures l ON e.LectureID = l.LectureID
  WHERE
  e.UserID = ${req.query.st};`;

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

// 강의 상세 페이지

router.get("/detail/:id", async (req, res) => {
  console.log(req.params.id);
  const info = `SELECT l.description, i.InstructorID, i.InstructorName, i.Email, i.Qualifications
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
router.post("/enroll", async (req, res) => {
  console.log(req.body);
  const { UserID, LectureID } = req.body;

  let sql = `INSERT INTO Enrollments(UserID, LectureID)
  VALUES
  ( ?, ?);`;
  const values = [UserID, LectureID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send({ success: true });
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
