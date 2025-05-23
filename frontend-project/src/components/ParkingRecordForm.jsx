import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import api from '../services/api';

const ParkingRecordForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    SlotNumber: '',
    PlateNumber: '',
    EntryTime: '',
    ExitTime: '',
    Duration: '',
  });
  const [parkingSlots, setParkingSlots] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        EntryTime: initialData.EntryTime ? initialData.EntryTime.slice(0, 16) : '',
        ExitTime: initialData.ExitTime ? initialData.ExitTime.slice(0, 16) : '',
      });
    }
    // Fetch parking slots and cars for dropdowns
    const fetchData = async () => {
      const slots = await api.getParkingSlots();
      const cars = await api.getCars();
      setParkingSlots(slots.data);
      setCars(cars.data);
    };
    fetchData();
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Update Parking Record" : "Add Parking Record"}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-text-light mb-1">Slot Number</label>
          <select
            name="SlotNumber"
            value={formData.SlotNumber}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Select Slot</option>
            {parkingSlots.map(slot => (
              <option key={slot.SlotNumber} value={slot.SlotNumber}>{slot.SlotNumber}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-text-light mb-1">Plate Number</label>
          <select
            name="PlateNumber"
            value={formData.PlateNumber}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Select Car</option>
            {cars.map(car => (
              <option key={car.PlateNumber} value={car.PlateNumber}>{car.PlateNumber}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-text-light mb-1">Entry Time</label>
          <input
            type="datetime-local"
            name="EntryTime"
            value={formData.EntryTime}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-text-light mb-1">Exit Time</label>
          <input
            type="datetime-local"
            name="ExitTime"
            value={formData.ExitTime}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label className="block text-text-light mb-1">Duration (minutes)</label>
          <input
            type="number"
            name="Duration"
            value={formData.Duration}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-background-dark text-text rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
          >
            {initialData ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ParkingRecordForm;