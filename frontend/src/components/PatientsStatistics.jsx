import { useState } from 'react';
import { Line } from 'react-chartjs-2';
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

  // Sample data for Year, Month, and Week
  const chartData = {
    Year: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [20000, 23000, 25000, 24000, 21000, 26000, 2678, 32000, 35000, 36000, 30000, 40000],
    },
    Month: {
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50000)), // Random data for demo
    },
    Week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [20000, 23000, 2678, 24000, 31000, 38000, 40000],
    }
  };

  // Determine if there is any data available for the current timeframe
  const isDataAvailable = chartData[timeframe].data.length > 0;

  // If data is available, use the dataset; otherwise, use an empty dataset
  const data = {
    labels: chartData[timeframe].labels,
    datasets: isDataAvailable
      ? [
          {
            label: 'Patients',
            data: chartData[timeframe].data,
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: '#A35DFF',
            pointBackgroundColor: '#fff',
            pointBorderColor: '#A35DFF',
            tension: 0.4,
            pointRadius: 4
          }
        ]
      : [] // Empty dataset if no data available
  };

  // Options for the chart
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
        max: 50000,
        ticks: {
          stepSize: 10000
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
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
      {isDataAvailable ? (
        <Line data={data} options={options} />
      ) : (
        <div className="h-64 flex justify-center items-center">
          <p className="text-gray-400">No data available for this timeframe.</p>
        </div>
      )}
    </div>
  );
};

export default PatientsStatistics;
