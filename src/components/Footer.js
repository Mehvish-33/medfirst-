// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 MedFirst Healthcare Management System. All Rights Reserved.</p>
      <p>
        <a href="/about">About Us</a> | 
        <a href="/contact">Contact</a> | 
        <a href="/privacy">Privacy Policy</a>
      </p>
    </footer>
  );
};

export default Footer;