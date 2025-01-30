"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Automatically generates a UUID
        primaryKey: true, // Mark as primary key
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false, // Ensure username is required
        unique: true, // Ensure username is unique
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // Ensure password is required
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
