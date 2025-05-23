const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ParkingRecord = sequelize.define('ParkingRecord', {
    EntryTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ExitTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  ParkingRecord.associate = (models) => {
    ParkingRecord.belongsTo(models.ParkingSlot, { foreignKey: 'SlotNumber' });
    ParkingRecord.belongsTo(models.Car, { foreignKey: 'PlateNumber' });
    ParkingRecord.hasOne(models.Payment, { foreignKey: 'ParkingRecordId' });
  };

  return ParkingRecord;
};