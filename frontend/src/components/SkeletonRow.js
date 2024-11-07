import React from "react";

const SkeletonRow = () => {
  return (
    <tr className="animate-pulse">
      {Array(7)
        .fill(0)
        .map((_, index) => (
          <td key={index} className="px-6 py-4">
            <div className="bg-gray-300 h-6 rounded w-full"></div>
          </td>
        ))}
    </tr>
  );
};

export default SkeletonRow;
