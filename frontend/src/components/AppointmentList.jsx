import { useEffect, useState } from "react";
import api from "../api/api"; // Import the api instance
import AppointmentCard from "./AppointmentCard";
import noAppointment from "../assets/images/noAppointment.png";
import moment from "moment"; // for date formatting and comparisons
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch all appointments and filter today's appointments
  const fetchTodaysAppointments = async () => {
    try {
      const response = await api.get("/appointments");
      const allAppointments = response.data.data;

      // Filter appointments for today's date
      const today = moment().format("YYYY-MM-DD");
      const todaysAppointments = allAppointments.filter(appointment =>
        moment(appointment.appointmentDate).isSame(today, "day")
      );

      setAppointments(todaysAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodaysAppointments();
  }, []);

  return (
    <div className="glass shadow-sm hover:shadow-lg p-6 sm:p-8 rounded-3xl w-full transition-all duration-300 relative overflow-hidden">
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h2 className="text-xl sm:text-2xl font-extrabold text-secondary tracking-tight">Today's Appointments</h2>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-bold">
          {appointments.length} Appointments
        </div>
      </div>

      {loading ? (
        <div className="flex gap-4 overflow-x-auto custom-scroll pb-4">
          {/* Skeleton loading placeholders for Appointment Cards */}
          {Array(3).fill().map((_, index) => (
            <div key={index} className="min-w-[200px] sm:min-w-[250px] p-4 bg-white/50 rounded-2xl">
              <Skeleton height={24} width="60%" className="mb-3 rounded-md" />
              <Skeleton height={15} width="80%" className="mb-2" />
              <Skeleton height={15} width="70%" className="mb-2" />
              <Skeleton height={15} width="50%" />
            </div>
          ))}
        </div>
      ) : appointments.length > 0 ? (
        <div className="flex flex-wrap gap-5 justify-center sm:justify-start relative z-10 custom-scroll pb-2">
          {appointments.map((appointment, index) => (
            <div key={index} className="w-full sm:w-auto">
              <AppointmentCard {...appointment} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 relative z-10">
          <div className="p-6 bg-primary/5 rounded-full mb-4">
            <img src={noAppointment} alt="No Appointments" className="w-24 sm:w-32 opacity-80" />
          </div>
          <p className="text-gray-500 font-medium text-lg">No Appointments Found for Today</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
