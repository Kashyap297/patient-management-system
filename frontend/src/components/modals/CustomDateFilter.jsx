import { useState } from 'react';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';

const CustomDateFilter = ({ open, onClose, onApply, onReset }) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleApply = () => {
        if (fromDate || toDate) {
            onApply(fromDate, toDate);
        }
        onClose();
    };

    const handleReset = () => {
        setFromDate('');
        setToDate('');
        onReset();
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-xl shadow-lg w-100 p-4">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-5 pb-2 border-b ">
                    <h3 className="text-lg font-semibold text-gray-800">Custom Date</h3>
                    <button onClick={onClose} className="text-red-500 hover:text-red-600">
                        <FaTimes />
                    </button>
                </div>

                {/* Date Fields */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="relative">
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            id="from-date"
                            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-0"
                            placeholder=" "
                        />
                        <label
                            htmlFor="from-date"
                            className="absolute left-3 -top-2.5 px-1 bg-white  font-medium text-gray-600 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-3"
                        >
                            From Date
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            id="to-date"
                            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-0"
                            placeholder=" "
                        />
                        <label
                            htmlFor="to-date"
                            className="absolute left-3 -top-2.5 px-1 bg-white  font-medium text-gray-600 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-3"
                        >
                            To Date
                        </label>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleReset}
                        className="w-[48%] py-2 text-gray-600 border border-gray-300 rounded-xl hover:bg-[#f6f8fb] font-medium"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleApply}
                        className="w-[48%] py-2 text-[#4F4F4F] bg-[#f6f8fb] rounded-xl hover:bg-[#0eabeb] hover:text-white font-medium"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomDateFilter;
