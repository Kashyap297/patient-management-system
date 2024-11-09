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
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Today's Appointments</h2>
      </div>

      {loading ? (
        <div className="flex gap-4 overflow-x-auto">
          {/* Skeleton loading placeholders for Appointment Cards */}
          {Array(3).fill().map((_, index) => (
            <div key={index} className="min-w-[200px] sm:min-w-[250px]">
              <Skeleton height={80} className="mb-2 rounded-xl" />
              <Skeleton height={15} width="80%" className="mb-1" />
              <Skeleton height={15} width="60%" className="mb-1" />
              <Skeleton height={15} width="40%" />
            </div>
          ))}
        </div>
      ) : appointments.length > 0 ? (
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {appointments.map((appointment, index) => (
            <div key={index} className="w-full sm:w-64">
              <AppointmentCard {...appointment} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src={noAppointment} alt="No Appointments" className="w-32 sm:w-48 mb-4" />
          <p className="text-gray-500 text-sm sm:text-base">No Appointments Found for Today</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
