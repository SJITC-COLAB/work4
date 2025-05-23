import React, { useState, useEffect } from 'react';
import api from '../services/api';
import CarForm from '../components/CarForm';
import DeleteWarning from '../components/DeleteWarning';

const CarPage = () => {
  const [cars, setCars] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await api.getCars();
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleAdd = async (data) => {
    try {
      await api.createCar(data);
      fetchCars();
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await api.updateCar(data.PlateNumber, data);
      fetchCars();
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteCar(selectedCar.PlateNumber);
      fetchCars();
      setIsDeleteOpen(false);
      setSelectedCar(null);
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-bold text-text mb-4">Cars</h1>
      <button
        onClick={() => setIsFormOpen(true)}
        className="mb-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
      >
        Add Car
      </button>
      <table className="w-full bg-background-dark rounded shadow">
        <thead>
          <tr className="border-b border-border">
            <th className="p-3 text-text">Plate Number</th>
            <th className="p-3 text-text">Driver Name</th>
            <th className="p-3 text-text">Phone Number</th>
            <th className="p-3 text-text">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.PlateNumber} className="border-b border-border">
              <td className="p-3 text-text">{car.PlateNumber}</td>
              <td className="p-3 text-text">{car.DriverName}</td>
              <td className="p-3 text-text">{car.PhoneNumber}</td>
              <td className="p-3">
                <button
                  onClick={() => {
                    setSelectedCar(car);
                    setIsFormOpen(true);
                  }}
                  className="mr-2 px-3 py-1 bg-secondary text-white rounded hover:bg-secondary-hover"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedCar(car);
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

      <CarForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCar(null);
        }}
        onSubmit={selectedCar ? handleUpdate : handleAdd}
        initialData={selectedCar}
      />

      <DeleteWarning
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        itemName={`Car ${selectedCar?.PlateNumber}`}
      />
    </div>
  );
};

export default CarPage;