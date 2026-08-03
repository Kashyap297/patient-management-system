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
    <div className="glass p-6 md:p-8 rounded-3xl h-full shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <h2 className="text-xl font-extrabold text-secondary tracking-tight">Appointment Summary</h2>
        
        {/* Toggle between Year and Month */}
        <div className="flex bg-gray-100/80 backdrop-blur-sm p-1 rounded-xl shadow-inner">
          {['Year', 'Month'].map((tab) => (
            <button
              key={tab}
              className={classNames(
                'px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300',
                activeTab === tab
                  ? 'bg-white text-primary shadow-sm ring-1 ring-black/5'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-white/50'
              )}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="relative z-10 -ml-4">
        <ResponsiveContainer width="100%" height={380} minWidth={320}>
          <BarChart data={activeTab === 'Year' ? yearlyData : monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey={activeTab === 'Year' ? 'year' : 'month'} axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} dx={-10} />
            <Tooltip
              cursor={{ fill: '#F3F4F6' }}
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', padding: '12px' }}
              itemStyle={{ fontWeight: 600, padding: '2px 0' }}
            />
            <Legend 
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span className="text-sm font-medium text-gray-700 ml-1">{value}</span>}
            />
            <Bar dataKey="onlineConsultation" fill="#0EABEB" name="Online Consultation" radius={[6, 6, 0, 0]} maxBarSize={40} />
            <Bar dataKey="onsiteAppointment" fill="#4C49ED" name="Onsite Appointment" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AppointmentGraph;
