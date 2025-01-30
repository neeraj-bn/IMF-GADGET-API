const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres", // Use "mysql" if MySQL is used
  logging: false, // Set to true for debugging
});

module.exports = sequelize;
