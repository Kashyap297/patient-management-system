import { useState, useEffect } from 'react';
import { Group } from '@mui/icons-material';
import api from '../../api/api';

const DoctorCountDepartment = () => {
  const [doctorSpecialtyCount, setDoctorSpecialtyCount] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/users/doctors');
        const doctors = response.data;

        // Process and count doctors by specialty
        const specialtyCountMap = doctors.reduce((acc, doctor) => {
          const specialty = doctor.doctorDetails?.specialtyType || 'General';
          if (!acc[specialty]) {
            acc[specialty] = 0;
          }
          acc[specialty] += 1;
          return acc;
        }, {});

        // Convert the map to an array for rendering
        const specialtyCountArray = Object.keys(specialtyCountMap).map((specialty) => ({
          name: specialty,
          count: specialtyCountMap[specialty],
        }));

        setDoctorSpecialtyCount(specialtyCountArray);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-h-[400px]">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b pb-2 mb-2">
        <h2 className="text-lg font-semibold mb-4">Doctor Count Department</h2>
        <div className="flex justify-between text-sm font-semibold text-gray-500">
          <p>Department Name</p>
          <p>Doctor Count</p>
        </div>
      </div>

      {/* Scrollable Data */}
      <div className="overflow-y-auto max-h-[250px]">
        <table className="min-w-full">
          <tbody>
            {doctorSpecialtyCount.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-3 text-left">{item.name}</td>
                <td className="p-3 text-right flex justify-end items-center gap-2">
                  <Group className="text-blue-500" />
                  <span className="font-semibold text-blue-500">{item.count}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorCountDepartment;
