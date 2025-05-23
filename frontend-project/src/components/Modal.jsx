import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background-dark p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text">{title}</h2>
          <button onClick={onClose} className="text-text-light hover:text-text">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;