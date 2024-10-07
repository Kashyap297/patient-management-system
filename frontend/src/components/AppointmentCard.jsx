

const AppointmentCard = ({ patientName, doctorName, diseaseName, appointmentTime, status }) => {
  const statusStyles = {
    Onsite: 'bg-blue-100 text-blue-600',
    Online: 'bg-yellow-100 text-yellow-600',
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold">{patientName}</h4>
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusStyles[status]}`}>
          {status}
        </span>
      </div>
      <div className="text-sm">
        <p><strong>Doctor Name: </strong>{doctorName}</p>
        <p><strong>Disease Name: </strong>{diseaseName}</p>
        <p><strong>Appointment Time: </strong>{appointmentTime}</p>
      </div>
    </div>
  );
};

export default AppointmentCard;
