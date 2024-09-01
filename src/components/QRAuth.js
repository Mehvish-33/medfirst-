import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QRious from 'qrious';

function QRAuth() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const qrRef = useRef(null);

  useEffect(() => {
    new QRious({
      element: qrRef.current,
      value: `${window.location.origin}/hospital-portal`,
      size: 250,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'abc') {
      navigate('/hospital-portal');
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h1>Scan QR and Enter Password to Access Portal</h1>
      <canvas ref={qrRef} className="qr-code"></canvas>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          className="password-input"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default QRAuth;
