import { useState, useEffect } from 'react';
import { People, Repeat, LocalHospital, Assignment } from '@mui/icons-material';
import InfoCard from '../adminPages/InfoCard';
import api from '../../api/api'; // Assuming api.js is set up with axios

const CardData = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [repeatPatients, setRepeatPatients] = useState(0);
  const [admittedPatients, setAdmittedPatients] = useState(0);
  const [totalClaims, setTotalClaims] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total patients
        const patientResponse = await api.get('/users/patients');
        const patients = patientResponse.data;
        setTotalPatients(patients.length);

        // Fetch all appointments
        const appointmentResponse = await api.get('/appointments');
        const appointments = appointmentResponse.data.data;

        // Calculate repeat patients and admitted patients
        const patientAppointments = {};
        let admittedCount = 0;

        appointments.forEach((appointment) => {
          const { patientName, appointmentType } = appointment;

          // Count repeat patients
          if (!patientAppointments[patientName]) {
            patientAppointments[patientName] = 1;
          } else {
            patientAppointments[patientName]++;
          }

          // Count admitted patients (onsite appointments)
          if (appointmentType === 'Onsite') {
            admittedCount++;
          }
        });

        // Repeat patients are those who have more than one appointment
        const repeatPatientCount = Object.values(patientAppointments).filter(
          (count) => count > 1
        ).length;

        setRepeatPatients(repeatPatientCount);
        setAdmittedPatients(admittedCount);

        // Fetch all invoices and calculate total claims
        const invoiceResponse = await api.get('/invoice');
        const invoices = invoiceResponse.data.data;

        // Count the invoices with a claim
        const claimCount = invoices.filter(
          (invoice) => invoice.insuranceDetails && invoice.insuranceDetails.claimAmount
        ).length;

        setTotalClaims(claimCount);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
      />
      <InfoCard
        icon={<Repeat className="text-[#805AD5]" />}
        label="Repeat Patient"
        value={repeatPatients}
        iconBgColor="bg-[#FAF5FF]"
        borderColor="border-[#6B46C1]"
      />
      <InfoCard
        icon={<LocalHospital className="text-[#38A169]" />}
        label="Admitted Patient"
        value={admittedPatients}
        iconBgColor="bg-[#F0FFF4]"
        borderColor="border-[#2F855A]"
      />
      <InfoCard
        icon={<Assignment className="text-[#D53F8C]" />}
        label="Total Claim"
        value={totalClaims}
        iconBgColor="bg-[#FFF5F7]"
        borderColor="border-[#B83280]"
      />
    </div>
  );
};

export default CardData;
