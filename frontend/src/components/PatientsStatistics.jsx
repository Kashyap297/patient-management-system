import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../api/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PatientsStatistics = () => {
  const [timeframe, setTimeframe] = useState('Year');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true); // Set loading to true when data fetching starts
      try {
        const response = await api.get('/users/patients');
        const patients = response.data;

        const currentDate = new Date();
        const dataCounts = Array(timeframe === 'Year' ? 12 : (timeframe === 'Month' ? 30 : 7)).fill(0);

        patients.forEach((patient) => {
          const registrationDate = new Date(patient.createdAt);

          if (timeframe === 'Year' && registrationDate.getFullYear() === currentDate.getFullYear()) {
            const month = registrationDate.getMonth();
            dataCounts[month]++;
          } else if (timeframe === 'Month' && registrationDate.getMonth() === currentDate.getMonth() && registrationDate.getFullYear() === currentDate.getFullYear()) {
            const day = registrationDate.getDate() - 1;
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
      } finally {
        setLoading(false); // Set loading to false when data fetching is done
      }
    };

    fetchPatientData();
  }, [timeframe]);

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
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
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
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Patients Statistics</h2>
        <div className="flex gap-2">
          {['Year', 'Month', 'Week'].map((time) => (
            <button
              key={time}
              className={`px-4 py-2 text-sm font-medium rounded ${
                timeframe === time ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setTimeframe(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Skeleton Loader or Chart */}
      {loading ? (
        <div className="mt-6">
          <Skeleton height={300} />
        </div>
      ) : (
        <Line data={data} options={options} className="mt-6" />
      )}
    </div>
  );
};

export default PatientsStatistics;
