import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import jsPDF from 'jspdf';
import { Line } from 'react-chartjs-2';

const ReportAnalysis = () => {
  const [formData, setFormData] = useState({
    bloodSugar: '',
    cholesterol: '',
  });
  const [diagnosis, setDiagnosis] = useState(null);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy data for the chart
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Blood Sugar',
        data: [80, 85, 78, 90],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Cholesterol',
        data: [180, 175, 185, 190],
        fill: false,
        borderColor: '#742774',
      },
    ],
  };

  // Load the TensorFlow.js model
  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log('Loading model...');
        const loadedModel = await tf.loadLayersModel('/tfjs_model/model.json');
        setModel(loadedModel);
        console.log('Model loaded successfully.');
      } catch (error) {
        console.error('Failed to load model:', error);
        setError('Failed to load model. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadModel();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!model) {
      setError('Model is not loaded. Please wait.');
      return;
    }

    try {
      const bloodSugar = parseFloat(formData.bloodSugar);
      const cholesterol = parseFloat(formData.cholesterol);

      if (isNaN(bloodSugar) || isNaN(cholesterol)) {
        setError('Please enter valid numbers for blood sugar and cholesterol.');
        return;
      }

      const inputTensor = tf.tensor2d([[bloodSugar, cholesterol]]);
      const prediction = model.predict(inputTensor);
      const predictedValue = prediction.dataSync()[0];

      let diagnosisResult = 'Normal';
      if (predictedValue > 0.5) {
        diagnosisResult = 'Potential Issue Detected';
      }

      setDiagnosis(diagnosisResult);
      setError(null);
    } catch (error) {
      console.error('Error during prediction:', error);
      setError('An error occurred during prediction. Please try again.');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Blood Report Analysis', 20, 20);
    doc.text(`Blood Sugar: ${formData.bloodSugar}`, 20, 30);
    doc.text(`Cholesterol: ${formData.cholesterol}`, 20, 40);
    doc.text(`Diagnosis: ${diagnosis}`, 20, 50);
    doc.save('health_report.pdf');
  };

  return (
    <div>
      <h2>Blood Report Analysis</h2>

      {loading && <p>Loading model, please wait...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Blood Sugar:</label>
          <input
            type="number"
            name="bloodSugar"
            value={formData.bloodSugar}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cholesterol:</label>
          <input
            type="number"
            name="cholesterol"
            value={formData.cholesterol}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>Analyze</button>
      </form>

      {diagnosis && (
        <div>
          <h3>Diagnosis: {diagnosis}</h3>
          <button onClick={generatePDF}>Download PDF Report</button>
        </div>
      )}

      <div style={{ marginTop: '50px' }}>
        <h3>Health Data Over Time</h3>
        <Line data={data} />
      </div>
    </div>
  );
};

export default ReportAnalysis;
