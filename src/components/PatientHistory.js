import React from 'react';

function PatientHistory() {
  const reports = [
    { date: '2024-08-01', type: 'Blood Test', result: 'Normal' },
    { date: '2024-08-10', type: 'X-Ray', result: 'No Issues Detected' },
    { date: '2024-08-15', type: 'MRI', result: 'Minor Abnormalities' },
    { date: '2024-08-20', type: 'ECG', result: 'Normal' },
    { date: '2024-09-01', type: 'Ultrasound', result: 'Normal' },
    { date: '2024-09-10', type: 'CT Scan', result: 'No Issues Detected' },
  ];

  return (
    <div className="report-history-container">
      <h2>Patient Record History</h2>
      <ul className="report-list">
        {reports.map((report, index) => (
          <li key={index} className="report-item">
            <strong>Date:</strong> {report.date} <br />
            <strong>Type:</strong> {report.type} <br />
            <strong>Result:</strong> {report.result}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientHistory;
