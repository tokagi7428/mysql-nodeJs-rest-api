const mysql = require("mysql");
const express = require("express");
const bcrypJs = require("bcryptjs");
const userRoutes = express();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "employeeSystem",
});

userRoutes.post("/register", async (req, res) => {
  let { email, password, username } = req.body;
  //   console.log({ email, password, username });
  const hashedPassword = bcrypJs.hashSync(password);
  db.query(
    "SELECT email FROM useremps WHERE email = ? ",
    email,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        console.log(result[0].email);
        res.send("have email already");
      } else {
        db.query(
          "INSERT INTO useremps (email, password, username) VALUES(? , ? ,? )",
          [email, hashedPassword, username],
          (err, result) => {
            if (err) {
              res.json({ status: "Error", message: err });
            } else {
              res.json({ status: "ok" });
              console.log(result);
            }
          }
        );
      }
    }
  );
});

userRoutes.post("/login", (req, res) => {
  db.query(
    "SELECT * FROM useremps WHERE email = ?",
    req.body.email,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      if (result.length > 0) {
        const { password } = result[0];
        if (bcrypJs.compareSync(req.body.password, password)) {
          const { username, email } = result[0];
          res.json({ data: { username, email }, status: "SUCCESS" });
        } else {
          res.json({ message: "Email or password  is not correct" });
        }
      }
      res.json({ message: "Email or password  is not correct" });
    }
  );
});

module.exports = userRoutes;
