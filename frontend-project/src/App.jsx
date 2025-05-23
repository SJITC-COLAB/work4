import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Updated to Sidebar
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

// Wrapper to conditionally show Sidebar
const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen flex w-full bg-background">
      {!isAuthPage && <Sidebar />}
      <main className={`flex-1 ${!isAuthPage ? 'ml-[240px] md:ml-[240px]' : ''}`}>
        {children}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
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
      </Layout>
    </Router>
  );
};

export default App;