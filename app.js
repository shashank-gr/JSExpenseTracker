const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const userRoute = require("./routes/user");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(userRoute);
app.use((req, res) => {
  res.send("Error page not found");
});

sequelize
  .sync()
  .then(() => {
    app.listen(3600);
  })
  .catch((err) => console.log(err));
