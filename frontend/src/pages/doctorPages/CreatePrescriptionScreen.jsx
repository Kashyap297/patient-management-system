import { useState, useEffect } from "react";
import api from "../../api/api"; // Adjust the path according to your project structure
import { jwtDecode } from "jwt-decode";
import CreatePrescription from "../../components/CreatePrescription";
import SkeletonCard from "../../components/SkeletonCard"; // Import the skeleton component

const CreatePrescriptionScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found");
          return;
        }

        const decodedToken = jwtDecode(token);
        const doctorId = decodedToken.id;

        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredAppointments = response.data.data.filter(
          (appointment) => {
            const appointmentDate = appointment.appointmentDate.split("T")[0];
            return (
              appointment.doctorId === doctorId &&
              appointmentDate === today &&
              appointment.status !== "Completed"
            );
          }
        );

        setAppointments(filteredAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-8 bg-white h-full rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Today Appointments</h1>
      <div className="custom-scroll overflow-y-auto h-[680px]">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            // Render 4 skeleton cards as placeholders
            Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
          ) : (
            appointments.slice(0, 12).map((appointment) => (
              <CreatePrescription
                key={appointment.id}
                id={appointment.id}
                patientid={appointment.patientId}
                name={appointment.patientName}
                age={appointment.patientAge}
                gender={appointment.patientGender}
                appointmentType={appointment.appointmentType}
                time={appointment.appointmentTime}
                status={appointment.status}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePrescriptionScreen;
