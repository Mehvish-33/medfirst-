import React from 'react';
import { FaUser } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Healthcare Management System</h1>

      <div className="user-card">
        <div className="user-details">
          <h2>Patient Details</h2>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Age:</strong> 32</p>
          <p><strong>Blood Group:</strong> O+</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
          <p><strong>Address:</strong> 123 Main St, City, Country</p>
        </div>
        <div className="user-icon-container">
          <FaUser className="user-icon" />
        </div>
      </div>
    </div>
  );
};

export default Home;
