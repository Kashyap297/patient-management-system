import React from "react";
import { useNavigate } from "react-router-dom";

const MedicalHistory = () => {
  const navigate = useNavigate();

  const history = [
    {
      name: "Dulce Schleifer",
      date: "2 Jan, 2022",
      issue: "Patient Issue",
      description:
        "The printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took. Lorem Ipsum has been the.",
    },
    {
      name: "Dulce Workman",
      date: "2 Jan, 2022",
      issue: "Patient Issue",
      description:
        "The printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took. Lorem Ipsum has been the.",
    },
    {
      name: "Miracle Septimus",
      date: "2 Jan, 2022",
      issue: "Patient Issue",
      description:
        "The printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took. Lorem Ipsum has been the.",
    },
    {
      name: "John Doe",
      date: "3 Jan, 2022",
      issue: "Patient Issue",
      description:
        "Additional content added here for scrolling purposes. Lorem Ipsum is used as placeholder text.",
    },
  ];

  const handleViewAll = () => {
    navigate("/patient/medical-history"); 
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Medical History</h2>
       <a
          href="#"
          className="text-blue-600 hover:underline"
          onClick={handleViewAll}
        >
          View All History
        </a>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="overflow-x-auto">
        <div className="flex space-x-4 w-full max-w-full overflow-x-auto custom-scroll">
          {history.map((record, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-[300px] bg-white rounded-lg shadow-md border mb-4"
            >
              
              {/* Gray Header with Name and Date */}
              <div className="bg-gray-100 px-4 py-2 rounded-t-lg">
                <h4 className="font-semibold text-customBlue">{record.name}</h4>
                <p className="text-gray-500">{record.date}</p>
              </div>

              {/* Patient Issue and Description */}
              <div className="p-4">
                <p className="font-semibold">{record.issue}</p>
                <p className="mt-2 text-gray-600 text-sm">
                  {record.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
