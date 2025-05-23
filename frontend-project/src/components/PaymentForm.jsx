import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import api from '../services/api';

const PaymentForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    ParkingRecordId: '',
    AmountPaid: '',
    PaymentDate: '',
  });
  const [parkingRecords, setParkingRecords] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        PaymentDate: initialData.PaymentDate ? initialData.PaymentDate.slice(0, 16) : '',
      });
    }
    const fetchData = async () => {
      const records = await api.getParkingRecords();
      setParkingRecords(records.data);
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
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Update Payment" : "Add Payment"}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-text-light mb-1">Parking Record ID</label>
          <select
            name="ParkingRecordId"
            value={formData.ParkingRecordId}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Select Record</option>
            {parkingRecords.map(record => (
              <option key={record.id} value={record.id}>{record.id}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-text-light mb-1">Amount Paid (RWF)</label>
          <input
            type="number"
            name="AmountPaid"
            value={formData.AmountPaid}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
            step="0.01"
          />
        </div>
        <div className="mb-4">
          <label className="block text-text-light mb-1">Payment Date</label>
          <input
            type="datetime-local"
            name="PaymentDate"
            value={formData.PaymentDate}
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

export default PaymentForm;