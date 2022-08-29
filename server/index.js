const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const empRoutes = require("./routes/employees.js");
const userRoutes = require("./routes/user.js");
app.use("/", empRoutes);
app.use("/", userRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
