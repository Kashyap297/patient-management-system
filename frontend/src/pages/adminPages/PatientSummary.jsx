import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import classNames from 'classnames';
import api from '../../api/api';

const PatientSummary = () => {
  const [activeTab, setActiveTab] = useState('Week');
  const [chartData, setChartData] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await api.get('/users/patients');
        const patients = response.data;

        const currentDate = new Date();
        const weeklySummary = [
          { day: 'Mon', newPatient: 0, oldPatient: 0 },
          { day: 'Tue', newPatient: 0, oldPatient: 0 },
          { day: 'Wed', newPatient: 0, oldPatient: 0 },
          { day: 'Thu', newPatient: 0, oldPatient: 0 },
          { day: 'Fri', newPatient: 0, oldPatient: 0 },
          { day: 'Sat', newPatient: 0, oldPatient: 0 },
          { day: 'Sun', newPatient: 0, oldPatient: 0 },
        ];
        const dailySummary = Array.from({ length: 7 }, (_, i) => ({
          date: new Date(currentDate - (i * 24 * 60 * 60 * 1000)).toLocaleDateString("en-GB", { day: 'numeric', month: 'short' }),
          newPatient: 0,
          oldPatient: 0
        })).reverse();

        patients.forEach(patient => {
          const createdAt = new Date(patient.createdAt);
          const daysAgo = Math.floor((currentDate - createdAt) / (1000 * 60 * 60 * 24));

          const patientType = daysAgo < 7 ? 'newPatient' : 'oldPatient';

          if (activeTab === 'Week') {
            const dayOfWeek = createdAt.toLocaleString('en-US', { weekday: 'short' });
            const dayIndex = weeklySummary.findIndex(day => day.day === dayOfWeek);
            if (dayIndex >= 0) {
              weeklySummary[dayIndex][patientType] += 1;
            }
          } else {
            const dateString = createdAt.toLocaleDateString("en-GB", { day: 'numeric', month: 'short' });
            const dayIndex = dailySummary.findIndex(day => day.date === dateString);
            if (dayIndex >= 0) {
              dailySummary[dayIndex][patientType] += 1;
            }
          }
        });

        setChartData(activeTab === 'Week' ? weeklySummary : dailySummary);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [activeTab]);

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
          <XAxis dataKey={activeTab === 'Week' ? 'day' : 'date'} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="newPatient"
            stroke="#FFA500"
            activeDot={{ r: 8 }}
            name="New Patient"
          />
          <Line
            type="monotone"
            dataKey="oldPatient"
            stroke="#1E90FF"
            name="Old Patient"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PatientSummary;
