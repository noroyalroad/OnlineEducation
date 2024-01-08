const router = require("express").Router();
const bodyParser = require("body-parser");
const db = require("../DBC");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// router.use(dbMiddleware);

router.post("/test2", (req, res) => {
  console.log(req.body);
  db.query(`INSERT INTO Category (CategoryID,CategoryName) VALUES ('${req.body.CategoryID}','${req.body.CategoryName}');`, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data inserted:", rows);
      res.send({ success: true });
    }
  });
});
router.get("/test1", (req, res) => {
  db.query("SELECT * FROM Category;", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data retrieved:", rows);
      res.send(rows);
    }
  });
});

router.post("/test3", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;

// router.get("/test1", async (req, res) => {
//   let conn;
//   try {
//     conn = await maria.getConnection();
//     const rows = await conn.query("SELECT * FROM Users;");
//     console.log("D");
//     res.send(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   } finally {
//     if (conn) conn.release();
//   }
// });
