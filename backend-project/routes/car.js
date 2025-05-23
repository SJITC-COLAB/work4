const express = require('express');
const router = express.Router();
const db = require('../models');
const Car = db.Car;

// Create
router.post('/', async (req, res) => {
  try {

    // Validate request body
    if(!req.body){
        return res.status(400).json({ error: 'Request body is required' });
    }

    const existingCar = await Car.findOne({ where: { PlateNumber: req.body.PlateNumber } });

    if (existingCar) {
      return res.status(400).json({ error: 'Car with this plate number already exists' });
    }

    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (car) res.status(200).json(car);
    else res.status(404).json({ error: 'Car not found' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (car) {
      await car.update(req.body);
      res.status(200).json(car);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (car) {
      await car.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;