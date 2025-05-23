import React from 'react';
import Modal from './Modal';

const DeleteWarning = ({ isOpen, onClose, onConfirm, itemName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
      <p className="text-text mb-4">
        Are you sure you want to delete {itemName}? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-background-dark text-text rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-danger text-white rounded hover:bg-danger-hover"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteWarning;