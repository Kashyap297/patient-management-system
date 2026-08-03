import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from '../api/api';
import dayjs from 'dayjs';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const PatientsSummary = () => {
  const [patientData, setPatientData] = useState({ newPatients: 0, oldPatients: 0, totalPatients: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('/users/patients');
        const patients = response.data || [];

        const today = dayjs();
        let newPatients = 0;
        let oldPatients = 0;

        patients.forEach((patient) => {
          const registrationDate = dayjs(patient.createdAt);
          if (registrationDate.isSame(today, 'day')) {
            newPatients++;
          } else {
            oldPatients++;
          }
        });

        setPatientData({
          newPatients,
          oldPatients,
          totalPatients: patients.length
        });
      } catch (error) {
        console.error('Error fetching patient data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  const data = {
    labels: ['New Patients', 'Old Patients'],
    datasets: [
      {
        data: [patientData.newPatients, patientData.oldPatients],
        backgroundColor: ['#F6C762', '#44C27F'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="glass shadow-sm hover:shadow-lg p-6 sm:p-8 rounded-3xl transition-all duration-300 relative overflow-hidden h-full flex flex-col">
      <div className="mb-6 relative z-10">
        <h2 className="text-xl sm:text-2xl font-extrabold text-secondary tracking-tight">Patients Summary</h2>
      </div>
      
      <div className="flex flex-col md:flex-row items-center flex-grow justify-center relative z-10">
        <div className="relative w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
          {loading ? (
            <Skeleton circle={true} height={160} width={160} />
          ) : (
            <div className="relative w-40 h-40">
              <Doughnut data={data} options={options} />
              <div className="absolute inset-0 flex flex-col items-center justify-center mt-2">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-primary">
                  {patientData.totalPatients}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-6 space-y-4">
          <div className="flex items-center justify-between p-3 bg-yellow-50/50 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#F6C762] rounded-full shadow-sm"></span>
              <span className="text-sm font-bold text-gray-600">New Patients</span>
            </div>
            {loading ? (
              <Skeleton width={30} height={15} />
            ) : (
              <span className="text-sm font-extrabold text-gray-800">{patientData.newPatients}</span>
            )}
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50/50 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#44C27F] rounded-full shadow-sm"></span>
              <span className="text-sm font-bold text-gray-600">Old Patients</span>
            </div>
            {loading ? (
              <Skeleton width={30} height={15} />
            ) : (
              <span className="text-sm font-extrabold text-gray-800">{patientData.oldPatients}</span>
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#4C49ED] rounded-full shadow-sm"></span>
              <span className="text-sm font-bold text-gray-600">Total Patients</span>
            </div>
            {loading ? (
              <Skeleton width={30} height={15} />
            ) : (
              <span className="text-sm font-extrabold text-gray-800">{patientData.totalPatients}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsSummary;
