import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import api from '../../api/api';

const PatientsAge = () => {
  const [data, setData] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);

  // Define age groups with colors
  const ageGroups = [
    { name: '0-2 Years', minAge: 0, maxAge: 2, color: '#F65D79', percentageColor: '#F65D79' },
    { name: '3-12 Years', minAge: 3, maxAge: 12, color: '#506EF2', percentageColor: '#506EF2' },
    { name: '13-19 Years', minAge: 13, maxAge: 19, color: '#51D2A6', percentageColor: '#51D2A6' },
    { name: '20-39 Years', minAge: 20, maxAge: 39, color: '#F6A52D', percentageColor: '#F6A52D' },
    { name: '40-59 Years', minAge: 40, maxAge: 59, color: '#FACF2E', percentageColor: '#FACF2E' },
    { name: '60 And Above', minAge: 60, maxAge: Infinity, color: '#9253E1', percentageColor: '#9253E1' },
  ];

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/users/patients');
        const patients = response.data;

        const ageData = ageGroups.map((group) => ({
          name: group.name,
          value: 0,
          color: group.color,
          percentageColor: group.percentageColor,
        }));

        patients.forEach((patient) => {
          const age = patient.age;
          ageGroups.forEach((group, index) => {
            if (age >= group.minAge && age <= group.maxAge) {
              ageData[index].value += 1;
            }
          });
        });

        setData(ageData);
        setTotalPatients(patients.length);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="glass p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group min-h-[400px] flex flex-col">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110"></div>
      
      <h2 className="text-xl font-extrabold text-secondary tracking-tight mb-8">Patients Age</h2>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 flex-1">
        {/* Donut Chart with 3D Effect */}
        <div className="relative flex justify-center items-center">
          <PieChart width={220} height={220}>
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.1" />
              </filter>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
              style={{ filter: 'url(#shadow)' }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
          </PieChart>

          {/* Total Patients */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="text-center transform transition-transform duration-300 group-hover:scale-110">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total</p>
              <p className="text-3xl font-black text-gray-800 tracking-tighter">{totalPatients}</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-3 lg:gap-y-4">
          {data.map((entry, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-50/80 px-3 py-2 rounded-xl border border-gray-100/50 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-full shadow-inner"
                  style={{ backgroundColor: entry.color }}
                ></span>
                <p className="text-sm font-semibold text-gray-600 w-24">{entry.name}</p>
              </div>
              <div className="flex items-center">
                 <div className="w-px h-6 bg-gray-200 mx-3 hidden lg:block"></div>
                 <p style={{ color: entry.percentageColor }} className="font-bold text-sm">
                   {totalPatients > 0 ? `${((entry.value / totalPatients) * 100).toFixed(1)}%` : '0%'}
                 </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientsAge;
