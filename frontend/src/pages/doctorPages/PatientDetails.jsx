import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import api from "../../api/api"; // Adjust the path according to your project structure
import AddRecordModal from "./AddRecordModal"; // Import the AddRecordModal
import { jwtDecode } from "jwt-decode";
import moment from "moment";

const PatientDetail = () => {
  const { id } = useParams(); // Get the patient ID from the route parameter
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // State to handle modal open/close
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    // Decode token to get doctorId
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setDoctorId(decodedToken?.id || null);
    }

    // Fetch appointments for the patient by filtering from all appointments
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter appointments for this specific patient
        const patientAppointments = response.data.data.filter(
          (appointment) => appointment.patientId === id
        );

        setAppointments(patientAppointments);

        if (patientAppointments.length > 0) {
          // Get the first appointment to extract patient data
          const firstAppointment = patientAppointments[0];

          // Set patient data based on the structure of your appointment object
          setPatientData({
            firstName: firstAppointment.patientName, // patientName
            lastName: "", // Assuming last name is not provided, set to empty
            phoneNumber: firstAppointment.patientPhoneNumber, // patientPhoneNumber
            age: firstAppointment.patientAge, // patientAge
            patientIssue: firstAppointment.patientIssue, // patientIssue
            gender: firstAppointment.patientGender, // patientGender
            appointmentType: firstAppointment.appointmentType, // appointmentType
            address: firstAppointment.patientAddress, // patientAddress
            lastAppointmentDate: firstAppointment.appointmentDate.split("T")[0], // appointmentDate
            lastAppointmentTime: firstAppointment.appointmentTime, // appointmentTime
            doctorName: firstAppointment.doctorName, // doctorName
            profileImage: firstAppointment.profileImage,
          });
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [id]);

  if (!patientData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-4 text-[#030229]">
          Patient Details
        </h2>

        {/* Patient Details Section */}
        <div className="text-right mb-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#0eabeb] text-white px-4 py-2 rounded-xl"
          >
            + Add Record
          </button>
        </div>
      </div>
      <div className="rounded-2xl mb-6">
        <div className="flex justify-between items-start">
          <div className="flex-shrink-0 border border-4 border-[#DFE0EB] rounded-full">
            <img
              src={`http://localhost:8000/${patientData.profileImage}`}
              alt="Patient"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          <div className="flex-grow ml-6 mt-4">
            <div className="grid grid-cols-5 gap-x-8 gap-y-4">
              {[
                {
                  label: "Patient Name",
                  value: `${patientData.firstName} ${patientData.lastName}`,
                },
                { label: "Patient Number", value: patientData.phoneNumber },
                {
                  label: "Doctor Name",
                  value: `Dr. ${patientData.doctorName}`,
                },
                { label: "Patient Age", value: `${patientData.age} Years` },
                { label: "Patient Issue", value: patientData.patientIssue },
                { label: "Patient Gender", value: patientData.gender },
                {
                  label: "Appointment Type",
                  value: patientData.appointmentType,
                },
                { label: "Patient Address", value: patientData.address },
                {
                  label: "Last Appointment Date",
                  value: patientData.lastAppointmentDate,
                },
                {
                  label: "Last Appointment Time",
                  value: patientData.lastAppointmentTime,
                },
              ].map((detail, index) => (
                <div key={index} className="leading-5">
                  <p className="text-[#A7A7A7]" >{detail.label}</p>
                  {detail.value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* All Appointments Section */}
      <div className="rounded-2xl">
        <h3 className="text-lg font-semibold mb-4 text-[#030229]">
          All Appointments
        </h3>
        <div className="w-full bg-white rounded-2xl overflow-hidden">
          <table className="w-full text-center">
            <thead className="bg-[#f6f8fb]">
              <tr>
                {[
                  "Disease Name",
                  "Patient Issue",
                  "Appointment Date",
                  "Appointment Time",
                  "Appointment Type",
                  "Action",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="py-3 px-6 text-center font-semibold text-[#4F4F4F]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
          <div className="overflow-y-auto custom-scroll h-[340px]">
            <table className="w-full">
              <tbody className="text-center">
                {appointments.map((appointment, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-6 text-[#4F4F4F]">
                      {appointment.diseaseName}
                    </td>
                    <td className="py-3 px-6 text-[#4F4F4F]">
                      {appointment.patientIssue || "N/A"}
                    </td>
                    <td className="py-3 px-6 text-[#4F4F4F]">
                      {moment(appointment.appointmentDate).format(
                        "D MMM, YYYY"
                      )}
                    </td>
                    <td className="py-3 px-6">
                      <span className="px-4 py-2 rounded-full bg-[#f6f8fb] text-[#718EBF]">
                        {appointment.appointmentTime}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`px-4 py-2 rounded-full ${
                          appointment.appointmentType === "Online"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {appointment.appointmentType}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => console.log("View details")}
                        className="text-blue-500 hover:bg-gray-100 p-2 rounded-lg"
                      >
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

      {/* Add Record Modal */}
      <AddRecordModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        patientId={id}
        doctorId={doctorId}
        onSuccess={() => {
          console.log("Record added successfully");
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default PatientDetail;
