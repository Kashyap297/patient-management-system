import { IconButton } from '@mui/material';
import { Visibility } from '@mui/icons-material';

const PatientTable = ({ searchTerm }) => {
  // Sample patient data
  const patients = [
    {
      patientName: 'Julianna Maddox',
      patientIssue: 'Feeling Tired',
      doctorName: 'Dr. Titan Grant',
      diseaseName: 'Blood Pressure',
      appointmentTime: '5:00 AM',
      appointmentType: 'Onsite',
    },
    {
      patientName: 'Julianna Mejia',
      patientIssue: 'Fever',
      doctorName: 'Dr. Keenan Tucker',
      diseaseName: 'Viral Infection',
      appointmentTime: '4:30 PM',
      appointmentType: 'Online',
    },
    {
      patientName: 'Julianna Warren',
      patientIssue: 'Headache',
      doctorName: 'Dr. Ari Bullock',
      diseaseName: 'Headache',
      appointmentTime: '6:00 AM',
      appointmentType: 'Onsite',
    },
    {
      patientName: 'Julianna Estes',
      patientIssue: 'Fever',
      doctorName: 'Dr. Bryleigh Terrell',
      diseaseName: 'Viral Infection',
      appointmentTime: '7:30 PM',
      appointmentType: 'Online',
    },
  ];

  // Filter patients based on the search term
  const filteredPatients = patients.filter((patient) =>
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const appointmentTypeStyles = {
    Online: 'bg-yellow-100 text-yellow-600',
    Onsite: 'bg-blue-100 text-blue-600',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {filteredPatients.length > 0 ? (
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-sm font-semibold">Patient Name</th>
              <th className="p-3 text-sm font-semibold">Patient Issue</th>
              <th className="p-3 text-sm font-semibold">Doctor Name</th>
              <th className="p-3 text-sm font-semibold">Disease Name</th>
              <th className="p-3 text-sm font-semibold">Appointment Time</th>
              <th className="p-3 text-sm font-semibold">Appointment Type</th>
              <th className="p-3 text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{patient.patientName}</td>
                <td className="p-3">{patient.patientIssue}</td>
                <td className="p-3">{patient.doctorName}</td>
                <td className="p-3">{patient.diseaseName}</td>
                <td className="p-3 text-blue-600">{patient.appointmentTime}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${appointmentTypeStyles[patient.appointmentType]}`}
                  >
                    {patient.appointmentType}
                  </span>
                </td>
                <td className="p-3">
                  <IconButton variant="text" color="primary">
                    <Visibility />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No patients found</p>
      )}
    </div>
  );
};

export default PatientTable;
