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
    <div className="p-6 bg-white rounded-lg shadow-md w-fit">
      <h2 className="text-lg font-semibold mb-4">Patients Age</h2>
      <div className="flex justify-center items-center">
        {/* Donut Chart with 3D Effect */}
        <div className="relative flex justify-center items-center">
          <PieChart width={220} height={220}>
            <defs>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#ccc" />
              </filter>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
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
            <Tooltip />
          </PieChart>

          {/* Total Patients */}
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="text-center">
              <p className="text-gray-500">Total Patients</p>
              <p className="text-4xl font-bold text-blue-500">{totalPatients}</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="ml-6 mt-4">
          {data.map((entry, index) => (
            <div key={index} className="flex justify-between items-center my-1">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></span>
                <p>{entry.name}</p>
              </div>
              <p style={{ color: entry.percentageColor }} className="font-semibold">
                {`${((entry.value / totalPatients) * 100).toFixed(1)}%`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientsAge;
