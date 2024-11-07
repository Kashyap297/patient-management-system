// components/SkeletonCard.js
const SkeletonCard = () => {
    return (
      <div className="bg-gray-200 animate-pulse shadow-lg rounded-xl w-full h-48 relative border p-4">
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    );
  };
  
  export default SkeletonCard;
  