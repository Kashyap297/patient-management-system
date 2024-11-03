import AppointmentGraph from "./ApointmentGraph";
import CardData from "./CardData";
import DoctorCountDepartment from "./DoctorCountDepartment";
import PatientCountDepartment from "./PatientCountDepartment";
import PatientsAge from "./PatientsAge";
import PatientSummary from "./PatientSummary";

const ReportingAnalysis = () => {
  return (
    <div className="flex flex-col gap-4">
      <CardData />
      <div className="flex gap-2 w-full">
        <div className="w-full">
          <AppointmentGraph />
        </div>
        <div className="w-full">
          <PatientSummary />
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="w-full">
          <PatientCountDepartment />
        </div>
        <div className="w-full">
          <DoctorCountDepartment />
        </div>
        <div className="w-full">
          <PatientsAge />
        </div>
      </div>
    </div>
  );
};

export default ReportingAnalysis;
