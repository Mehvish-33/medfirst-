import React from 'react';
import './CheckupTimeline.css';  // Ensure the CSS file is imported

const CheckupTimeline = () => {
  const checkups = [
    { date: '2024-01-15', detail: 'General Checkup - All normal.' },
    { date: '2024-02-10', detail: 'Blood Test - Slightly elevated cholesterol.' },
    { date: '2024-03-05', detail: 'Consultation - Discussed diet changes.' },
    { date: '2024-04-20', detail: 'Follow-up - Improvement in cholesterol levels.' },
    { date: '2024-05-30', detail: 'Specialist Consultation - Referred to cardiologist.' },
  ];

  return (
    <div className="checkup-timeline-container">
      <h2>Checkup Timeline</h2>
      <ul className="timeline">
        {checkups.map((checkup, index) => (
          <li key={index} className="timeline-item">
            <div className="timeline-content">
              <p className="timeline-date">{checkup.date}</p>
              <p className="timeline-details">{checkup.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckupTimeline;
