const InfoCard = ({ icon, label, value, iconBgColor, borderColor }) => {
  return (
    <div className={`flex items-center bg-white shadow-md p-4 rounded-xl border-l-4 ${borderColor} w-full min-w-[220px]`}>
      <div className={`p-2 rounded-full ${iconBgColor} flex items-center justify-center`}>
        {icon}
      </div>
      <div className="ml-4 flex w-full justify-between items-center">
        <p className="text-sm text-[#1A202C] font-medium">{label}</p>
        <p className="text-2xl font-semibold text-[#2D3748]">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;
