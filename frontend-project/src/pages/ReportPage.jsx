import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ReportPage = () => {
  const [report, setReport] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    parkingSlots: false,
    cars: false,
    parkingRecords: false,
    payments: false,
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

  // Data for the bar chart
  const metrics = [
    { label: 'Parking Slots', value: report.totalParkingSlots, color: '#2C4A52' }, // primary
    { label: 'Cars', value: report.totalCars, color: '#F4A261' }, // secondary
    { label: 'Payments', value: report.totalPayments, color: '#D9534F' }, // danger
    { label: 'Revenue (RWF)', value: report.totalRevenue / 1000, color: '#4A6A73' }, // primary-hover (scaled down for visualization)
  ];

  const maxValue = Math.max(...metrics.map((m) => m.value), 1); // Avoid division by zero

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-text mb-6">Parking System Report</h1>

      {/* Summary Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-text mb-4">Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="flex items-center bg-background p-4 rounded-lg shadow-sm">
            <svg className="w-8 h-8 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
            <div>
              <p className="text-text-light text-sm">Total Parking Slots</p>
              <p className="text-xl font-bold text-text">{report.totalParkingSlots}</p>
            </div>
          </div>
          <div className="flex items-center bg-background p-4 rounded-lg shadow-sm">
            <svg className="w-8 h-8 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10h6m-6 0h6M5 7h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" />
            </svg>
            <div>
              <p className="text-text-light text-sm">Total Cars</p>
              <p className="text-xl font-bold text-text">{report.totalCars}</p>
            </div>
          </div>
          <div className="flex items-center bg-background p-4 rounded-lg shadow-sm">
            <svg className="w-8 h-8 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <div>
              <p className="text-text-light text-sm">Total Parking Records</p>
              <p className="text-xl font-bold text-text">{report.totalParkingRecords}</p>
            </div>
          </div>
          <div className="flex items-center bg-background p-4 rounded-lg shadow-sm">
            <svg className="w-8 h-8 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0-6a9 9 0 00-9 9v6a2 2 0 002 2h14a2 2 0 002-2v-6a9 9 0 00-9-9z" />
            </svg>
            <div>
              <p className="text-text-light text-sm">Total Payments</p>
              <p className="text-xl font-bold text-text">{report.totalPayments}</p>
            </div>
          </div>
          <div className="flex items-center bg-background p-4 rounded-lg shadow-sm">
            <svg className="w-8 h-8 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 0c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0-6a9 9 0 00-9 9v6a2 2 0 002 2h14a2 2 0 002-2v-6a9 9 0 00-9-9z" />
            </svg>
            <div>
              <p className="text-text-light text-sm">Total Revenue (RWF)</p>
              <p className="text-xl font-bold text-text">{report.totalRevenue}</p>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-background-dark p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-text mb-4">Key Metrics Overview</h3>
          <svg width="100%" height="200" viewBox="0 0 500 200" className="overflow-visible">
            {metrics.map((metric, index) => {
              const barWidth = 80;
              const barHeight = (metric.value / maxValue) * 150;
              const x = index * (barWidth + 20) + 20;
              const y = 150 - barHeight;

              return (
                <g key={metric.label}>
                  {/* Bar */}
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={metric.color}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                  {/* Label */}
                  <text
                    x={x + barWidth / 2}
                    y={180}
                    textAnchor="middle"
                    fill="#2D3748"
                    fontSize="12"
                  >
                    {metric.label}
                  </text>
                  {/* Value */}
                  <text
                    x={x + barWidth / 2}
                    y={y - 10}
                    textAnchor="middle"
                    fill="#2D3748"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {metric.label === 'Revenue (RWF)' ? `${metric.value}K` : metric.value}
                  </text>
                </g>
              );
            })}
          </svg>
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
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-3 text-left font-semibold">Slot Number</th>
                  <th className="p-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {report.parkingSlots.map((slot, index) => (
                  <tr
                    key={slot.SlotNumber}
                    className={`border-b border-border transition-colors duration-200 hover:bg-primary-hover hover:text-white ${
                      index % 2 === 0 ? 'bg-background' : 'bg-background-dark'
                    }`}
                  >
                    <td className="p-3">{slot.SlotNumber}</td>
                    <td className="p-3">{slot.SlotStatus}</td>
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
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-3 text-left font-semibold">Plate Number</th>
                  <th className="p-3 text-left font-semibold">Driver Name</th>
                  <th className="p-3 text-left font-semibold">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {report.cars.map((car, index) => (
                  <tr
                    key={car.PlateNumber}
                    className={`border-b border-border transition-colors duration-200 hover:bg-primary-hover hover:text-white ${
                      index % 2 === 0 ? 'bg-background' : 'bg-background-dark'
                    }`}
                  >
                    <td className="p-3">{car.PlateNumber}</td>
                    <td className="p-3">{car.DriverName}</td>
                    <td className="p-3">{car.PhoneNumber}</td>
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
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-3 text-left font-semibold">ID</th>
                  <th className="p-3 text-left font-semibold">Slot Number</th>
                  <th className="p-3 text-left font-semibold">Plate Number</th>
                  <th className="p-3 text-left font-semibold">Entry Time</th>
                  <th className="p-3 text-left font-semibold">Exit Time</th>
                  <th className="p-3 text-left font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody>
                {report.parkingRecords.map((record, index) => (
                  <tr
                    key={record.id}
                    className={`border-b border-border transition-colors duration-200 hover:bg-primary-hover hover:text-white ${
                      index % 2 === 0 ? 'bg-background' : 'bg-background-dark'
                    }`}
                  >
                    <td className="p-3">{record.id}</td>
                    <td className="p-3">{record.SlotNumber}</td>
                    <td className="p-3">{record.PlateNumber}</td>
                    <td className="p-3">{new Date(record.EntryTime).toLocaleString()}</td>
                    <td className="p-3">{record.ExitTime ? new Date(record.ExitTime).toLocaleString() : 'N/A'}</td>
                    <td className="p-3">{record.Duration || 'N/A'}</td>
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
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-3 text-left font-semibold">ID</th>
                  <th className="p-3 text-left font-semibold">Parking Record ID</th>
                  <th className="p-3 text-left font-semibold">Amount Paid (RWF)</th>
                  <th className="p-3 text-left font-semibold">Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {report.payments.map((payment, index) => (
                  <tr
                    key={payment.id}
                    className={`border-b border-border transition-colors duration-200 hover:bg-primary-hover hover:text-white ${
                      index % 2 === 0 ? 'bg-background' : 'bg-background-dark'
                    }`}
                  >
                    <td className="p-3">{payment.id}</td>
                    <td className="p-3">{payment.ParkingRecordId}</td>
                    <td className="p-3">{payment.AmountPaid}</td>
                    <td className="p-3">{new Date(payment.PaymentDate).toLocaleString()}</td>
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