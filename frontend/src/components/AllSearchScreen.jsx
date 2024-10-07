import DoctorTable from "./DoctorScreen";
import PatientTable from "./PatientTableScreen";


const AllTable = ({ searchTerm }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Doctor Section */}
      <h2 className="text-xl font-semibold mb-4">Doctor</h2>
      <DoctorTable searchTerm={searchTerm} />

      {/* Patient Section */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Patient</h2>
      <PatientTable searchTerm={searchTerm} />
    </div>
  );
};

export default AllTable;
