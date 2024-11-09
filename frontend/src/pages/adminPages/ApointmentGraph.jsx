import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import classNames from 'classnames';
import api from "../../api/api"; // Import the API utility

const AppointmentGraph = () => {
  const [activeTab, setActiveTab] = useState('Year'); // default tab
  const [yearlyData, setYearlyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  // Fetch appointment data from the API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointments");
        const appointments = response.data.data;

        // Process yearly data
        const yearlySummary = {};
        appointments.forEach((appointment) => {
          const year = new Date(appointment.appointmentDate).getFullYear();
          if (!yearlySummary[year]) {
            yearlySummary[year] = { year, onlineConsultation: 0, onsiteAppointment: 0 };
          }
          if (appointment.appointmentType === "Online") {
            yearlySummary[year].onlineConsultation += 1;
          } else {
            yearlySummary[year].onsiteAppointment += 1;
          }
        });
        setYearlyData(Object.values(yearlySummary));

        // Process monthly data for the current year
        const currentYear = new Date().getFullYear();
        const monthlySummary = Array(12).fill(null).map((_, index) => ({
          month: new Date(0, index).toLocaleString("default", { month: "short" }),
          onlineConsultation: 0,
          onsiteAppointment: 0,
        }));
        
        appointments.forEach((appointment) => {
          const date = new Date(appointment.appointmentDate);
          if (date.getFullYear() === currentYear) {
            const monthIndex = date.getMonth();
            if (appointment.appointmentType === "Online") {
              monthlySummary[monthIndex].onlineConsultation += 1;
            } else {
              monthlySummary[monthIndex].onsiteAppointment += 1;
            }
          }
        });
        setMonthlyData(monthlySummary);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-md h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700">Appointment Summary</h2>
        
        {/* Toggle between Year and Month */}
        <div className="flex space-x-2">
          {['Year', 'Month'].map((tab) => (
            <button
              key={tab}
              className={classNames(
                'px-4 py-2 rounded-xl text-sm md:text-base transition-colors duration-300',
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <ResponsiveContainer width="100%" height={400} minWidth={320}>
        <BarChart data={activeTab === 'Year' ? yearlyData : monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={activeTab === 'Year' ? 'year' : 'month'} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="onlineConsultation" fill="#1E90FF" name="Online Consultation" radius={[10, 10, 0, 0]} />
          <Bar dataKey="onsiteAppointment" fill="#00BFFF" name="Onsite Appointment" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppointmentGraph;
