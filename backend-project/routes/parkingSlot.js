const express = require('express');
const router = express.Router();
const db = require('../models');
const ParkingSlot = db.ParkingSlot;

// Create
router.post('/', async (req, res) => {
  try {

    if (!req.body) {
        return res.status(400).json({ error: 'Request body is required' });
        }

    const existingParkingSlot = await ParkingSlot.findOne({ where: { SlotNumber: req.body.SlotNumber } });
    if (existingParkingSlot) {  
        return res.status(400).json({ error: 'ParkingSlot with this slot number already exists' });
        }

    const parkingSlot = await ParkingSlot.create(req.body);
    res.status(201).json(parkingSlot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const parkingSlots = await ParkingSlot.findAll();
    res.status(200).json(parkingSlots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const parkingSlot = await ParkingSlot.findByPk(req.params.id);
    if (parkingSlot) res.status(200).json(parkingSlot);
    else res.status(404).json({ error: 'ParkingSlot not found' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const parkingSlot = await ParkingSlot.findByPk(req.params.id);
    if (parkingSlot) {
      await parkingSlot.update(req.body);
      res.status(200).json(parkingSlot);
    } else {
      res.status(404).json({ error: 'ParkingSlot not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const parkingSlot = await ParkingSlot.findByPk(req.params.id);
    if (parkingSlot) {
      await parkingSlot.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'ParkingSlot not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;