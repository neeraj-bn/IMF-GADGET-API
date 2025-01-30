const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Gadget extends Model {}

  Gadget.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Available", "Deployed", "Destroyed", "Decommissioned"),
        defaultValue: "Available",
      },
    },
    { sequelize, modelName: "Gadget" }
  );

  return Gadget;
};
