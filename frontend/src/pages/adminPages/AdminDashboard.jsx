import React from "react";
import StatisticsCards from "../../components/StatisticsCards";
import PatientsStatistics from "../../components/PatientsStatistics";
import AppointmentsList from "../../components/AppointmentList";
import BillingTable from "../../components/BillingTable";
import PatientsSummary from "../../components/PatientsSummary";

const AdminDashboard = () => {
  return (
    <div className=" min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="col-span-2 space-y-6">
          <StatisticsCards />

          <PatientsStatistics />

          <AppointmentsList />
        </div>

        {/* Right Panel: Billing Table and Patients Summary */}
        <div className="space-y-6">
          <BillingTable />
          <PatientsSummary />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
