import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const CarForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    PlateNumber: '',
    DriverName: '',
    PhoneNumber: '',
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
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Update Car" : "Add Car"}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-text-light mb-1">Plate Number</label>
          <input
            type="text"
            name="PlateNumber"
            value={formData.PlateNumber}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
            disabled={!!initialData} // Disable for updates since PlateNumber is the primary key
          />
        </div>
        <div className="mb-4">
          <label className="block text-text-light mb-1">Driver Name</label>
          <input
            type="text"
            name="DriverName"
            value={formData.DriverName}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-text-light mb-1">Phone Number</label>
          <input
            type="text"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
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

export default CarForm;