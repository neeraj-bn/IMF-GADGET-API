const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');  // Ensure this is correct

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,  // This ensures the Sequelize instance is passed
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  }
);

module.exports = User;
