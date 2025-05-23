import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ParkingRecordForm from '../components/ParkingRecordForm';
import DeleteWarning from '../components/DeleteWarning';

const ParkingRecordPage = () => {
  const [parkingRecords, setParkingRecords] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetchParkingRecords();
  }, []);

  const fetchParkingRecords = async () => {
    try {
      const response = await api.getParkingRecords();
      setParkingRecords(response.data);
    } catch (error) {
      console.error('Error fetching parking records:', error);
    }
  };

  const handleAdd = async (data) => {
    try {
      await api.createParkingRecord(data);
      fetchParkingRecords();
    } catch (error) {
      console.error('Error adding parking record:', error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await api.updateParkingRecord(selectedRecord.id, data);
      fetchParkingRecords();
    } catch (error) {
      console.error('Error updating parking record:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteParkingRecord(selectedRecord.id);
      fetchParkingRecords();
      setIsDeleteOpen(false);
      setSelectedRecord(null);
    } catch (error) {
      console.error('Error deleting parking record:', error);
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-bold text-text mb-4">Parking Records</h1>
      <button
        onClick={() => setIsFormOpen(true)}
        className="mb-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
      >
        Add Parking Record
      </button>
      <table className="w-full bg-background-dark rounded shadow">
        <thead>
          <tr className="border-b border-border">
            <th className="p-3 text-text">ID</th>
            <th className="p-3 text-text">Slot Number</th>
            <th className="p-3 text-text">Plate Number</th>
            <th className="p-3 text-text">Entry Time</th>
            <th className="p-3 text-text">Exit Time</th>
            <th className="p-3 text-text">Duration</th>
            <th className="p-3 text-text">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parkingRecords.map(record => (
            <tr key={record.id} className="border-b border-border">
              <td className="p-3 text-text">{record.id}</td>
              <td className="p-3 text-text">{record.SlotNumber}</td>
              <td className="p-3 text-text">{record.PlateNumber}</td>
              <td className="p-3 text-text">{new Date(record.EntryTime).toLocaleString()}</td>
              <td className="p-3 text-text">{record.ExitTime ? new Date(record.ExitTime).toLocaleString() : 'N/A'}</td>
              <td className="p-3 text-text">{record.Duration || 'N/A'}</td>
              <td className="p-3">
                <button
                  onClick={() => {
                    setSelectedRecord(record);
                    setIsFormOpen(true);
                  }}
                  className="mr-2 px-3 py-1 bg-secondary text-white rounded hover:bg-secondary-hover"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedRecord(record);
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

      <ParkingRecordForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedRecord(null);
        }}
        onSubmit={selectedRecord ? handleUpdate : handleAdd}
        initialData={selectedRecord}
      />

      <DeleteWarning
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        itemName={`Parking Record ${selectedRecord?.id}`}
      />
    </div>
  );
};

export default ParkingRecordPage;