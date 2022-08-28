const mysql = require("mysql");
const express = require("express");
const empRoutes = express();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "employeeSystem",
});

empRoutes.get("/employees", (req, res) => {
  db.query("SELECT * from employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ data: result, message: "success" });
    }
  });
});

empRoutes.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name,age,country,position,wage) VALUES(? , ? , ? ,? ,? )",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Craeted a new employee successfully");
      }
    }
  );
});

empRoutes.put("/update", (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

empRoutes.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE from employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Deleted successfully");
    }
  });
});

module.exports = empRoutes;
