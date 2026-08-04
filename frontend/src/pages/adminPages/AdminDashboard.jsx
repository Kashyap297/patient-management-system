import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { FaUserMd, FaCalendarCheck, FaRegClock, FaFilter, FaSort, FaStethoscope } from "react-icons/fa";
import { FiChevronDown, FiCalendar, FiArrowUpRight, FiArrowDownRight, FiFilter, FiMail, FiPhone } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import api from "../../api/api";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import userImage from "../../assets/images/user.png";
import PatientDetailsModal from "../../components/modals/PatientDetailModal";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const AdminDashboard = () => {
  const [userName, setUserName] = useState("Admin");
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('Year');

  const [counts, setCounts] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
  });
  const [doctorsList, setDoctorsList] = useState([]);
  const [bookingsList, setBookingsList] = useState([]);
  const [chartDataCounts, setChartDataCounts] = useState([]);

  // Doctor Filter States
  const [filters, setFilters] = useState({
    specialty: "All",
    qualification: "All",
    workType: "All"
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // Doctor Modal State
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  // Booking Modal State
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.firstName || "Admin");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch APIs concurrently
        const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
          api.get('/users/patients').catch(() => ({ data: [] })),
          api.get('/users/doctors').catch(() => ({ data: [] })),
          api.get('/appointments').catch(() => ({ data: { data: [] } }))
        ]);

        const patients = patientsRes.data || [];
        const doctors = doctorsRes.data || [];
        const allAppointments = appointmentsRes.data.data || [];

        // Calculate counts
        const todayStr = moment().format("YYYY-MM-DD");
        const todaysAppointments = allAppointments.filter(app => 
          moment(app.appointmentDate).isSame(todayStr, "day")
        );

        setCounts({
          patients: patients.length,
          doctors: doctors.length,
          appointments: todaysAppointments.length
        });

        // Set Lists
        setDoctorsList(doctors);
        setBookingsList(allAppointments);

        // Process Chart Data (Patients Registered)
        const currentDate = new Date();
        const dataCounts = Array(timeframe === 'Year' ? 12 : (timeframe === 'Month' ? 30 : 7)).fill(0);

        patients.forEach((patient) => {
          const registrationDate = new Date(patient.createdAt || new Date()); // fallback
          if (timeframe === 'Year' && registrationDate.getFullYear() === currentDate.getFullYear()) {
            dataCounts[registrationDate.getMonth()]++;
          } else if (timeframe === 'Month' && registrationDate.getMonth() === currentDate.getMonth() && registrationDate.getFullYear() === currentDate.getFullYear()) {
            dataCounts[registrationDate.getDate() - 1]++;
          } else if (timeframe === 'Week') {
            const daysDifference = Math.floor((currentDate - registrationDate) / (1000 * 60 * 60 * 24));
            if (daysDifference >= 0 && daysDifference < 7) {
              dataCounts[6 - daysDifference]++;
            }
          }
        });

        setChartDataCounts(dataCounts);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeframe]);


  const chartLabels = timeframe === 'Year'
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    : timeframe === 'Month'
    ? Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const chartDataConfig = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Patients Registered',
        data: chartDataCounts,
        fill: true,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: '#10b981',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#ffffff',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`
        }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9ca3af' }, border: { display: false } },
      y: { 
        grid: { color: '#f3f4f6', borderDash: [5, 5] }, 
        ticks: { color: '#9ca3af' },
        border: { display: false }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  const uniqueSpecialties = ["All", ...new Set(doctorsList.map(d => d.doctorDetails?.specialtyType).filter(Boolean))];
  const uniqueQualifications = ["All", ...new Set(doctorsList.map(d => d.doctorDetails?.qualification).filter(Boolean))];
  
  const filteredDoctors = doctorsList.filter(d => {
    const matchSpecialty = filters.specialty === "All" || d.doctorDetails?.specialtyType === filters.specialty;
    const matchQualification = filters.qualification === "All" || d.doctorDetails?.qualification === filters.qualification;
    const matchWorkType = filters.workType === "All" || d.doctorDetails?.workType === filters.workType;
    return matchSpecialty && matchQualification && matchWorkType;
  });
  return (
    <div className="min-h-screen bg-[#fafbfc] p-8 space-y-6 font-sans text-gray-800">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Hello, {userName}!</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening at your clinic today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            <FiCalendar className="text-gray-400" />
            {moment().format("MMM D, YYYY")}
            <FiChevronDown className="text-gray-400 ml-1" />
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 - Total Patients */}
        <div className="bg-[#10b981] text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10">
            <svg width="200" height="100" viewBox="0 0 200 100">
              <path d="M0,50 L50,50 L70,10 L90,90 L110,50 L200,50" fill="none" stroke="white" strokeWidth="10" />
            </svg>
          </div>
          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <FaStethoscope className="text-white text-sm" />
              </div>
              <span className="font-semibold text-sm">Total Patients</span>
            </div>
            <button className="text-white/70 hover:text-white"><FiChevronDown className="rotate-[-90deg]"/></button>
          </div>
          <div className="mt-4 relative z-10">
            {loading ? <Skeleton width={60} height={40} /> : <h2 className="text-4xl font-bold">{counts.patients}</h2>}
            <p className="text-sm font-medium text-white/80 mt-1 flex items-center gap-1">
              Registered in the system
            </p>
          </div>
        </div>

        {/* Card 2 - Today's Appointments */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#ecfdf5] text-[#10b981] rounded-lg">
                <FaCalendarCheck className="text-sm" />
              </div>
              <span className="font-semibold text-gray-700 text-sm">Today's Appointments</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600"><FiChevronDown className="rotate-[-90deg]"/></button>
          </div>
          <div className="mt-4">
            {loading ? <Skeleton width={60} height={40} /> : <h2 className="text-4xl font-bold text-gray-900">{counts.appointments}</h2>}
            <p className="text-sm font-medium text-gray-500 mt-1 flex items-center gap-1">
              <span className="text-[#10b981] flex items-center"><FiArrowUpRight/> For {moment().format("MMM D")}</span>
            </p>
          </div>
        </div>

        {/* Card 3 - Total Doctors */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-semibold text-gray-700 text-sm">Total Doctors</span>
            <div className="p-1.5 bg-[#ecfdf5] text-[#10b981] rounded-lg">
              <FaUserMd className="text-sm" />
            </div>
          </div>
          <div className="mt-4">
            {loading ? <Skeleton width={60} height={40} /> : <h2 className="text-4xl font-bold text-gray-900">{counts.doctors}</h2>}
            <p className="text-sm font-medium text-gray-500 mt-1">Available Staff</p>
          </div>
        </div>
      </div>

      {/* Middle Section - Chart and Doctors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#ecfdf5] text-[#10b981] rounded-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h3 className="font-bold text-lg text-gray-800">Patients Statistics</h3>
            </div>
            {/* Timeframe Selector */}
            <div className="flex bg-gray-50 p-1 rounded-lg">
              {['Year', 'Month', 'Week'].map((time) => (
                <button
                  key={time}
                  onClick={() => setTimeframe(time)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    timeframe === time ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72 w-full">
            {loading ? <Skeleton height="100%" /> : <Line data={chartDataConfig} options={chartOptions} />}
          </div>
          <div className="flex gap-6 mt-4 pl-12 text-sm font-medium">
            <div className="flex items-center gap-2 text-gray-600"><div className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></div> Patients Registered</div>
          </div>
        </div>

        {/* Doctor Availability */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 relative">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#ecfdf5] text-[#10b981] rounded-lg">
                <FaStethoscope className="text-sm" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Doctor Availability</h3>
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <FiFilter className="text-gray-400" /> Filter
              </button>
              
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-lg z-20 p-4 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Specialty</label>
                    <select 
                      value={filters.specialty}
                      onChange={(e) => setFilters({...filters, specialty: e.target.value})}
                      className="w-full text-sm border border-gray-200 rounded-lg p-2 focus:ring-[#10b981] focus:border-[#10b981] outline-none"
                    >
                      {uniqueSpecialties.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Qualification</label>
                    <select 
                      value={filters.qualification}
                      onChange={(e) => setFilters({...filters, qualification: e.target.value})}
                      className="w-full text-sm border border-gray-200 rounded-lg p-2 focus:ring-[#10b981] focus:border-[#10b981] outline-none"
                    >
                      {uniqueQualifications.map(q => <option key={q} value={q}>{q}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Availability (Work Type)</label>
                    <select 
                      value={filters.workType}
                      onChange={(e) => setFilters({...filters, workType: e.target.value})}
                      className="w-full text-sm border border-gray-200 rounded-lg p-2 focus:ring-[#10b981] focus:border-[#10b981] outline-none"
                    >
                      <option value="All">All</option>
                      <option value="Online">Online</option>
                      <option value="Onsite">Onsite</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <button 
                      onClick={() => setFilters({ specialty: "All", qualification: "All", workType: "All" })}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold"
                    >
                      Clear All
                    </button>
                    <button 
                      onClick={() => setIsFilterOpen(false)}
                      className="text-xs bg-[#10b981] text-white px-3 py-1.5 rounded-lg hover:bg-[#059669] font-semibold"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4 overflow-y-auto max-h-[300px] custom-scroll pr-2">
            {loading ? (
              Array(5).fill().map((_, i) => (
                <div key={i} className="flex gap-3"><Skeleton circle width={40} height={40}/><div className="flex-1"><Skeleton width={100}/><Skeleton width={60}/></div></div>
              ))
            ) : filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedDoctor(doc)}
                  className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img src={doc.profileImage || "http://localhost:8000/default-profile.png"} alt={doc.firstName} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">dr. {doc.firstName} {doc.lastName}</h4>
                      <p className="text-xs text-gray-500">{doc.doctorDetails?.specialtyType || doc.specialty || "General"}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#ecfdf5] text-[#10b981]">
                    Available
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No doctors found.</p>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Section - Patient Bookings */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#ecfdf5] text-[#10b981] rounded-lg">
              <FaCalendarCheck className="text-sm" />
            </div>
            <h3 className="font-bold text-lg text-gray-800">Patient Bookings</h3>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50">
              <FiFilter className="text-gray-400" /> Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50">
              <FaSort className="text-gray-400" /> Sort by
            </button>
          </div>
        </div>

        <div className="overflow-x-auto custom-scroll">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-4 py-3"><input type="checkbox" className="rounded border-gray-300 text-[#10b981] focus:ring-[#10b981]" /></th>
                <th className="px-4 py-3">Patient Name &uarr;</th>
                <th className="px-4 py-3">Disease Name</th>
                <th className="px-4 py-3">Appointments Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill().map((_, i) => (
                  <tr key={i}><td className="p-4" colSpan={7}><Skeleton height={20}/></td></tr>
                ))
              ) : bookingsList.length > 0 ? (
                bookingsList.map((booking, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4"><input type="checkbox" className="rounded border-gray-300 text-[#10b981] focus:ring-[#10b981]" /></td>
                    <td className="px-4 py-4 font-bold text-gray-800">{booking.patientName || "-"}</td>
                    <td className="px-4 py-4 text-gray-500 font-medium">{booking.diseaseName || "-"}</td>
                    <td className="px-4 py-4 text-gray-800 font-medium">{moment(booking.appointmentDate).format("DD MMM YYYY, hh:mm A")}</td>
                    <td className="px-4 py-4">
                      <span className={`flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                        booking.status === 'Scheduled' || booking.status === 'Confirmed' ? 'bg-[#ecfdf5] text-[#10b981]' :
                        booking.status === 'Pending' ? 'bg-orange-50 text-orange-500' :
                        'bg-red-50 text-red-500'
                      }`}>
                        {booking.status === 'Scheduled' || booking.status === 'Confirmed' ? <FiArrowUpRight className="opacity-70"/> : 
                         booking.status === 'Pending' ? <FaRegClock className="opacity-70"/> : 
                         <FiArrowDownRight className="opacity-70"/>}
                        {booking.status || "Scheduled"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <img src={userImage} alt="doc" className="w-6 h-6 rounded-full border border-gray-200 object-cover" />
                        <span className="font-semibold text-gray-700 text-xs">dr. {booking.doctorName !== "N/A" ? booking.doctorName : "-"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button 
                        onClick={() => setSelectedBooking(booking)}
                        className="px-4 py-1.5 bg-[#10b981] text-white text-xs font-bold rounded-full hover:bg-[#059669] transition-colors shadow-sm shadow-[#10b981]/20"
                      >
                        See Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-slide-up">
            <div className="relative h-32 bg-gradient-to-r from-[#10b981] to-[#059669]">
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors font-bold"
              >
                &times;
              </button>
            </div>
            <div className="px-6 pb-6 pt-0 relative">
              <div className="flex justify-center -mt-12 mb-4">
                <img 
                  src={selectedDoctor.profileImage || "http://localhost:8000/default-profile.png"} 
                  alt={selectedDoctor.firstName}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-sm bg-white"
                />
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">dr. {selectedDoctor.firstName} {selectedDoctor.lastName}</h3>
                <p className="text-[#10b981] font-semibold text-sm">{selectedDoctor?.doctorDetails?.specialtyType || selectedDoctor?.specialty || "General Practitioner"}</p>
              </div>
              
              <div className="space-y-4 max-h-[350px] overflow-y-auto custom-scroll pr-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="p-2 bg-white rounded-lg text-gray-500 shadow-sm"><FiMail /></div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Email Address</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedDoctor?.email || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="p-2 bg-white rounded-lg text-gray-500 shadow-sm"><FiPhone /></div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Phone Number</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedDoctor?.phoneNumber || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="p-2 bg-white rounded-lg text-gray-500 shadow-sm"><FaUserMd /></div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Qualifications</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedDoctor?.doctorDetails?.qualification || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="p-2 bg-white rounded-lg text-gray-500 shadow-sm"><FaStethoscope /></div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Specialty</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedDoctor?.doctorDetails?.specialtyType || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="p-2 bg-white rounded-lg text-gray-500 shadow-sm"><FiCalendar /></div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Working Time</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedDoctor?.doctorDetails?.workingHours?.workingTime || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="p-2 bg-white rounded-lg text-gray-500 shadow-sm"><FaRegClock /></div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Check-up Time</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedDoctor?.doctorDetails?.workingHours?.checkupTime || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => setSelectedDoctor(null)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 py-2.5 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm shadow-[#10b981]/20">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient Details Modal */}
      <PatientDetailsModal 
        open={!!selectedBooking} 
        handleClose={() => setSelectedBooking(null)} 
        patient={selectedBooking} 
      />

    </div>
  );
};

export default AdminDashboard;
