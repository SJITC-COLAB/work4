import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ParkingSlotForm from '../components/ParkingSlotForm';
import DeleteWarning from '../components/DeleteWarning';

const ParkingSlotPage = () => {
  const [parkingSlots, setParkingSlots] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    fetchParkingSlots();
  }, []);

  const fetchParkingSlots = async () => {
    try {
      const response = await api.getParkingSlots();
      setParkingSlots(response.data);
    } catch (error) {
      console.error('Error fetching parking slots:', error);
    }
  };

  const handleAdd = async (data) => {
    try {
      await api.createParkingSlot(data);
      fetchParkingSlots();
    } catch (error) {
      console.error('Error adding parking slot:', error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await api.updateParkingSlot(data.SlotNumber, data);
      fetchParkingSlots();
    } catch (error) {
      console.error('Error updating parking slot:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteParkingSlot(selectedSlot.SlotNumber);
      fetchParkingSlots();
      setIsDeleteOpen(false);
      setSelectedSlot(null);
    } catch (error) {
      console.error('Error deleting parking slot:', error);
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-bold text-text mb-4">Parking Slots</h1>
      <button
        onClick={() => setIsFormOpen(true)}
        className="mb-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
      >
        Add Parking Slot
      </button>
      <table className="w-full bg-background-dark rounded shadow">
        <thead>
          <tr className="border-b border-border">
            <th className="p-3 text-text">Slot Number</th>
            <th className="p-3 text-text">Status</th>
            <th className="p-3 text-text">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parkingSlots.map(slot => (
            <tr key={slot.SlotNumber} className="border-b border-border">
              <td className="p-3 text-text">{slot.SlotNumber}</td>
              <td className="p-3 text-text">{slot.SlotStatus}</td>
              <td className="p-3">
                <button
                  onClick={() => {
                    setSelectedSlot(slot);
                    setIsFormOpen(true);
                  }}
                  className="mr-2 px-3 py-1 bg-secondary text-white rounded hover:bg-secondary-hover"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedSlot(slot);
                    setIsDeleteOpen(true);
                  }}
                  className="px-3 py-1 bg-danger text-white rounded hover:bg-danger-hover"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ParkingSlotForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedSlot(null);
        }}
        onSubmit={selectedSlot ? handleUpdate : handleAdd}
        initialData={selectedSlot}
      />

      <DeleteWarning
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        itemName={`Parking Slot ${selectedSlot?.SlotNumber}`}
      />
    </div>
  );
};

export default ParkingSlotPage;