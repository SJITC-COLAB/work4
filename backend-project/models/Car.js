const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Car = sequelize.define('Car', {
    PlateNumber: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    DriverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Car.associate = (models) => {
    Car.hasMany(models.ParkingRecord, { foreignKey: 'PlateNumber' });
  };

  return Car;
};