import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HospitalPortal from './components/HospitalPortal';
import PatientHistory from './components/PatientHistory';
import ReportAnalysis from './components/ReportAnalysis';
import CheckupTimeline from './components/CheckupTimeline';
import MyChartComponent from './components/MyChartComponent';  // Import your chart component
import Footer from './components/Footer';  // Import Footer
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Authentication Route */}
          <Route path="/auth" element={<HospitalPortal isAuthRoute={true} />} />

          {/* Protected Routes */}
          <Route path="/" element={<HospitalPortal />}>
            <Route path="patient-history" element={<PatientHistory />} />
            <Route path="report-analysis" element={<ReportAnalysis />} />
            <Route path="checkup-timeline" element={<CheckupTimeline />} />
            {/* Example: Including chart component in a specific route */}
            <Route path="charts" element={<MyChartComponent />} />
          </Route>

          {/* Redirect any unknown routes to authentication */}
          <Route path="*" element={<HospitalPortal isAuthRoute={true} />} />
        </Routes>
        <Footer /> {/* Footer component placed at the bottom */}
      </div>
    </Router>
  );
}

export default App;
