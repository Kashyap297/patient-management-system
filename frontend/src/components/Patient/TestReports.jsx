import React from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TestReports = () => {
  const navigate = useNavigate();

  const reports = [
    {
      doctor: "Dr. Marcus Philips",
      date: "2 Jan, 2022",
      disease: "Viral Infection",
      test: "Pathology Test",
    },
    {
      doctor: "Dr. Ryan Carder",
      date: "2 Jan, 2022",
      disease: "Allergies",
      test: "Pathology Test",
    },
    {
      doctor: "Dr. Zaire Saris",
      date: "2 Jan, 2022",
      disease: "Viral Infection",
      test: "Pathology Test",
    },
    {
      doctor: "Dr. Jaxson Herwitz",
      date: "2 Jan, 2022",
      disease: "Allergies",
      test: "Pathology Test",
    },
  ];

  const handleViewAll = () => {
    navigate("/patient/test-report"); 
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Heading and View All link */}
      <div className="flex justify-between items-center mb-4 border-b-2 pb-2">
        <h2 className="text-xl font-semibold">Test Reports</h2>
        <a
          href="#"
          className="text-blue-600 hover:underline"
          onClick={handleViewAll}
        >
          View All Test
        </a>
      </div>

      {/* Scrollable container for reports */}
      <div className="overflow-y-auto h-[200px] custom-scroll pr-1">
        <div className="grid grid-cols-2 gap-4">
          {reports.map((report, index) => (
            <div key={index} className="border rounded-lg p-4">
              {/* Doctor's Image */}
              <div className="flex justify-between align-middle items-center">
                <div className="mr-4 flex mb-1">
                  <img
                    src={`https://randomuser.me/api/portraits/men/${
                      index + 30
                    }.jpg`}
                    alt={report.doctor}
                    className="w-12 h-12 rounded-full mr-2"
                  />
                  <div>
                    <h4 className="font-semibold">{report.doctor}</h4>
                    <span className="text-gray-400">{report.date}</span>
                  </div>
                </div>
                <div className="text-customBlue bg-gray-100 p-1 rounded-md">
                  <FaEye />
                </div>
              </div>
              <div className="flex  justify-between items-center">
                <p className="mt-1 text-sm text-gray-500">
                  <span className="font-bold">Disease : </span>
                  {report.disease}
                </p>
                <p className="mt-2 text-green-600 text-sm">
                  <ul className="list-disc ml-4">
                    <li>{report.test}</li>
                  </ul>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestReports;
