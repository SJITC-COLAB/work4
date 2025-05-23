import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ReportPage = () => {
  const [report, setReport] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    parkingSlots: true,
    cars: true,
    parkingRecords: true,
    payments: true,
  });

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

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!report) return <div className="p-6 bg-background min-h-screen">Loading...</div>;

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-text mb-8">Parking System Report</h1>

      {/* Summary Section - Card Layout */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-text mb-4">Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-background-dark p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <p className="text-text-light text-sm">Total Parking Slots</p>
            <p className="text-2xl font-bold text-primary">{report.totalParkingSlots}</p>
          </div>
          <div className="bg-background-dark p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <p className="text-text-light text-sm">Total Cars</p>
            <p className="text-2xl font-bold text-primary">{report.totalCars}</p>
          </div>
          <div className="bg-background-dark p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <p className="text-text-light text-sm">Total Parking Records</p>
            <p className="text-2xl font-bold text-primary">{report.totalParkingRecords}</p>
          </div>
          <div className="bg-background-dark p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <p className="text-text-light text-sm">Total Payments</p>
            <p className="text-2xl font-bold text-primary">{report.totalPayments}</p>
          </div>
          <div className="bg-background-dark p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <p className="text-text-light text-sm">Total Revenue (RWF)</p>
            <p className="text-2xl font-bold text-primary">{report.totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Parking Slots Section - Collapsible */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center bg-primary text-white p-4 rounded-t-lg cursor-pointer"
          onClick={() => toggleSection('parkingSlots')}
        >
          <h2 className="text-xl font-semibold">Parking Slots</h2>
          <svg
            className={`w-6 h-6 transform transition-transform duration-200 ${expandedSections.parkingSlots ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedSections.parkingSlots && (
          <div className="bg-background-dark rounded-b-lg shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary-hover text-white">
                  <th className="p-3 text-left">Slot Number</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {report.parkingSlots.map((slot, index) => (
                  <tr
                    key={slot.SlotNumber}
                    className={`border-b border-border ${index % 2 === 0 ? 'bg-background-dark' : 'bg-background'}`}
                  >
                    <td className="p-3 text-text">{slot.SlotNumber}</td>
                    <td className="p-3 text-text">{slot.SlotStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cars Section - Collapsible */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center bg-primary text-white p-4 rounded-t-lg cursor-pointer"
          onClick={() => toggleSection('cars')}
        >
          <h2 className="text-xl font-semibold">Cars</h2>
          <svg
            className={`w-6 h-6 transform transition-transform duration-200 ${expandedSections.cars ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedSections.cars && (
          <div className="bg-background-dark rounded-b-lg shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary-hover text-white">
                  <th className="p-3 text-left">Plate Number</th>
                  <th className="p-3 text-left">Driver Name</th>
                  <th className="p-3 text-left">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {report.cars.map((car, index) => (
                  <tr
                    key={car.PlateNumber}
                    className={`border-b border-border ${index % 2 === 0 ? 'bg-background-dark' : 'bg-background'}`}
                  >
                    <td className="p-3 text-text">{car.PlateNumber}</td>
                    <td className="p-3 text-text">{car.DriverName}</td>
                    <td className="p-3 text-text">{car.PhoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Parking Records Section - Collapsible */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center bg-primary text-white p-4 rounded-t-lg cursor-pointer"
          onClick={() => toggleSection('parkingRecords')}
        >
          <h2 className="text-xl font-semibold">Parking Records</h2>
          <svg
            className={`w-6 h-6 transform transition-transform duration-200 ${expandedSections.parkingRecords ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedSections.parkingRecords && (
          <div className="bg-background-dark rounded-b-lg shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary-hover text-white">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Slot Number</th>
                  <th className="p-3 text-left">Plate Number</th>
                  <th className="p-3 text-left">Entry Time</th>
                  <th className="p-3 text-left">Exit Time</th>
                  <th className="p-3 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                {report.parkingRecords.map((record, index) => (
                  <tr
                    key={record.id}
                    className={`border-b border-border ${index % 2 === 0 ? 'bg-background-dark' : 'bg-background'}`}
                  >
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
        )}
      </div>

      {/* Payments Section - Collapsible */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center bg-primary text-white p-4 rounded-t-lg cursor-pointer"
          onClick={() => toggleSection('payments')}
        >
          <h2 className="text-xl font-semibold">Payments</h2>
          <svg
            className={`w-6 h-6 transform transition-transform duration-200 ${expandedSections.payments ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedSections.payments && (
          <div className="bg-background-dark rounded-b-lg shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary-hover text-white">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Parking Record ID</th>
                  <th className="p-3 text-left">Amount Paid (RWF)</th>
                  <th className="p-3 text-left">Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {report.payments.map((payment, index) => (
                  <tr
                    key={payment.id}
                    className={`border-b border-border ${index % 2 === 0 ? 'bg-background-dark' : 'bg-background'}`}
                  >
                    <td className="p-3 text-text">{payment.id}</td>
                    <td className="p-3 text-text">{payment.ParkingRecordId}</td>
                    <td className="p-3 text-text">{payment.AmountPaid}</td>
                    <td className="p-3 text-text">{new Date(payment.PaymentDate).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;