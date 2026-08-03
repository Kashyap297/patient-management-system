import { useEffect, useState } from 'react';
import { Group, LocalHospital, EventAvailable } from '@mui/icons-material';
import InfoCard from '../pages/adminPages/InfoCard';
import api from '../api/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StatisticsCards = () => {
  const [counts, setCounts] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch data for patients, doctors, and appointments
        const patientsResponse = await api.get('/users/patients');
        const doctorsResponse = await api.get('/users/doctors');
        const appointmentsResponse = await api.get('/appointments');

        const patientsCount = patientsResponse.data.length;
        const doctorsCount = doctorsResponse.data.length;
        const appointmentsCount =
          appointmentsResponse.data.length ||
          appointmentsResponse.data.count ||
          appointmentsResponse.data.data.length;

        setCounts({
          patients: patientsCount,
          doctors: doctorsCount,
          appointments: appointmentsCount,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 rounded-2xl relative z-10">
      <InfoCard
        icon={<Group className="text-primary text-3xl" />}
        label="Total Patients"
        value={loading ? <Skeleton width={40} height={25} /> : counts.patients}
        iconBgColor="bg-primary/10 text-primary"
        loading={loading}
      />
      <InfoCard
        icon={<LocalHospital className="text-purple-600 text-3xl" />}
        label="Total Doctors"
        value={loading ? <Skeleton width={40} height={25} /> : counts.doctors}
        iconBgColor="bg-purple-500/10 text-purple-600"
        loading={loading}
      />
      <InfoCard
        icon={<EventAvailable className="text-green-600 text-3xl" />}
        label="Today's Appointments"
        value={loading ? <Skeleton width={40} height={25} /> : counts.appointments}
        iconBgColor="bg-green-500/10 text-green-600"
        loading={loading}
      />
    </div>
  );
};

export default StatisticsCards;
