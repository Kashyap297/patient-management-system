import React from "react";

const SkeletonDetails = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="h-10 w-20 bg-gray-300 rounded"></div>
      </div>
      <div className="flex justify-between items-start">
        <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
        <div className="flex-grow ml-6 grid grid-cols-7 gap-x-12 gap-y-4">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="h-5 bg-gray-300 rounded w-2/3"></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetails;
