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
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Patients Summary</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="relative w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
          {loading ? (
            <Skeleton circle={true} height={150} width={150} />
          ) : (
            <>
              <Doughnut data={data} options={options} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-gray-400 text-sm">Total Patients</p>
                <p className="text-xl sm:text-2xl font-semibold text-blue-600">
                  {patientData.totalPatients}
                </p>
              </div>
            </>
          )}
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-6">
          <ul>
            <li className="flex items-center justify-between mb-2">
              <span className="text-sm">New Patients (Today)</span>
              {loading ? (
                <Skeleton width={30} height={15} />
              ) : (
                <span className="text-sm text-gray-500">{patientData.newPatients}</span>
              )}
              <span className="w-3 h-3 bg-[#F6C762] rounded-full ml-2"></span>
            </li>
            <li className="flex items-center justify-between mb-2">
              <span className="text-sm">Old Patients</span>
              {loading ? (
                <Skeleton width={30} height={15} />
              ) : (
                <span className="text-sm text-gray-500">{patientData.oldPatients}</span>
              )}
              <span className="w-3 h-3 bg-[#44C27F] rounded-full ml-2"></span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm">Total Patients</span>
              {loading ? (
                <Skeleton width={30} height={15} />
              ) : (
                <span className="text-sm text-gray-500">{patientData.totalPatients}</span>
              )}
              <span className="w-3 h-3 bg-[#4C49ED] rounded-full ml-2"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientsSummary;
