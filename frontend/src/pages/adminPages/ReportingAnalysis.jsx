import AppointmentGraph from "./ApointmentGraph";
import CardData from "./CardData";
import DoctorCountDepartment from "./DoctorCountDepartment";
import PatientCountDepartment from "./PatientCountDepartment";
import PatientsAge from "./PatientsAge";
import PatientSummary from "./PatientSummary";

const ReportingAnalysis = () => {
  return (
    <div className="grid gap-4">
      {/* Full-width CardData */}
      <CardData />

      {/* First grid row: AppointmentGraph and PatientSummary */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <AppointmentGraph />
        <PatientSummary />
      </div>

      {/* Second grid row: PatientCountDepartment, DoctorCountDepartment, and PatientsAge */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <PatientCountDepartment />
        <DoctorCountDepartment />
        <PatientsAge />
      </div>
    </div>
  );
};

export default ReportingAnalysis;
