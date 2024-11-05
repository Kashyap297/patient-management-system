import { useEffect, useState } from 'react';
import { FaCalendar, FaCalendarAlt } from 'react-icons/fa';
import TeleConsultationCard from '../../components/TeleConsultationCard';
import CustomDateFilter from '../../components/modals/CustomDateFilter.jsx';
import api from '../../api/api';
import moment from 'moment';
import {jwtDecode} from 'jwt-decode';

const TeleConsultationScreen = () => {
  const [activeTab, setActiveTab] = useState("Today Appointment");
  const [dateRange, setDateRange] = useState('2 March, 2022 - 13 March, 2022');
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);
  const [filterDates, setFilterDates] = useState({ fromDate: null, toDate: null });
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const doctorId = decodedToken.id;

        const response = await api.get('/appointments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const doctorAppointments = response.data.data.filter(
          appointment => appointment.doctorId === doctorId
        );

        setAppointments(doctorAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const getCurrentAppointments = () => {
    const today = moment().startOf('day');
    let filteredAppointments;

    switch (activeTab) {
      case "Today Appointment":
        filteredAppointments = appointments.filter(app =>
          moment(app.appointmentDate).isSame(today, 'day')
        );
        break;
      case "Upcoming Appointment":
        filteredAppointments = appointments.filter(app =>
          moment(app.appointmentDate).isAfter(today)
        );
        break;
      case "Previous Appointment":
        filteredAppointments = appointments.filter(app =>
          moment(app.appointmentDate).isBefore(today)
        );
        break;
      case "Cancel Appointment":
        filteredAppointments = appointments.filter(app => app.status === 'Cancelled');
        break;
      default:
        filteredAppointments = appointments;
    }

    if (filterDates.fromDate && filterDates.toDate) {
      const fromDate = moment(filterDates.fromDate).startOf('day');
      const toDate = moment(filterDates.toDate).endOf('day');

      return filteredAppointments.filter(appointment => {
        const appointmentDate = moment(appointment.appointmentDate);
        return appointmentDate.isBetween(fromDate, toDate, null, '[]');
      });
    }

    return filteredAppointments;
  };

  const currentAppointments = getCurrentAppointments();

  const handleApplyDateFilter = (fromDate, toDate) => {
    if (fromDate && toDate) {
      setDateRange(`${moment(fromDate).format("D MMM, YYYY")} - ${moment(toDate).format("D MMM, YYYY")}`);
      setFilterDates({ fromDate, toDate });
    }
    setOpenCustomDateModal(false);
  };

  const handleResetDateFilter = () => {
    setFilterDates({ fromDate: null, toDate: null });
    setDateRange('2 Jan, 2022 - 13 Jan, 2022');
    setOpenCustomDateModal(false);
  };

  return (
    <div className="bg-white h-full p-6 rounded-xl shadow-md">
      {/* Tabs for appointment types */}
      <div className="flex space-x-4 mb-4 border-b">
        {["Today Appointment", "Upcoming Appointment", "Previous Appointment", "Cancel Appointment"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 ${
              activeTab === tab ? "border-b-2 border-[#0eabeb] text-[#0eabeb]" : "text-[#667080]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Date Range and Filter Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{activeTab}</h2>
        <button
          onClick={() => setOpenCustomDateModal(true)}
          className="border border-gray-300 px-4 py-2 rounded-xl text-gray-600 flex items-center space-x-1 hover:bg-gray-100 transition"
        >
          <FaCalendarAlt className="text-[#1E1E1E]" />
          <span>{dateRange}</span>
        </button>
      </div>

      {/* Appointment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentAppointments.length > 0 ? (
          currentAppointments.map((appointment, index) => (
            <TeleConsultationCard key={index} patient={appointment} />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-500">No appointments found for the selected date range or criteria.</p>
          </div>
        )}
      </div>

      {/* Custom Date Filter Modal */}
      <CustomDateFilter
        open={openCustomDateModal}
        onClose={() => setOpenCustomDateModal(false)}
        onApply={handleApplyDateFilter}
        onReset={handleResetDateFilter}
      />
    </div>
  );
};

export default TeleConsultationScreen;
