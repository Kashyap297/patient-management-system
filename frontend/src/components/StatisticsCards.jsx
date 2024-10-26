import { useEffect, useState } from 'react';
import { Group, LocalHospital, EventAvailable } from '@mui/icons-material';
import InfoCard from '../pages/adminPages/InfoCard';
import api from '../api/api'; // Import the api instance

const StatisticsCards = () => {
  const [counts, setCounts] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch total patients
        const patientsResponse = await api.get('/users/patients');
        const doctorsResponse = await api.get('/users/doctors');
        const appointmentsResponse = await api.get('/appointments');

        // Adjust these according to the response structure
        const patientsCount = patientsResponse.data.length;
        const doctorsCount = doctorsResponse.data.length;
        const appointmentsCount = appointmentsResponse.data.length || appointmentsResponse.data.count || appointmentsResponse.data.data.length;

        setCounts({
          patients: patientsCount,
          doctors: doctorsCount,
          appointments: appointmentsCount,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="flex gap-6 justify-between rounded-2xl">
      <InfoCard
        icon={<Group className="text-blue-600" />}
        label="Total Patients"
        value={counts.patients}
        iconBgColor="bg-blue-100"
      />
      <InfoCard
        icon={<LocalHospital className="text-purple-600" />}
        label="Total Doctors"
        value={counts.doctors}
        iconBgColor="bg-purple-100"
      />
      <InfoCard
        icon={<EventAvailable className="text-green-600" />}
        label="Today's Appointments"
        value={counts.appointments}
        iconBgColor="bg-green-100"
      />
    </div>
  );
};

export default StatisticsCards;
