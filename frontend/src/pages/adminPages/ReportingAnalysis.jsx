import AppointmentGraph from "./ApointmentGraph";
import CardData from "./CardData";
import DoctorCountDepartment from "./DoctorCountDepartment";
import PatientCountDepartment from "./PatientCountDepartment";
import PatientsAge from "./PatientsAge";
import PatientSummary from "./PatientSummary";

const ReportingAnalysis = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>

      <div className="relative z-10 space-y-6 animate-slide-up">
        {/* Full-width CardData */}
        <CardData />

        {/* First grid row: AppointmentGraph and PatientSummary */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <AppointmentGraph />
          <PatientSummary />
        </div>

        {/* Second grid row: PatientCountDepartment, DoctorCountDepartment, and PatientsAge */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <PatientCountDepartment />
          <DoctorCountDepartment />
          <PatientsAge />
        </div>
      </div>
    </div>
  );
};

export default ReportingAnalysis;
