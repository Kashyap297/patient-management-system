import React from "react";
import StatisticsCards from "../../components/StatisticsCards";
import PatientsStatistics from "../../components/PatientsStatistics";
import AppointmentsList from "../../components/AppointmentList";
import BillingTable from "../../components/BillingTable";
import PatientsSummary from "../../components/PatientsSummary";

const AdminDashboard = () => {
  return (
    <div className="p-8 bg-gray-100">
      {/* Cards Section for Total Patients, Doctors, Appointments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatisticsCards />
      </div>

      {/* Patients Statistics (Graph) */}
      <div className="mb-8">
        <PatientsStatistics />
      </div>

      {/* Today's Appointments List */}
      <div className="mb-8">
        <AppointmentsList />
      </div>

      {/* Billing & Payments */}
      <div className="mb-8 flex w-full border gap-2">
        <div className="w-[70%]">
          <BillingTable />
        </div>
        <div className="w-[30%]">
          <PatientsSummary />
        </div>
      </div>

      {/* Patients Summary (Pie Chart) */}
      <div></div>
    </div>
  );
};

export default AdminDashboard;
