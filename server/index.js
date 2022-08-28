const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "employeeSystem",
});

app.get("/employees", (req, res) => {
  db.query("SELECT * from employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ data: result, message: "success" });
    }
  });
});

app.post("/create", (req, res) => {
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

app.put("/update", (req, res) => {
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

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE from employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Deleted successfully");
    }
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
