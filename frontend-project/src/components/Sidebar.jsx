import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    setIsOpen(false); // Close the menu on link click (for mobile)
    navigate(path);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-primary shadow-lg h-screen w-[240px] flex flex-col justify-between fixed top-0 left-0 z-50">
      <div className="flex flex-col">
        {/* Brand/Logo */}
        <Link
          to="/"
          className="text-white text-2xl font-bold hover:text-gray-200 p-4 border-b border-gray-700"
        >
          PSSMS
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white p-4 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:space-y-2 p-4`}
        >
          <Link
            to="/parking-slots"
            onClick={() => handleNavigation('/parking-slots')}
            className="text-white font-semibold hover:bg-primary-hover hover:text-white transition-colors duration-200 py-2 px-4 rounded"
          >
            Parking Slots
          </Link>
          <Link
            to="/cars"
            onClick={() => handleNavigation('/cars')}
            className="text-white font-semibold hover:bg-primary-hover hover:text-white transition-colors duration-200 py-2 px-4 rounded"
          >
            Cars
          </Link>
          <Link
            to="/parking-records"
            onClick={() => handleNavigation('/parking-records')}
            className="text-white font-semibold hover:bg-primary-hover hover:text-white transition-colors duration-200 py-2 px-4 rounded"
          >
            Parking Records
          </Link>
          <Link
            to="/payments"
            onClick={() => handleNavigation('/payments')}
            className="text-white font-semibold hover:bg-primary-hover hover:text-white transition-colors duration-200 py-2 px-4 rounded"
          >
            Payments
          </Link>
          <Link
            to="/report"
            onClick={() => handleNavigation('/report')}
            className="text-white font-semibold hover:bg-primary-hover hover:text-white transition-colors duration-200 py-2 px-4 rounded"
          >
            Report
          </Link>
        </div>
      </div>

      {/* Logout Button at the Bottom */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 rounded-md bg-danger text-white hover:bg-danger-hover transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;