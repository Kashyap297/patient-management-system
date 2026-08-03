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
    <div className="glass p-6 md:p-8 rounded-3xl h-full shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <h2 className="text-xl font-extrabold text-secondary tracking-tight">Patients Summary</h2>
        
        {/* Toggle between Week and Day */}
        <div className="flex bg-gray-100/80 backdrop-blur-sm p-1 rounded-xl shadow-inner mt-3 sm:mt-0">
          {['Week', 'Day'].map((tab) => (
            <button
              key={tab}
              className={classNames(
                'px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300',
                activeTab === tab
                  ? 'bg-white text-orange-500 shadow-sm ring-1 ring-black/5'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-white/50'
              )}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Line Chart */}
      <div className="relative z-10 -ml-4">
        <ResponsiveContainer width="100%" height={380} minWidth={320}>
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey={activeTab === 'Week' ? 'day' : 'date'}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} 
              dx={-10}
            />
            <Tooltip
              cursor={{ stroke: '#F3F4F6', strokeWidth: 2 }}
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', padding: '12px' }}
              itemStyle={{ fontWeight: 600, padding: '2px 0' }}
            />
            <Legend 
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span className="text-sm font-medium text-gray-700 ml-1">{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="newPatient"
              stroke="#F97316"
              strokeWidth={3}
              dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="New Patient"
            />
            <Line
              type="monotone"
              dataKey="oldPatient"
              stroke="#0EA5E9"
              strokeWidth={3}
              dot={{ fill: '#0EA5E9', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="Old Patient"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PatientSummary;
