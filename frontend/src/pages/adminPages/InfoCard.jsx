import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const InfoCard = ({ icon, label, value, iconBgColor, borderColor, loading }) => {
  return (
    <div className={`bg-white shadow-md p-4 rounded-xl border-l-4 ${borderColor} flex items-center space-x-4 min-w-[180px] w-full`}>
      <div className={`p-3 rounded-full ${iconBgColor} flex items-center justify-center`}>
        {icon}
      </div>
      <div className="flex justify-between items-center w-full">
        <p className="text-sm md:text-base text-[#1A202C] font-medium">{label}</p>
        <p className="text-lg md:text-2xl font-semibold text-[#2D3748]">
          {loading ? <Skeleton width={50} /> : value}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
