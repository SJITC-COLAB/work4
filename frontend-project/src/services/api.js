import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Adjust based on your backend URL

const api = {
  // ParkingSlot APIs
  getParkingSlots: () => axios.get(`${API_URL}/parking-slots`),
  getParkingSlot: (id) => axios.get(`${API_URL}/parking-slots/${id}`),
  createParkingSlot: (data) => axios.post(`${API_URL}/parking-slots`, data),
  updateParkingSlot: (id, data) => axios.put(`${API_URL}/parking-slots/${id}`, data),
  deleteParkingSlot: (id) => axios.delete(`${API_URL}/parking-slots/${id}`),

  // Car APIs
  getCars: () => axios.get(`${API_URL}/cars`),
  getCar: (id) => axios.get(`${API_URL}/cars/${id}`),
  createCar: (data) => axios.post(`${API_URL}/cars`, data),
  updateCar: (id, data) => axios.put(`${API_URL}/cars/${id}`, data),
  deleteCar: (id) => axios.delete(`${API_URL}/cars/${id}`),

  // ParkingRecord APIs
  getParkingRecords: () => axios.get(`${API_URL}/parking-records`),
  getParkingRecord: (id) => axios.get(`${API_URL}/parking-records/${id}`),
  createParkingRecord: (data) => axios.post(`${API_URL}/parking-records`, data),
  updateParkingRecord: (id, data) => axios.put(`${API_URL}/parking-records/${id}`, data),
  deleteParkingRecord: (id) => axios.delete(`${API_URL}/parking-records/${id}`),

  // Payment APIs
  getPayments: () => axios.get(`${API_URL}/payments`),
  getPayment: (id) => axios.get(`${API_URL}/payments/${id}`),
  createPayment: (data) => axios.post(`${API_URL}/payments`, data),
  updatePayment: (id, data) => axios.put(`${API_URL}/payments/${id}`, data),
  deletePayment: (id) => axios.delete(`${API_URL}/payments/${id}`),

  // Report API
  getReport: () => axios.get(`${API_URL}/reports`),
};

export default api;