'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Ensure each model is initialized with the Sequelize instance
fs
  .readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith('.js') && !file.includes('.test.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file)); // Get the model
    model.init(sequelize);  // Ensure the sequelize instance is passed
    db[model.name] = model;  // Add model to db object
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);  // Ensure associations are set
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
