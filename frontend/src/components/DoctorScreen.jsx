import { IconButton } from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';

const DoctorTable = ({ searchTerm }) => {
  // Sample doctor data
  const doctors = [
    {
      name: 'Dr. Parthiv Patel',
      qualification: 'MBBS',
      specialty: 'Internal Medicine',
      gender: 'Male',
      workingTime: '6 Hour',
      patientCheckUpTime: '4 Hour',
      breakTime: '1 Hour',
    },
    {
      name: 'Dr. Parthiv Patel',
      qualification: 'BDS',
      specialty: 'Anesthesiology',
      gender: 'Male',
      workingTime: '5 Hour',
      patientCheckUpTime: '4 Hour',
      breakTime: '2 Hour',
    },
    // Add more dummy data here
  ];

  // Filter doctors based on the search term
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {filteredDoctors.length > 0 ? (
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-sm font-semibold">Doctor Name</th>
              <th className="p-3 text-sm font-semibold">Gender</th>
              <th className="p-3 text-sm font-semibold">Qualification</th>
              <th className="p-3 text-sm font-semibold">Specialty</th>
              <th className="p-3 text-sm font-semibold">Working Time</th>
              <th className="p-3 text-sm font-semibold">Patient Check Up Time</th>
              <th className="p-3 text-sm font-semibold">Break Time</th>
              <th className="p-3 text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{doctor.name}</td>
                <td className="p-3">
                  {doctor.gender === 'Male' ? (
                    <span className="text-blue-500">♂</span>
                  ) : (
                    <span className="text-pink-500">♀</span>
                  )}
                </td>
                <td className="p-3">{doctor.qualification}</td>
                <td className="p-3">{doctor.specialty}</td>
                <td className="p-3 text-blue-600 cursor-pointer">{doctor.workingTime}</td>
                <td className="p-3 text-blue-600 cursor-pointer">{doctor.patientCheckUpTime}</td>
                <td className="p-3 text-blue-600 cursor-pointer">{doctor.breakTime}</td>
                <td className="p-3 flex space-x-2">
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No doctors found</p>
      )}
    </div>
  );
};

export default DoctorTable;
