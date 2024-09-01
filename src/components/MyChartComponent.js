import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const MyChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'bar', // Change this to the chart type you're using
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Sales',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'category',
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });

      return () => {
        myChart.destroy();
      };
    }
  }, []);

  return <canvas ref={chartRef} />;
};

export default MyChartComponent;
