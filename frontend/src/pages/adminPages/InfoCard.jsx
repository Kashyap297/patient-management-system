import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const InfoCard = ({ icon, label, value, iconBgColor, loading }) => {
  return (
    <div className="glass shadow-sm hover:shadow-lg p-5 rounded-3xl flex items-center space-x-5 min-w-[180px] w-full transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
      {/* Decorative gradient blur on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full mix-blend-multiply filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className={`p-4 rounded-2xl ${iconBgColor} flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110`}>
        {icon}
      </div>
      <div className="flex flex-col justify-center relative z-10">
        <p className="text-sm md:text-base text-gray-500 font-medium tracking-wide mb-1">{label}</p>
        <p className="text-2xl md:text-3xl font-extrabold text-secondary tracking-tight">
          {loading ? <Skeleton width={50} /> : value}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
