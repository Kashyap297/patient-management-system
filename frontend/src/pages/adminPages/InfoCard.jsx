const InfoCard = ({ icon, label, value, iconBgColor }) => {
  return (
    <div className="flex items-center bg-white shadow-sm p-4 rounded-xl border border-gray-200 w-full min-w-[220px]">
      <div className={`p-2 rounded-full ${iconBgColor} flex items-center justify-center`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;

