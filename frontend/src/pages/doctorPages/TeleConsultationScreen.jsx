import { useState } from 'react';
import { Tabs, Tab, Button } from '@mui/material';
import { DateRange } from '@mui/icons-material';
import TeleConsultationCard from '../../components/TeleConsultationCard';
import CustomDateFilter from '../../components/modals/CustomDateFilter.jsx';

// Patient data for different tabs
const todayAppointments = [
  { id: 1, name: 'Ryan Vetrov', issue: 'Feeling Tired', disease: 'Viral Infection', date: '2 Jan, 2022', time: '10:10 AM' },
  { id: 2, name: 'Marcus Septimus', issue: 'Feeling Tired', disease: 'Viral Infection', date: '2 Jan, 2022', time: '10:10 AM' },
  { id: 3, name: 'Ethan Hall', issue: 'Fever', disease: 'Bacterial Infection', date: '2 Jan, 2022', time: '11:00 AM' },
  { id: 4, name: 'Liam Chen', issue: 'Cough', disease: 'Respiratory Infection', date: '2 Jan, 2022', time: '12:00 PM' },
  { id: 5, name: 'Noah Patel', issue: 'Sore Throat', disease: 'Viral Infection', date: '2 Jan, 2022', time: '1:00 PM' },
  { id: 6, name: 'Lucas Brooks', issue: 'Headache', disease: 'Tension Headache', date: '2 Jan, 2022', time: '2:00 PM' },
  { id: 7, name: 'Mason Lee', issue: 'Fatigue', disease: 'Viral Infection', date: '2 Jan, 2022', time: '3:00 PM' },
  { id: 8, name: 'Logan Kim', issue: 'Nausea', disease: 'Food Poisoning', date: '2 Jan, 2022', time: '4:00 PM' },
  { id: 9, name: 'Alexander White', issue: 'Dizziness', disease: 'Inner Ear Infection', date: '2 Jan, 2022', time: '5:00 PM' },
  { id: 10, name: 'Elijah Taylor', issue: 'Abdominal Pain', disease: 'Gastroenteritis', date: '2 Jan, 2022', time: '6:00 PM' },
  { id: 11, name: 'James Davis', issue: 'Diarrhea', disease: 'Food Poisoning', date: '2 Jan, 2022', time: '7:00 PM' },
  { id: 12, name: 'William Brown', issue: 'Vomiting', disease: 'Gastroenteritis', date: '2 Jan, 2022', time: '8:00 PM' },
  { id: 13, name: 'Benjamin Garcia', issue: 'Fever', disease: 'Bacterial Infection', date: '2 Jan, 2022', time: '9:00 PM' },
  { id: 14, name: 'Caleb Martin', issue: 'Cough', disease: 'Respiratory Infection', date: '2 Jan, 2022', time: '10:00 PM' },
  { id: 15, name: 'Jaxon Thompson', issue: 'Sore Throat', disease: 'Viral Infection', date: '2 Jan, 2022', time: '11:00 PM' },
  { id: 16, name: 'Christopher Lopez', issue: 'Headache', disease: 'Tension Headache', date: '3 Jan, 2022', time: '12:00 AM' },
  { id: 17, name: 'Joshua Lee', issue: 'Fatigue', disease: 'Viral Infection', date: '3 Jan, 2022', time: '1:00 AM' },
  { id: 18, name: 'Andrew Kim', issue: 'Nausea', disease: 'Food Poisoning', date: '3 Jan, 2022', time: '2:00 AM' },
  { id: 19, name: 'Gabriel White', issue: 'Dizziness', disease: 'Inner Ear Infection', date: '3 Jan, 2022', time: '3:00 AM' },
  { id: 20, name: 'Michael Taylor', issue: 'Abdominal Pain', disease: 'Gastroenteritis', date: '3 Jan, 2022', time: '4:00 AM' },
  { id: 21, name: 'Daniel Davis', issue: 'Diarrhea', disease: 'Food Poisoning', date: '3 Jan, 2022', time: '5:00 AM' },
  { id: 22, name: 'Anthony Brown', issue: 'Vomiting', disease: 'Gastroenteritis', date: '3 Jan, 2022', time: '6:00 AM' },
];


const upcomingAppointments = [
  { id: 1, name: 'Alfonso Dokidis', issue: 'Back Pain', disease: 'Spinal Injury', date: '5 Jan, 2022', time: '2:30 PM' },
  { id: 2, name: 'Davis Korsgaard', issue: 'Knee Pain', disease: 'Arthritis', date: '6 Jan, 2022', time: '1:15 PM' },
  { id: 3, name: 'Ethan Wallace', issue: 'Shoulder Pain', disease: 'Rotator Cuff Injury', date: '7 Jan, 2022', time: '3:00 PM' },
  { id: 4, name: 'Liam Reynolds', issue: 'Elbow Pain', disease: 'Tennis Elbow', date: '8 Jan, 2022', time: '4:00 PM' },
  { id: 5, name: 'Noah Flores', issue: 'Wrist Pain', disease: 'Carpal Tunnel Syndrome', date: '9 Jan, 2022', time: '5:00 PM' },
  { id: 6, name: 'Lucas Brooks', issue: 'Ankle Pain', disease: 'Ankle Sprain', date: '10 Jan, 2022', time: '6:00 PM' },
  { id: 7, name: 'Mason Lee', issue: 'Foot Pain', disease: 'Plantar Fasciitis', date: '11 Jan, 2022', time: '7:00 PM' },
  { id: 8, name: 'Logan Kim', issue: 'Toe Pain', disease: 'Ingrown Toenail', date: '12 Jan, 2022', time: '8:00 PM' },
  { id: 9, name: 'Alexander White', issue: 'Finger Pain', disease: 'Finger Sprain', date: '13 Jan, 2022', time: '9:00 PM' },
  { id: 10, name: 'Elijah Taylor', issue: 'Hand Pain', disease: 'Carpal Tunnel Syndrome', date: '14 Jan, 2022', time: '10:00 PM' },
  { id: 11, name: 'James Davis', issue: 'Arm Pain', disease: 'Rotator Cuff Injury', date: '15 Jan, 2022', time: '11:00 PM' },
  { id: 12, name: 'William Brown', issue: 'Leg Pain', disease: 'Shin Splints', date: '16 Jan, 2022', time: '12:00 AM' },
  { id: 13, name: 'Benjamin Garcia', issue: 'Hip Pain', disease: 'Hip Bursitis', date: '17 Jan, 2022', time: '1:00 AM' },
  { id: 14, name: 'Caleb Martin', issue: 'Groin Pain', disease: 'Groin Pull', date: '18 Jan, 2022', time: '2:00 AM' },
];

const previousAppointments = [
  { id: 1, name: 'Ryan Botosh', issue: 'Cold', disease: 'Viral Infection', date: '1 Dec, 2021', time: '9:30 AM' },
  { id: 2, name: 'Nolan Dias', issue: 'Cough', disease: 'Respiratory Infection', date: '3 Dec, 2021', time: '11:00 AM' },
  { id: 3, name: 'Ethan Hall', issue: 'Fever', disease: 'Bacterial Infection', date: '5 Dec, 2021', time: '12:00 PM' },
  { id: 4, name: 'Liam Chen', issue: 'Sore Throat', disease: 'Viral Infection', date: '7 Dec, 2021', time: '1:00 PM' },
  { id: 5, name: 'Noah Patel', issue: 'Headache', disease: 'Tension Headache', date: '9 Dec, 2021', time: '2:00 PM' },
  { id: 6, name: 'Lucas Brooks', issue: 'Fatigue', disease: 'Viral Infection', date: '11 Dec, 2021', time: '3:00 PM' },
  { id: 7, name: 'Mason Lee', issue: 'Nausea', disease: 'Food Poisoning', date: '13 Dec, 2021', time: '4:00 PM' },
  { id: 8, name: 'Logan Kim', issue: 'Dizziness', disease: 'Inner Ear Infection', date: '15 Dec, 2021', time: '5:00 PM' },
  { id: 9, name: 'Alexander White', issue: 'Abdominal Pain', disease: 'Gastroenteritis', date: '17 Dec, 2021', time: '6:00 PM' },
  { id: 10, name: 'Elijah Taylor', issue: 'Diarrhea', disease: 'Food Poisoning', date: '19 Dec, 2021', time: '7:00 PM' },
];


const canceledAppointments = [
  { id: 1, name: 'Ahmad Arcand', issue: 'Migraine', disease: 'Chronic Migraine', date: '15 Dec, 2021', time: '10:45 AM' },
  { id: 2, name: 'Wilson Arcand', issue: 'Headache', disease: 'Tension Headache', date: '20 Dec, 2021', time: '3:30 PM' },
  { id: 3, name: 'Ethan Wallace', issue: 'Back Pain', disease: 'Spinal Injury', date: '22 Dec, 2021', time: '4:00 PM' },
  { id: 4, name: 'Liam Reynolds', issue: 'Knee Pain', disease: 'Arthritis', date: '24 Dec, 2021', time: '5:00 PM' },
  { id: 5, name: 'Noah Flores', issue: 'Shoulder Pain', disease: 'Rotator Cuff Injury', date: '26 Dec, 2021', time: '6:00 PM' },
  { id: 6, name: 'Lucas Brooks', issue: 'Elbow Pain', disease: 'Tennis Elbow', date: '28 Dec, 2021', time: '7:00 PM' },
  { id: 7, name: 'Mason Lee', issue: 'Wrist Pain', disease: 'Carpal Tunnel Syndrome', date: '30 Dec, 2021', time: '8:00 PM' },
  { id: 8, name: 'Logan Kim', issue: 'Ankle Pain', disease: 'Ankle Sprain', date: '1 Jan, 2022', time: '9:00 PM' },
  { id: 9, name: 'Alexander White', issue: 'Foot Pain', disease: 'Plantar Fasciitis', date: '3 Jan, 2022', time: '10:00 PM' },
  { id: 10, name: 'Elijah Taylor', issue: 'Toe Pain', disease: 'Ingrown Toenail', date: '5 Jan, 2022', time: '11:00 PM' },
  { id: 11, name: 'James Davis', issue: 'Finger Pain', disease: 'Finger Sprain', date: '7 Jan, 2022', time: '12:00 AM' },
  { id: 12, name: 'William Brown', issue: 'Hand Pain', disease: 'Carpal Tunnel Syndrome', date: '9 Jan, 2022', time: '1:00 AM' },
  { id: 13, name: 'Benjamin Garcia', issue: 'Arm Pain', disease: 'Rotator Cuff Injury', date: '11 Jan, 2022', time: '2:00 AM' },
  { id: 14, name: 'Caleb Martin', issue: 'Leg Pain', disease: 'Shin Splints', date: '13 Jan, 2022', time: '3:00 AM' },
  { id: 15, name: 'Jaxon Thompson', issue: 'Hip Pain', disease: 'Hip Bursitis', date: '15 Jan, 2022', time: '4:00 AM' },
  { id: 16, name: 'Christopher Lopez', issue: 'Groin Pain', disease: 'Groin Pull', date: '17 Jan, 2022', time: '5:00 AM' },
  { id: 17, name: 'Joshua Lee', issue: 'Abdominal Pain', disease: 'Gastroenteritis', date: '19 Jan, 2022', time: '6:00 AM' },
];

const TeleConsultationScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [dateRange, setDateRange] = useState('2 March, 2022 - 13 March, 2022');
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);
  const [filterDates, setFilterDates] = useState({ fromDate: null, toDate: null });

  // Function to get data based on active tab
  const getCurrentAppointments = () => {
    let appointments;
    switch (activeTab) {
      case 0:
        appointments = todayAppointments;
        break;
      case 1:
        appointments = upcomingAppointments;
        break;
      case 2:
        appointments = previousAppointments;
        break;
      case 3:
        appointments = canceledAppointments;
        break;
      default:
        appointments = todayAppointments;
    }

    // If filter dates are selected, filter the appointments by date range
    if (filterDates.fromDate && filterDates.toDate) {
      const fromDate = new Date(filterDates.fromDate);
      const toDate = new Date(filterDates.toDate);

      return appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.date); // Convert appointment date to a Date object
        return appointmentDate >= fromDate && appointmentDate <= toDate;
      });
    }
    return appointments;
  };

  const currentAppointments = getCurrentAppointments();

  const handleApplyDateFilter = (fromDate, toDate) => {
    if (fromDate && toDate) {
      // Update the date range display
      setDateRange(`${new Date(fromDate).toLocaleDateString()} - ${new Date(toDate).toLocaleDateString()}`);
      setFilterDates({ fromDate, toDate });
    }
    setOpenCustomDateModal(false); // Close modal after applying filter
  };

  // Handler for resetting the date filter
  const handleResetDateFilter = () => {
    setFilterDates({ fromDate: null, toDate: null }); // Clear the filter dates
    setDateRange('2 Jan, 2022 - 13 Jan, 2022'); // Reset to default date range
    setOpenCustomDateModal(false); // Close modal
  };


  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Tabs for different types of appointments */}
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
        <Tab label="Today Appointment" />
        <Tab label="Upcoming Appointment" />
        <Tab label="Previous Appointment" />
        <Tab label="Cancel Appointment" />
      </Tabs>

      {/* Date range display */}
      <div className="mt-4 mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Teleconsultation Module</h2>
        <Button variant="outlined" startIcon={<DateRange />} color="secondary" onClick={() => setOpenCustomDateModal(true)}>
          {dateRange}
        </Button>
      </div>

      {/* Grid of Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentAppointments.map((patient, index) => (
          <TeleConsultationCard key={index} patient={patient} />
        ))}
      </div>

      <CustomDateFilter
        open={openCustomDateModal}
        onClose={() => setOpenCustomDateModal(false)} // Close handler
        onApply={handleApplyDateFilter} // Apply handler for date filtering
        onReset={handleResetDateFilter} // Reset handler to clear filter
      />
    </div>
  );
};

export default TeleConsultationScreen;

