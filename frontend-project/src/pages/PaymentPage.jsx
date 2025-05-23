import React, { useState, useEffect } from 'react';
import api from '../services/api';
import PaymentForm from '../components/PaymentForm';
import DeleteWarning from '../components/DeleteWarning';

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.getPayments();
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleAdd = async (data) => {
    try {
      await api.createPayment(data);
      fetchPayments();
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await api.updatePayment(selectedPayment.id, data);
      fetchPayments();
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deletePayment(selectedPayment.id);
      fetchPayments();
      setIsDeleteOpen(false);
      setSelectedPayment(null);
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-bold text-text mb-4">Payments</h1>
      <button
        onClick={() => setIsFormOpen(true)}
        className="mb-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
      >
        Add Payment
      </button>
      <table className="w-full bg-background-dark rounded shadow">
        <thead>
          <tr className="border-b border-border">
            <th className="p-3 text-text">ID</th>
            <th className="p-3 text-text">Parking Record ID</th>
            <th className="p-3 text-text">Amount Paid (RWF)</th>
            <th className="p-3 text-text">Payment Date</th>
            <th className="p-3 text-text">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id} className="border-b border-border">
              <td className="p-3 text-text">{payment.id}</td>
              <td className="p-3 text-text">{payment.ParkingRecordId}</td>
              <td className="p-3 text-text">{payment.AmountPaid}</td>
              <td className="p-3 text-text">{new Date(payment.PaymentDate).toLocaleString()}</td>
              <td className="p-3">
                <button
                  onClick={() => {
                    setSelectedPayment(payment);
                    setIsFormOpen(true);
                  }}
                  className="mr-2 px-3 py-1 bg-secondary text-white rounded hover:bg-secondary-hover"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedPayment(payment);
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

      <PaymentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedPayment(null);
        }}
        onSubmit={selectedPayment ? handleUpdate : handleAdd}
        initialData={selectedPayment}
      />

      <DeleteWarning
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        itemName={`Payment ${selectedPayment?.id}`}
      />
    </div>
  );
};

export default PaymentPage;