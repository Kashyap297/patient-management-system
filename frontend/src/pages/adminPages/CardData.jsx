import { People, Repeat, LocalHospital, Assignment } from "@mui/icons-material";
import InfoCard from "../adminPages/InfoCard";

const CardData = () => {
  return (
    <div className="flex space-x-4">
      <InfoCard
        icon={<People className="text-blue-600" />}
        label="Total Patients"
        value="1500"
        iconBgColor="bg-blue-100"
      />
      <InfoCard
        icon={<Repeat className="text-purple-600" />}
        label="Repeat Patient"
        value="500"
        iconBgColor="bg-purple-100"
      />
      <InfoCard
        icon={<LocalHospital className="text-green-600" />}
        label="Admitted Patient"
        value="1000"
        iconBgColor="bg-green-100"
      />
      <InfoCard
        icon={<Assignment className="text-purple-600" />}
        label="Total Claim"
        value="250"
        iconBgColor="bg-purple-100"
      />
    </div>
  );
};

export default CardData;
