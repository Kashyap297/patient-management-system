import React from "react";
import { FaTimes } from "react-icons/fa";

const DepartmentDetailsModal = ({ isOpen, onClose, title, data, columns }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[80vh] animate-slide-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            {title} <span className="ml-2 text-sm font-semibold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{data.length}</span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Content / Table */}
        <div className="flex-1 overflow-y-auto custom-scroll p-6 bg-white">
          {data.length === 0 ? (
            <div className="text-center py-10 text-gray-500 font-medium">
              No records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    {columns.map((col, index) => (
                      <th
                        key={index}
                        className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                      >
                        {col.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      {columns.map((col, colIndex) => (
                        <td key={colIndex} className="py-3 px-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {col.render ? col.render(row) : row[col.key] || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetailsModal;
