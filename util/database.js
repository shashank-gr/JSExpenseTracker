const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("node-project", "root", "Rockergr@7", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
