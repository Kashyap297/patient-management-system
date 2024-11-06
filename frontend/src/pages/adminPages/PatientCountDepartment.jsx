import { useState, useEffect } from "react";
import { Group } from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import api from "../../api/api";

const PatientCountDepartment = () => {
  const [departmentPatientCounts, setDepartmentPatientCounts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchDoctorAndAppointmentData = async () => {
      try {
        const doctorResponse = await api.get("/users/doctors");
        const doctors = doctorResponse.data;

        const appointmentResponse = await api.get("/appointments");
        const appointments = appointmentResponse.data.data;

        const departmentPatientMap = {};

        doctors.forEach((doctor) => {
          const specialty = doctor.doctorDetails.specialtyType || "General";
          if (!departmentPatientMap[specialty]) {
            departmentPatientMap[specialty] = new Set();
          }
        });

        appointments.forEach((appointment) => {
          const doctorId = appointment.doctorId;
          const patientId = appointment.patientId;
          const doctor = doctors.find((doc) => doc._id === doctorId);
          if (doctor) {
            const specialty = doctor.doctorDetails.specialtyType || "General";
            departmentPatientMap[specialty].add(patientId);
          }
        });

        const departmentCounts = Object.keys(departmentPatientMap).map((specialty) => ({
          name: specialty,
          count: departmentPatientMap[specialty].size,
        }));

        setDepartmentPatientCounts(departmentCounts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchDoctorAndAppointmentData();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-h-[400px]">
      <div className="sticky top-0 bg-white z-10 border-b pb-2 mb-2">
        <h2 className="text-lg font-semibold mb-4">Patients Count Department</h2>
        <div className="flex justify-between text-sm font-semibold text-gray-500">
          <p>Department Name</p>
          <p>Patient Count</p>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[250px]">
        <table className="min-w-full">
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 text-left">
                      <Skeleton width={100} />
                    </td>
                    <td className="p-3 text-right flex justify-end items-center gap-2">
                      <Skeleton width={50} />
                    </td>
                  </tr>
                ))
              : departmentPatientCounts.map((dept, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 text-left">{dept.name}</td>
                    <td className="p-3 text-right flex justify-end items-center gap-2">
                      <Group className="text-green-500" />
                      <span className="font-semibold text-green-500">{dept.count}</span>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientCountDepartment;
