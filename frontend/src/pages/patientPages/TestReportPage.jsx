import React, { useEffect } from "react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaEye, FaSearch } from "react-icons/fa";

const TestReportPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Personal Health Record", path: "/patient/patient-dashboard" },
      { label: "Test Report", path: "/patient/test-report" },
    ]);
  }, [updateBreadcrumb]);

  const testReport = [
    {
      doctor: "Dr. Ryan Vetrows",
      hospital: "Shambhu Hospital",
      disease: "Disease Name",
      testReport: "Blood Test",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Angel Franci",
      hospital: "Shambhu Hospital",
      disease: "Disease Name",
      testReport: "Blood Test",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. James Kenter",
      hospital: "Shambhu Hospital",
      disease: "Disease Name",
      testReport: "Blood Test",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Rhiel Madsen",
      hospital: "Shambhu Hospital",
      disease: "Disease Name",
      testReport: "Blood Test",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Jakob Workman",
      hospital: "Shambhu Hospital",
      disease: "Disease Name",
      testReport: "Blood Test",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Nolan Culhane",
      hospital: "Shambhu Hospital",
      disease: "Disease Name",
      testReport: "Blood Test",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Brandon George",
      hospital: "Shambhu Hospital",
      disease: "Disease Name",
      testReport: "Blood Test",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Omar Bothman",
      hospital: "Shambhu Hospital",
      disease: "Disease Name",
      testReport: "Blood Test",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Omar Dorwart",
      hospital: "Shambhu Hospital",
      disease: "Disease Name",
      testReport: "Blood Test",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Martin Saris",
      hospital: "Shambhu Hospital",
      disease: "Disease Name",
      testReport: "Blood Test",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Alfonso Stanton",
      hospital: "Shambhu Hospital",
      disease: "Disease Name",
      testReport: "Blood Test",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Brandon Press",
      hospital: "Shambhu Hospital",
      disease: "Disease Name",
      testReport: "Blood Test",
      date: "2 Jan, 2022",
    },
  ];
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg m-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Test Reports</h2>
        
      </div>

      {/* Grid Layout for Prescriptions */}
      <div className="grid grid-cols-4 gap-4 overflow-y-auto custom-scroll">
        {testReport.map((testReport, index) => (
          <div
            key={index}
            className="border rounded-lg  shadow-md   transition"
          >
            {/* Card header with doctor name and eye icon */}
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-t-lg  mb-4">
              <h4 className="font-semibold">{testReport.doctor}</h4>
              <div className="text-customBlue p-2 rounded-full bg-white shadow">
                <FaEye/>
              </div>
            </div>

            {/* Hospital, Disease, and Date Information */}
            <div className="grid grid-cols-2 gap-2 p-2">
              <p className="text-gray-500">Diesase Name</p>
              <p className="text-gray-900 font-medium">
                {testReport.hospital}
              </p>

              <p className="text-gray-500">Test Report Name</p>
              <p className="text-gray-900 font-medium">
                {testReport.disease}
              </p>

              <p className="text-gray-500">Report Date</p>
              <p className="text-gray-900 font-medium">{testReport.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestReportPage;
