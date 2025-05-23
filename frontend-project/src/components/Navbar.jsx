import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
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
    <nav className="bg-primary p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand/Logo */}
        <Link to="/" className="text-white text-2xl font-bold hover:text-gray-200">
          PSSMS
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
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
          } md:flex flex-col items-center md:flex-row md:space-x-6 absolute md:static top-16 left-0 right-0 bg-primary md:bg-transparent p-4 md:p-0 z-10 md:z-auto`}
        >
          <Link
            to="/parking-slots"
            onClick={() => handleNavigation('/parking-slots')}
            className="text-white font-semibold hover:text-gray-200 transition-colors duration-200 py-2 md:py-0"
          >
            Parking Slots
          </Link>
          <Link
            to="/cars"
            onClick={() => handleNavigation('/cars')}
            className="text-white font-semibold hover:text-gray-200 transition-colors duration-200 py-2 md:py-0"
          >
            Cars
          </Link>
          <Link
            to="/parking-records"
            onClick={() => handleNavigation('/parking-records')}
            className="text-white font-semibold hover:text-gray-200 transition-colors duration-200 py-2 md:py-0"
          >
            Parking Records
          </Link>
          <Link
            to="/payments"
            onClick={() => handleNavigation('/payments')}
            className="text-white font-semibold hover:text-gray-200 transition-colors duration-200 py-2 md:py-0"
          >
            Payments
          </Link>
          <Link
            to="/report"
            onClick={() => handleNavigation('/report')}
            className="text-white font-semibold hover:text-gray-200 transition-colors duration-200 py-2 md:py-0"
          >
            Report
          </Link>
          <button
            onClick={handleLogout}
            className="block px-3 py-2 rounded-md bg-danger text-white hover:bg-danger-hover transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;