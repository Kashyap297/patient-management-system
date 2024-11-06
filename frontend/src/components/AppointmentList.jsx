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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Today's Appointments List</h2>
      </div>

      {loading ? (
        <div className="flex gap-4 w-max overflow-x-auto">
          {/* Skeleton loading placeholders for Appointment Cards */}
          {Array(3).fill().map((_, index) => (
            <div key={index} className="w-64">
              <Skeleton height={80} className="mb-2 rounded-lg" />
              <Skeleton height={15} width="80%" className="mb-1" />
              <Skeleton height={15} width="60%" className="mb-1" />
              <Skeleton height={15} width="40%" />
            </div>
          ))}
        </div>
      ) : appointments.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="flex gap-4 w-max">
            {appointments.map((appointment, index) => (
              <AppointmentCard key={index} {...appointment} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src={noAppointment} alt="No Appointments" className="w-48 mb-4" />
          <p className="text-gray-500">No Appointments Found for Today</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
