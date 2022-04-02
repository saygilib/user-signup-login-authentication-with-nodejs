const bodyParser = require("body-parser");
const { request } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
const verifyJwt = require("./middleware/verifyJwt");
var port = process.env.PORT || 1516;
const authRoutes = require("./routes/authRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = require("./models/index");

db.sequelize.sync();

app.use(authRoutes);

app.post("/hello", verifyJwt.verifyToken, (req, res) => {
  res.send("hello");
});
app.listen(port, () => {
  console.log("running on port " + port);
});
