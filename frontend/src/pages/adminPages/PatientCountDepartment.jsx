import { useState, useEffect } from "react";
import { Group } from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import api from "../../api/api";

const PatientCountDepartment = () => {
  const [departmentPatientCounts, setDepartmentPatientCounts] = useState([]);
  const [loading, setLoading] = useState(true); 

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
      setLoading(false);
    };

    fetchDoctorAndAppointmentData();
  }, []);

  return (
    <div className="glass p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group h-[400px] flex flex-col">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/10 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110"></div>

      <div className="sticky top-0 z-10 border-b border-gray-100 pb-4 mb-4 flex-shrink-0">
        <h2 className="text-xl font-extrabold text-secondary tracking-tight mb-4">Patients Count Department</h2>
        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider px-2">
          <p>Department</p>
          <p>Count</p>
        </div>
      </div>

      <div className="overflow-y-auto custom-scroll flex-1 -mx-2 px-2">
        <table className="min-w-full border-separate border-spacing-y-2">
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="bg-gray-50/50 rounded-xl">
                    <td className="p-4 text-left rounded-l-xl">
                      <Skeleton width={100} height={20} className="rounded-lg" />
                    </td>
                    <td className="p-4 text-right rounded-r-xl flex justify-end items-center gap-2">
                      <Skeleton width={40} height={20} className="rounded-lg" />
                    </td>
                  </tr>
                ))
              : departmentPatientCounts.map((dept, index) => (
                  <tr key={index} className="bg-gray-50/50 hover:bg-white transition-colors duration-200 rounded-xl shadow-sm border border-transparent hover:border-gray-100">
                    <td className="p-4 text-left font-semibold text-gray-700 rounded-l-xl">{dept.name}</td>
                    <td className="p-4 text-right flex justify-end items-center gap-3 rounded-r-xl">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Group className="text-green-500" fontSize="small" />
                      </div>
                      <span className="font-bold text-green-600 text-lg">{dept.count}</span>
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
