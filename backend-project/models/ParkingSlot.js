const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ParkingSlot = sequelize.define('ParkingSlot', {
    SlotNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    SlotStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  ParkingSlot.associate = (models) => {
    ParkingSlot.hasMany(models.ParkingRecord, { foreignKey: 'SlotNumber' });
  };

  return ParkingSlot;
};