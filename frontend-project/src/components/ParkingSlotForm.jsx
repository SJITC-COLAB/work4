import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const ParkingSlotForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    SlotNumber: '',
    SlotStatus: 'Available',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
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
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Update Parking Slot" : "Add Parking Slot"}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-text-light mb-1">Slot Number</label>
          <input
            type="number"
            name="SlotNumber"
            value={formData.SlotNumber}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
            disabled={!!initialData} // Disable for updates since SlotNumber is the primary key
          />
        </div>
        <div className="mb-4">
          <label className="block text-text-light mb-1">Slot Status</label>
          <select
            name="SlotStatus"
            value={formData.SlotStatus}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
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

export default ParkingSlotForm;