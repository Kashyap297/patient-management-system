import React, { useState, useEffect } from "react";
import StatisticsCards from "../../components/StatisticsCards";
import PatientsStatistics from "../../components/PatientsStatistics";
import AppointmentsList from "../../components/AppointmentList";
import BillingTable from "../../components/BillingTable";
import PatientsSummary from "../../components/PatientsSummary";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Panel: Statistics and Appointments */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? <Skeleton height={100} /> : <StatisticsCards />}
          {loading ? <Skeleton height={200} /> : <PatientsStatistics />}
          {loading ? <Skeleton height={300} /> : <AppointmentsList />}
        </div>

        {/* Right Panel: Billing Table and Patients Summary */}
        <div className="space-y-6">
          {loading ? <Skeleton height={400} /> : <BillingTable />}
          {loading ? <Skeleton height={250} /> : <PatientsSummary />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
