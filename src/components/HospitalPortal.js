import React, { useState, useEffect, useRef } from 'react';
import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import QRious from 'qrious';
import PatientHistory from './PatientHistory';
import ReportAnalysis from './ReportAnalysis';
import CheckupTimeline from './CheckupTimeline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHistory, faChartLine, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import './HospitalPortal.css';  // Assuming you have a CSS file for styling

function HospitalPortal({ isAuthRoute }) {
    const [isScanned, setIsScanned] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const qrRef = useRef(null);
    const navigate = useNavigate();

    const qrUrl = `${window.location.origin}/hospital-portal/auth`;

    useEffect(() => {
        if (qrRef.current) {
            console.log("Initializing QR code...");
            new QRious({
                element: qrRef.current,
                value: qrUrl,
                size: 250,
            });
        }
    }, [qrUrl]);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === 'abc') {
            setIsAuthenticated(true);
            navigate('/'); // Redirect to home page after authentication
        } else {
            alert('Incorrect password. Please try again.');
        }
    };

    if (isAuthRoute) {
        return (
            !isAuthenticated ? (
                !isScanned ? (
                    <div className="qr-scan-container">
                        <h2>Scan the QR Code to Access Patient Details</h2>
                        <canvas ref={qrRef} className="qr-code"></canvas>
                        <button onClick={() => setIsScanned(true)} className="scan-complete-button">
                            click to access details through unique key 
                        </button>
                    </div>
                ) : (
                    <div className="auth-container">
                        <h2>Enter the Password to Access the Portal</h2>
                        <div className="patient-details">
                            <p><strong>Name:</strong> John Doe</p>
                            <p><strong>Age:</strong> 32</p>
                            <p><strong>Blood Group:</strong> O+</p>
                            <p><strong>Phone:</strong> (123) 456-7890</p>
                            <p><strong>Address:</strong> 123 Main St, City, Country</p>
                        </div>
                        <form onSubmit={handlePasswordSubmit} className="auth-form">
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="password-input"
                                required
                            />
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                    </div>
                )
            ) : (
                <Navigate to="/" replace />
            )
        );
    }

    return (
        isAuthenticated ? (
            <div className="hospital-portal-container">
                <nav className="side-nav">
                    <ul>
                        <li>
                            <Link to="/" className="nav-link">
                                <FontAwesomeIcon icon={faHome} className="nav-icon" />
                                User Home Page
                            </Link>
                        </li>
                        <li>
                            <Link to="/patient-history" className="nav-link">
                                <FontAwesomeIcon icon={faHistory} className="nav-icon" />
                                Patient Record History
                            </Link>
                        </li>
                        <li>
                            <Link to="/report-analysis" className="nav-link">
                                <FontAwesomeIcon icon={faChartLine} className="nav-icon" />
                                Report Analysis
                            </Link>
                        </li>
                        <li>
                            <Link to="/checkup-timeline" className="nav-link">
                                <FontAwesomeIcon icon={faStethoscope} className="nav-icon" />
                                Checkup Timeline
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="portal-content">
                    <Routes>
                        <Route path="/" element={
                            <div className="home-container">
                                <div className="user-card">
                                    <h2>Your Details</h2>
                                    <p><strong>Name:</strong> John Doe</p>
                                    <p><strong>Age:</strong> 32</p>
                                    <p><strong>Blood Group:</strong> O+</p>
                                    <p><strong>Phone:</strong> (123) 456-7890</p>
                                    <p><strong>Address:</strong> 123 Main St, City, Country</p>
                                </div>
                               
                            </div>
                        } />
                        <Route path="/patient-history" element={<PatientHistory />} />
                        <Route path="/report-analysis" element={<ReportAnalysis />} />
                        <Route path="/checkup-timeline" element={<CheckupTimeline />} />
                    </Routes>
                </div>
            </div>
        ) : (
            <Navigate to="/auth" replace />
        )
    );
}

export default HospitalPortal;
