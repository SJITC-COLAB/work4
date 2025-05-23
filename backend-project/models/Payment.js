const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Payment = sequelize.define('Payment', {
    AmountPaid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    PaymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.ParkingRecord, { foreignKey: 'ParkingRecordId' });
  };

  return Payment;
};