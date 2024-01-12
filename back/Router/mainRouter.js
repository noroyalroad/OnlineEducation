const router = require("express").Router();
const bodyParser = require("body-parser");
const db = require("../DBC");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
  db.query("SELECT * FROM Lectures ORDER BY LectureID DESC;", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data retrieved:", rows);
      res.send(rows);
    }
  });
});

// router.get("/", (req, res) => {
//   req.dbConnection
//     .query("SELECT * FROM Lectures ORDER BY LectureID DESC;")
//     .then((rows) => {
//       console.log("Data retrieved:", rows);
//       res.send(rows);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//     });
// });

router.get("/hotlist", (req, res) => {
  db.query(
    `SELECT l.*, COUNT(p.PayID) as TotalPayments FROM Lectures l
    LEFT JOIN pay p ON l.LectureID = p.LectureID
    GROUP BY l.LectureID
    ORDER BY TotalPayments DESC, l.LectureID;`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Data retrieved:", result);
        res.send(result);
      }
    }
  );
});

//search
router.get("/search", async (req, res) => {
  console.log(req.query);
  let search = req.query.title;
  let sql = `SELECT * FROM Lectures WHERE title LIKE '%${search}%' ORDER BY LectureID DESC`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data retrieved:", result);
      res.send(result);
    }
  });
});

//category

router.get("/category", async (req, res) => {
  console.log(req.query);
  let category = req.query.categoryid;
  let sql = ` SELECT * FROM Lectures WHERE CATEGORYID = '${category}' OR CATEGORYID2 = '${category}' OR CATEGORYID3 = '${category}'; `;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data retrieved:", result);
      res.send(result);
    }
  });
});

module.exports = router;
