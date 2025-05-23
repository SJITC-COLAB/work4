import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ParkingSlotPage from './pages/ParkingSlotPage';
import CarPage from './pages/CarPage';
import ParkingRecordPage from './pages/ParkingRecordPage';
import PaymentPage from './pages/PaymentPage';
import ReportPage from './pages/ReportPage';
import Login from './pages/Login';
import Register from './pages/Register';
import authService from './services/authService';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = authService.getCurrentUser();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/parking-slots"
            element={
              <ProtectedRoute>
                <ParkingSlotPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars"
            element={
              <ProtectedRoute>
                <CarPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parking-records"
            element={
              <ProtectedRoute>
                <ParkingRecordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/parking-slots" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;