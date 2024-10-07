import AppointmentCard from "./AppointmentCard";
import noAppointment from "../assets/images/noAppointment.png";

const AppointmentsList = () => {
  const appointments = [
    {
      patientName: "Roger Lubin",
      doctorName: "Leo Geidt",
      diseaseName: "Meningococcal Disease",
      appointmentTime: "10:00 AM",
      status: "Onsite",
    },
    {
      patientName: "Jakob Korsgaard",
      doctorName: "Leo Geidt",
      diseaseName: "Meningococcal Disease",
      appointmentTime: "10:00 AM",
      status: "Online",
    },
    {
      patientName: "Roger Lubin",
      doctorName: "Leo Geidt",
      diseaseName: "Meningococcal Disease",
      appointmentTime: "10:00 AM",
      status: "Onsite",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Today&apos;s Appointments List
        </h2>
        <a href="/appointments" className="text-blue-600">
          View All
        </a>
      </div>

      {/* Check if appointments array is empty */}
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {appointments.map((appointment, index) => (
            <AppointmentCard key={index} {...appointment} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {/* Render the image and message if no appointments */}
          <img
            src={noAppointment}
            alt="No Appointments"
            className="w-48 mb-4"
          />
          <p className="text-gray-500">No Appointment Found Yet</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
