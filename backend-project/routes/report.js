const express = require('express');
const router = express.Router();
const db = require('../models');

// Generate report
router.get('/', async (req, res) => {
  try {
    const parkingSlots = await db.ParkingSlot.findAll();
    const cars = await db.Car.findAll();
    const parkingRecords = await db.ParkingRecord.findAll({
      include: ['ParkingSlot', 'Car'],
    });
    const payments = await db.Payment.findAll({
      include: [
        {
          model: db.ParkingRecord,
          include: ['ParkingSlot', 'Car'],
        },
      ],
    });

    const report = {
      totalParkingSlots: parkingSlots.length,
      parkingSlots: parkingSlots,
      totalCars: cars.length,
      cars: cars,
      totalParkingRecords: parkingRecords.length,
      parkingRecords: parkingRecords,
      totalPayments: payments.length,
      totalRevenue: payments.reduce((sum, payment) => sum + parseFloat(payment.AmountPaid), 0),
      payments: payments,
    };

    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;