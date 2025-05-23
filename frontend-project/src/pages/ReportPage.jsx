import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ReportPage = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await api.getReport();
      setReport(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  if (!report) return <div className="p-6 bg-background min-h-screen">Loading...</div>;

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-bold text-text mb-4">Parking System Report</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text mb-2">Summary</h2>
        <p className="text-text">Total Parking Slots: {report.totalParkingSlots}</p>
        <p className="text-text">Total Cars: {report.totalCars}</p>
        <p className="text-text">Total Parking Records: {report.totalParkingRecords}</p>
        <p className="text-text">Total Payments: {report.totalPayments}</p>
        <p className="text-text">Total Revenue: {report.totalRevenue} RWF</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text mb-2">Parking Slots</h2>
        <table className="w-full bg-background-dark rounded shadow">
          <thead>
            <tr className="border-b border-border">
              <th className="p-3 text-text">Slot Number</th>
              <th className="p-3 text-text">Status</th>
            </tr>
          </thead>
          <tbody>
            {report.parkingSlots.map(slot => (
              <tr key={slot.SlotNumber} className="border-b border-border">
                <td className="p-3 text-text">{slot.SlotNumber}</td>
                <td className="p-3 text-text">{slot.SlotStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text mb-2">Cars</h2>
        <table className="w-full bg-background-dark rounded shadow">
          <thead>
            <tr className="border-b border-border">
              <th className="p-3 text-text">Plate Number</th>
              <th className="p-3 text-text">Driver Name</th>
              <th className="p-3 text-text">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {report.cars.map(car => (
              <tr key={car.PlateNumber} className="border-b border-border">
                <td className="p-3 text-text">{car.PlateNumber}</td>
                <td className="p-3 text-text">{car.DriverName}</td>
                <td className="p-3 text-text">{car.PhoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text mb-2">Parking Records</h2>
        <table className="w-full bg-background-dark rounded shadow">
          <thead>
            <tr className="border-b border-border">
              <th className="p-3 text-text">ID</th>
              <th className="p-3 text-text">Slot Number</th>
              <th className="p-3 text-text">Plate Number</th>
              <th className="p-3 text-text">Entry Time</th>
              <th className="p-3 text-text">Exit Time</th>
              <th className="p-3 text-text">Duration</th>
            </tr>
          </thead>
          <tbody>
            {report.parkingRecords.map(record => (
              <tr key={record.id} className="border-b border-border">
                <td className="p-3 text-text">{record.id}</td>
                <td className="p-3 text-text">{record.SlotNumber}</td>
                <td className="p-3 text-text">{record.PlateNumber}</td>
                <td className="p-3 text-text">{new Date(record.EntryTime).toLocaleString()}</td>
                <td className="p-3 text-text">{record.ExitTime ? new Date(record.ExitTime).toLocaleString() : 'N/A'}</td>
                <td className="p-3 text-text">{record.Duration || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-text mb-2">Payments</h2>
        <table className="w-full bg-background-dark rounded shadow">
          <thead>
            <tr className="border-b border-border">
              <th className="p-3 text-text">ID</th>
              <th className="p-3 text-text">Parking Record ID</th>
              <th className="p-3 text-text">Amount Paid (RWF)</th>
              <th className="p-3 text-text">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {report.payments.map(payment => (
              <tr key={payment.id} className="border-b border-border">
                <td className="p-3 text-text">{payment.id}</td>
                <td className="p-3 text-text">{payment.ParkingRecordId}</td>
                <td className="p-3 text-text">{payment.AmountPaid}</td>
                <td className="p-3 text-text">{new Date(payment.PaymentDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportPage;