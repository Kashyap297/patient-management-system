import { useState, useEffect } from "react";
import { Group } from "@mui/icons-material";
import api from "../../api/api"; // Assuming you have an API utility

const PatientCountDepartment = () => {
  const [departmentPatientCounts, setDepartmentPatientCounts] = useState([]);

  useEffect(() => {
    const fetchDoctorAndAppointmentData = async () => {
      try {
        // Fetch all doctors
        const doctorResponse = await api.get("/users/doctors");
        const doctors = doctorResponse.data;

        // Fetch all appointments
        const appointmentResponse = await api.get("/appointments");
        const appointments = appointmentResponse.data.data;

        // Initialize a map to count patients by department
        const departmentPatientMap = {};

        // Process doctors to initialize department map
        doctors.forEach((doctor) => {
          const specialty = doctor.doctorDetails.specialtyType || "General";
          if (!departmentPatientMap[specialty]) {
            departmentPatientMap[specialty] = new Set(); // Using Set to avoid duplicate patients
          }
        });

        // Process appointments and count unique patients by specialty
        appointments.forEach((appointment) => {
          const doctorId = appointment.doctorId;
          const patientId = appointment.patientId;
          console.log(patientId)

          // Find the doctor to get their specialty
          const doctor = doctors.find((doc) => doc._id === doctorId);
          if (doctor) {
            const specialty = doctor.doctorDetails.specialtyType || "General";
            departmentPatientMap[specialty].add(patientId); // Add patient ID to Set
          }
        });

        // Convert map to array with counts
        const departmentCounts = Object.keys(departmentPatientMap).map((specialty) => ({
          name: specialty,
          count: departmentPatientMap[specialty].size, // Size of Set gives unique patient count
        }));
        console.log(departmentCounts)

        setDepartmentPatientCounts(departmentCounts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDoctorAndAppointmentData();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-h-[400px]">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b pb-2 mb-2">
        <h2 className="text-lg font-semibold mb-4">Patients Count Department</h2>
        <div className="flex justify-between text-sm font-semibold text-gray-500">
          <p>Department Name</p>
          <p>Patient Count</p>
        </div>
      </div>

      {/* Scrollable Data */}
      <div className="overflow-y-auto max-h-[250px]">
        <table className="min-w-full">
          <tbody>
            {departmentPatientCounts.map((dept, index) => (
              <tr key={index} className="border-t">
                <td className="p-3 text-left">{dept.name}</td>
                <td className="p-3 text-right flex justify-end items-center gap-2">
                  <Group className="text-green-500" />
                  <span className="font-semibold text-green-500">
                    {dept.count}
                  </span>
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
