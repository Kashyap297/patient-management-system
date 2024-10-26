// src/components/PatientsStatistics.jsx
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../api/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PatientsStatistics = () => {
  const [timeframe, setTimeframe] = useState('Year'); // Initialize with 'Year'
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await api.get('/users/patients'); // Adjust endpoint as needed
        const patients = response.data;

        // Filter and count registrations based on the selected timeframe
        const currentDate = new Date();
        const dataCounts = Array(timeframe === 'Year' ? 12 : (timeframe === 'Month' ? 30 : 7)).fill(0);

        patients.forEach(patient => {
          const registrationDate = new Date(patient.createdAt);

          if (timeframe === 'Year' && registrationDate.getFullYear() === currentDate.getFullYear()) {
            const month = registrationDate.getMonth(); // Get month index (0-11)
            dataCounts[month]++;
          } else if (timeframe === 'Month' &&
            registrationDate.getMonth() === currentDate.getMonth() &&
            registrationDate.getFullYear() === currentDate.getFullYear()) {
            const day = registrationDate.getDate() - 1; // Get day (0-based)
            dataCounts[day]++;
          } else if (timeframe === 'Week') {
            const daysDifference = Math.floor((currentDate - registrationDate) / (1000 * 60 * 60 * 24));
            if (daysDifference < 7) {
              dataCounts[6 - daysDifference]++;
            }
          }
        });

        setChartData(dataCounts);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [timeframe]);

  // Define the chart data based on chartData
  const data = {
    labels: timeframe === 'Year'
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      : timeframe === 'Month'
        ? Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
        : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Patients Registered',
        data: chartData,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: '#A35DFF',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#A35DFF',
        tension: 0.4,
        pointRadius: 4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Patients Statistics</h2>
        <div className="flex gap-2">
          {['Year', 'Month', 'Week'].map((time) => (
            <button
              key={time}
              className={`px-4 py-2 text-sm font-medium rounded ${timeframe === time ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setTimeframe(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default PatientsStatistics;
