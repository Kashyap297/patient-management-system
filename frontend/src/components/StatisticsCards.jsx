import { Group, LocalHospital, EventAvailable } from '@mui/icons-material';
import InfoCard from '../pages/adminPages/InfoCard';


const StatisticsCards = () => {
  return (
    <div className="flex gap-4 w-fit">
      <InfoCard
        icon={<Group className="text-gray-900" />}
        label="Total Patients"
        value="1500"
        iconBgColor="bg-blue-100"
      />
      <InfoCard
        icon={<LocalHospital className="text-gray-900" />}
        label="Total Doctors"
        value="500"
        iconBgColor="bg-purple-100"
      />
      <InfoCard
        icon={<EventAvailable className="text-gray-900" />}
        label="Today's Appointments"
        value="1080"
        iconBgColor="bg-green-100"
      />
    </div>
  );
};

export default StatisticsCards;
