import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const PatientsSummary = () => {
  // Data for the chart
  const data = {
    labels: ['New Patients', 'Old Patients'],
    datasets: [
      {
        data: [35, 65], // The values for new and old patients
        backgroundColor: ['#F6C762', '#44C27F'], // Colors for the chart sections
        borderWidth: 0,
      },
    ],
  };

  // Chart options
  const options = {
    cutout: '70%', // The hollow part of the doughnut
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
      {/* Chart Section */}
      <div className="relative w-1/2">
        <Doughnut data={data} options={options} />
        {/* Display total patients in the center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-gray-400 text-sm">Total Patients</p>
          <p className="text-2xl font-semibold text-blue-600">100</p>
        </div>
      </div>

      {/* Legend Section */}
      <div className="w-1/2 flex flex-col justify-center">
        <h3 className="text-lg font-semibold mb-4">Patients Summary</h3>
        <ul>
          <li className="flex items-center justify-between mb-2">
            <span className="text-sm">New Patients</span>
            <span className="text-sm text-gray-500">35</span>
            <span className="w-3 h-3 bg-[#F6C762] rounded-full ml-2"></span>
          </li>
          <li className="flex items-center justify-between mb-2">
            <span className="text-sm">Old Patients</span>
            <span className="text-sm text-gray-500">65</span>
            <span className="w-3 h-3 bg-[#44C27F] rounded-full ml-2"></span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm">Total Patients</span>
            <span className="text-sm text-gray-500">100</span>
            <span className="w-3 h-3 bg-[#4C49ED] rounded-full ml-2"></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PatientsSummary;
