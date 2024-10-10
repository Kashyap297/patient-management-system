import React from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PrescriptionList = () => {
  const navigate = useNavigate();

  const prescriptions = [
    {
      hospital: "Apollo Hospitals",
      date: "2 Jan, 2022",
      disease: "Colds and Flu",
    },
    {
      hospital: "Medanta The Medicity",
      date: "2 Jan, 2022",
      disease: "Allergies",
    },
    { hospital: "Manipal Hospitals", date: "2 Jan, 2022", disease: "Diarrhea" },
    {
      hospital: "Narayana Health",
      date: "2 Jan, 2022",
      disease: "Colds and Flu",
    },
    {
      hospital: "Narayana Health",
      date: "2 Jan, 2022",
      disease: "Colds and Flu",
    },
    {
      hospital: "Narayana Health",
      date: "2 Jan, 2022",
      disease: "Colds and Flu",
    },
  ];

  const handleViewAll = () => {
    navigate("/patient/prescriptions"); 
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Prescriptions</h2>
        <a
          href="#"
          className="text-blue-600 hover:underline"
          onClick={handleViewAll}
        >
          View All Prescription
        </a>
      </div>

      {/* Scrollable container for the table body */}
      <div className="rounded-xl overflow-hidden ">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-2">Hospital Name</th>
              <th className="py-2 px-2">Date</th>
              <th className="py-2 px-2">Disease Name</th>
              <th className="py-2 px-2">Action</th>
            </tr>
          </thead>
        </table>

        {/* Scrollable tbody */}
        <div className="overflow-y-auto custom-scroll h-[210px]">
          <table className="w-full text-left">
            <tbody>
              {prescriptions.map((prescription, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3 px-2 font-xs">{prescription.hospital}</td>
                  <td className="py-3 px-2 font-xs">{prescription.date}</td>
                  <td className="py-3 px-2 font-xs">{prescription.disease}</td>
                  <td className="py-3 px-2 font-xs flex justify-center">
                    <button className="text-customBlue flex items-center space-x-2 bg-gray-100 text-md p-1 rounded-md">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionList;
