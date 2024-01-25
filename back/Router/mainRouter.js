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
  let sql = `SELECT *
  FROM Lectures
  WHERE LOWER(title) LIKE LOWER('${search}%')
     OR CategoryID IN (
        SELECT CategoryID
        FROM Category
        WHERE LOWER(CategoryName) LIKE LOWER('%${search}%')
     );`;
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

router.get("/category/:category", async (req, res) => {
  console.log(req.params.category);
  console.log(typeof req.query.order);
  let category = req.params.category;

  let sqq;
  let sql = `SELECT *
  FROM Lectures
  WHERE CategoryID = (
      SELECT CategoryID
      FROM Category
      WHERE CategoryName = '${category}'
  ) ORDER BY LectureID DESC ; `;

  let sqlpopular = `SELECT l.*, COUNT(p.PayID) as TotalPayments
  FROM Lectures l
  LEFT JOIN pay p ON l.LectureID = p.LectureID
  WHERE l.CategoryID = (
      SELECT CategoryID
      FROM Category
      WHERE CategoryName = '${category}'
  )
  GROUP BY l.LectureID
  ORDER BY TotalPayments DESC, l.LectureID`;

  req.query.order === "0" ? (sql = sqlpopular) : (sql = sql);

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
