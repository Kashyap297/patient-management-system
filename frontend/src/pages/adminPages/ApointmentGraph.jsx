import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import classNames from 'classnames';

const AppointmentGraph = () => {
  const [activeTab, setActiveTab] = useState('Year'); // default tab

  // Sample data for the Yearly and Monthly Graphs
  const yearlyData = [
    { year: '2017', onlineConsultation: 10, otherAppointment: 5 },
    { year: '2018', onlineConsultation: 15, otherAppointment: 12 },
    { year: '2019', onlineConsultation: 20, otherAppointment: 18 },
    { year: '2020', onlineConsultation: 25, otherAppointment: 20 },
    { year: '2021', onlineConsultation: 50, otherAppointment: 35 },
    { year: '2022', onlineConsultation: 40, otherAppointment: 30 },
    { year: '2023', onlineConsultation: 10, otherAppointment: 5 },
    { year: '2024', onlineConsultation: 30, otherAppointment: 25 },
  ];

  const monthlyData = [
    { month: 'Jan', onlineConsultation: 5, otherAppointment: 3 },
    { month: 'Feb', onlineConsultation: 10, otherAppointment: 6 },
    { month: 'Mar', onlineConsultation: 15, otherAppointment: 9 },
    { month: 'Apr', onlineConsultation: 20, otherAppointment: 12 },
    { month: 'May', onlineConsultation: 30, otherAppointment: 20 },
    { month: 'Jun', onlineConsultation: 25, otherAppointment: 18 },
    { month: 'Jul', onlineConsultation: 35, otherAppointment: 25 },
    { month: 'Aug', onlineConsultation: 20, otherAppointment: 15 },
    { month: 'Sep', onlineConsultation: 10, otherAppointment: 8 },
    { month: 'Oct', onlineConsultation: 12, otherAppointment: 9 },
    { month: 'Nov', onlineConsultation: 5, otherAppointment: 3 },
    { month: 'Dec', onlineConsultation: 8, otherAppointment: 6 },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Appointment</h2>
        {/* Toggle between Year and Month */}
        <div className="flex space-x-2">
          <button
            className={classNames(
              'px-4 py-2 rounded-lg',
              activeTab === 'Year' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            )}
            onClick={() => handleTabChange('Year')}
          >
            Year
          </button>
          <button
            className={classNames(
              'px-4 py-2 rounded-lg',
              activeTab === 'Month' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            )}
            onClick={() => handleTabChange('Month')}
          >
            Month
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={activeTab === 'Year' ? yearlyData : monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={activeTab === 'Year' ? 'year' : 'month'} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="onlineConsultation" fill="#1E90FF" name="Online Consultation" />
          <Bar dataKey="otherAppointment" fill="#00BFFF" name="Other Appointment" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppointmentGraph;
