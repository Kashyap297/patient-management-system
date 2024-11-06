import { useState, useEffect } from 'react';
import { Group } from '@mui/icons-material';
import Skeleton from 'react-loading-skeleton';
import api from '../../api/api';

const DoctorCountDepartment = () => {
  const [doctorSpecialtyCount, setDoctorSpecialtyCount] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/users/doctors');
        const doctors = response.data;

        const specialtyCountMap = doctors.reduce((acc, doctor) => {
          const specialty = doctor.doctorDetails?.specialtyType || 'General';
          if (!acc[specialty]) {
            acc[specialty] = 0;
          }
          acc[specialty] += 1;
          return acc;
        }, {});

        const specialtyCountArray = Object.keys(specialtyCountMap).map((specialty) => ({
          name: specialty,
          count: specialtyCountMap[specialty],
        }));

        setDoctorSpecialtyCount(specialtyCountArray);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchDoctors();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-h-[400px]">
      <div className="sticky top-0 bg-white z-10 border-b pb-2 mb-2">
        <h2 className="text-lg font-semibold mb-4">Doctor Count Department</h2>
        <div className="flex justify-between text-sm font-semibold text-gray-500">
          <p>Department Name</p>
          <p>Doctor Count</p>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[250px]">
        <table className="min-w-full">
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 text-left">
                      <Skeleton width={100} />
                    </td>
                    <td className="p-3 text-right flex justify-end items-center gap-2">
                      <Skeleton width={50} />
                    </td>
                  </tr>
                ))
              : doctorSpecialtyCount.map((item, index) => (
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
