import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const patients = {
  1: {
    name: "John Doe",
    dob: "1990-01-01",
    bloodGroup: "O+",
    phone: "(123) 456-7890",
    address: "123 Main St, City, Country",
  },
  2: {
    name: "Jane Smith",
    dob: "1985-05-15",
    bloodGroup: "A-",
    phone: "(098) 765-4321",
    address: "456 Elm St, City, Country",
  },
};

function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const patient = patients[id];

  if (!patient) {
    return <div className="error">Patient not found</div>;
  }

  const handlePasswordSubmit = () => {
    if (password === 'abc') {
      navigate('/hospital-portal');
    } else {
      alert('Incorrect password! Please try again.');
    }
  };

  return (
    <div className="patient-details-container">
      <h2>{patient.name}</h2>
      <div className="patient-info">
        <p><strong>Age:</strong> {new Date().getFullYear() - new Date(patient.dob).getFullYear()}</p>
        <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Address:</strong> {patient.address}</p>
      </div>

      <div className="password-section">
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />
        <button onClick={handlePasswordSubmit} className="submit-button">Submit</button>
      </div>
    </div>
  );
}

export default PatientDetails;
