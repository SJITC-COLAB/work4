const express = require('express');
const router = express.Router();
const db = require('../models');
const Payment = db.Payment;

// Create
router.post('/', async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: ['ParkingRecord'],
    });
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: ['ParkingRecord'],
    });
    if (payment) res.status(200).json(payment);
    else res.status(404).json({ error: 'Payment not found' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (payment) {
      await payment.update(req.body);
      res.status(200).json(payment);
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (payment) {
      await payment.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;