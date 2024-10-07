
const InfoCard = ({ icon, label, value, bgColor, iconBgColor }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 w-full min-w-[250px]">
      <div className={`p-3 rounded-full ${iconBgColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500">{label}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;
