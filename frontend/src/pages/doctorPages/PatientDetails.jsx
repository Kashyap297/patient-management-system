import { useParams } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { Visibility } from '@mui/icons-material';

const PatientDetail = () => {
  const { id } = useParams();  // Get the patient ID from the route parameter

  // Dummy data for a single patient (in real scenario, this should be fetched by the ID)
  const patientData = {
    name: 'Marcus Philips',
    number: '99130 44537',
    doctorName: 'Dr. Marcus Philips',
    age: '20 Years',
    issue: 'Feeling Tired',
    gender: 'Male',
    appointmentType: 'Online',
    address: 'B-408 Swastik society, mota varacha rajkot.',
    lastAppointmentDate: '2 Jan, 2022',
    lastAppointmentTime: '4:30 PM',
    imageUrl: 'https://via.placeholder.com/150', // Dummy image URL for patient
  };

  const appointments = [
    { diseaseName: 'Viral Infection', issue: 'Feeling Tired', date: '2 Jan, 2022', time: '4:30 PM', type: 'Online' },
    { diseaseName: 'Diabetes', issue: 'Stomach Ache', date: '5 Jan, 2022', time: '5:00 PM', type: 'Onsite' },
    // Add more appointment data
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <h2 className="text-lg font-semibold mb-4">Patient Details</h2>
      
      {/* Patient Details Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img src={patientData.imageUrl} alt="Patient" className="w-24 h-24 rounded-full" />
          <div>
            <h3 className="text-xl font-semibold">{patientData.name}</h3>
            <p>Patient Number: {patientData.number}</p>
            <p>Doctor Name: {patientData.doctorName}</p>
            <p>Patient Age: {patientData.age}</p>
            <p>Patient Gender: {patientData.gender}</p>
          </div>
        </div>
        <div className="text-right">
          <Button variant="contained" color="primary">
            + Add Record
          </Button>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">All Appointments</h3>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-sm font-semibold">Disease Name</th>
              <th className="p-3 text-left text-sm font-semibold">Patient Issue</th>
              <th className="p-3 text-left text-sm font-semibold">Appointment Date</th>
              <th className="p-3 text-left text-sm font-semibold">Appointment Time</th>
              <th className="p-3 text-left text-sm font-semibold">Appointment Type</th>
              <th className="p-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{appointment.diseaseName}</td>
                <td className="p-3">{appointment.issue}</td>
                <td className="p-3">{appointment.date}</td>
                <td className="p-3 text-blue-600">{appointment.time}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${appointment.type === 'Online' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
                    {appointment.type}
                  </span>
                </td>
                <td className="p-3">
                  <IconButton color="primary">
                    <Visibility />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientDetail;
