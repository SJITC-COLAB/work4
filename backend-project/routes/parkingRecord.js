const express = require('express');
const router = express.Router();
const db = require('../models');
const ParkingRecord = db.ParkingRecord;

// Create
router.post('/', async (req, res) => {
  try {
    const parkingRecord = await ParkingRecord.create(req.body);
    res.status(201).json(parkingRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const parkingRecords = await ParkingRecord.findAll({
      include: ['ParkingSlot', 'Car'],
    });
    res.status(200).json(parkingRecords);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const parkingRecord = await ParkingRecord.findByPk(req.params.id, {
      include: ['ParkingSlot', 'Car'],
    });
    if (parkingRecord) res.status(200).json(parkingRecord);
    else res.status(404).json({ error: 'ParkingRecord not found' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const parkingRecord = await ParkingRecord.findByPk(req.params.id);
    if (parkingRecord) {
      await parkingRecord.update(req.body);
      res.status(200).json(parkingRecord);
    } else {
      res.status(404).json({ error: 'ParkingRecord not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const parkingRecord = await ParkingRecord.findByPk(req.params.id);
    if (parkingRecord) {
      await parkingRecord.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'ParkingRecord not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;