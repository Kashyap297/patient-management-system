import { useState, useEffect } from 'react';
import { People, Repeat, LocalHospital, Assignment } from '@mui/icons-material';
import Skeleton from 'react-loading-skeleton';
import InfoCard from '../adminPages/InfoCard';
import api from '../../api/api';

const CardData = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [repeatPatients, setRepeatPatients] = useState(0);
  const [admittedPatients, setAdmittedPatients] = useState(0);
  const [totalClaims, setTotalClaims] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResponse = await api.get('/users/patients');
        setTotalPatients(patientResponse.data.length);

        const appointmentResponse = await api.get('/appointments');
        const appointments = appointmentResponse.data.data;

        const patientAppointments = {};
        let admittedCount = 0;
        appointments.forEach((appointment) => {
          const { patientName, appointmentType } = appointment;
          if (!patientAppointments[patientName]) {
            patientAppointments[patientName] = 1;
          } else {
            patientAppointments[patientName]++;
          }
          if (appointmentType === 'Onsite') {
            admittedCount++;
          }
        });
        
        setRepeatPatients(Object.values(patientAppointments).filter(count => count > 1).length);
        setAdmittedPatients(admittedCount);

        const invoiceResponse = await api.get('/invoice');
        setTotalClaims(invoiceResponse.data.data.filter(invoice => invoice.insuranceDetails?.claimAmount).length);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []);

  return (
    <div className="flex space-x-4">
      <InfoCard
        icon={<People className="text-[#2C7A7B]" />}
        label="Total Patients"
        value={totalPatients}
        iconBgColor="bg-[#E6FFFA]"
        borderColor="border-[#319795]"
        loading={loading}
      />
      <InfoCard
        icon={<Repeat className="text-[#805AD5]" />}
        label="Repeat Patient"
        value={repeatPatients}
        iconBgColor="bg-[#FAF5FF]"
        borderColor="border-[#6B46C1]"
        loading={loading}
      />
      <InfoCard
        icon={<LocalHospital className="text-[#38A169]" />}
        label="Admitted Patient"
        value={admittedPatients}
        iconBgColor="bg-[#F0FFF4]"
        borderColor="border-[#2F855A]"
        loading={loading}
      />
      <InfoCard
        icon={<Assignment className="text-[#D53F8C]" />}
        label="Total Claim"
        value={totalClaims}
        iconBgColor="bg-[#FFF5F7]"
        borderColor="border-[#B83280]"
        loading={loading}
      />
    </div>
  );
};

export default CardData;
