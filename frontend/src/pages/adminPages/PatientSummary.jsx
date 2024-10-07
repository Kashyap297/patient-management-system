import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import classNames from 'classnames';

const PatientSummary = () => {
  const [activeTab, setActiveTab] = useState('Week');

  // Sample data for weekly and daily views
  const weeklyData = [
    { day: 'Mon', newPatient: 10, oldPatient: 20 },
    { day: 'Tue', newPatient: 20, oldPatient: 30 },
    { day: 'Wed', newPatient: 30, oldPatient: 15 },
    { day: 'Thu', newPatient: 25, oldPatient: 35 },
    { day: 'Fri', newPatient: 40, oldPatient: 25 },
    { day: 'Sat', newPatient: 20, oldPatient: 45 },
    { day: 'Sun', newPatient: 15, oldPatient: 30 },
  ];

  const dailyData = [
    { hour: '12 AM', newPatient: 5, oldPatient: 15 },
    { hour: '1 AM', newPatient: 10, oldPatient: 20 },
    { hour: '2 AM', newPatient: 8, oldPatient: 10 },
    { hour: '3 AM', newPatient: 6, oldPatient: 14 },
    { hour: '4 AM', newPatient: 12, oldPatient: 9 },
    { hour: '5 AM', newPatient: 15, oldPatient: 18 },
    { hour: '6 AM', newPatient: 20, oldPatient: 25 },
    { hour: '7 AM', newPatient: 12, oldPatient: 22 },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const chartData = activeTab === 'Week' ? weeklyData : dailyData;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Patients Summary</h2>
        <div className="flex space-x-2">
          <button
            className={classNames(
              'px-4 py-2 rounded-lg',
              activeTab === 'Week' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            )}
            onClick={() => handleTabChange('Week')}
          >
            Week
          </button>
          <button
            className={classNames(
              'px-4 py-2 rounded-lg',
              activeTab === 'Day' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            )}
            onClick={() => handleTabChange('Day')}
          >
            Day
          </button>
        </div>
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={activeTab === 'Week' ? 'day' : 'hour'} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="newPatient" stroke="#FFA500" activeDot={{ r: 8 }} name="New Patient" />
          <Line type="monotone" dataKey="oldPatient" stroke="#1E90FF" name="Old Patient" />
        </LineChart>
      </ResponsiveContainer>

     
    </div>
  );
};

export default PatientSummary;
