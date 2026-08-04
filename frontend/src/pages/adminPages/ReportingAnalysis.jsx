import AppointmentGraph from "./ApointmentGraph";
import CardData from "./CardData";
import DoctorCountDepartment from "./DoctorCountDepartment";
import PatientCountDepartment from "./PatientCountDepartment";
import PatientsAge from "./PatientsAge";
import PatientSummary from "./PatientSummary";

const ReportingAnalysis = () => {
  return (
    <div className="h-full flex flex-col relative font-sans animate-slide-up overflow-hidden -m-5 p-5">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>

      <div className="relative z-10 flex flex-col flex-1 h-full overflow-hidden">
        
        {/* Header Section */}
        <div className="flex flex-col mb-6 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-extrabold text-secondary tracking-tight md:ml-3">Performance Reports</h2>
          <p className="text-sm text-gray-500 md:ml-3 mt-1">Analytics and insights into hospital operations.</p>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pb-6">
          {/* Full-width CardData */}
          <CardData />

          {/* First grid row: AppointmentGraph and PatientSummary */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <AppointmentGraph />
            <PatientSummary />
          </div>

          {/* Second grid row: PatientCountDepartment and DoctorCountDepartment */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <PatientCountDepartment />
            <DoctorCountDepartment />
          </div>

          {/* Third grid row: PatientsAge */}
          <div className="grid gap-6 grid-cols-1">
            <PatientsAge />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingAnalysis;
