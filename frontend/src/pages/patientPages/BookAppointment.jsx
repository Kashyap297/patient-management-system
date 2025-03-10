import React, { useState, useEffect } from "react";
import moment from "moment";
import api from "../../api/api"; // Axios instance for API calls
import Modal from "react-modal"; // Modal package, install via npm: npm install react-modal
import countryData from "../../countryjson/countries+states+cities.json"; // Assuming this is the correct path to your JSON file
import noappointmentrecord from "../../assets/images/noappointmentrecord.png"; // Placeholder image
import toast from "react-hot-toast";

// Initialize the Modal
Modal.setAppElement("#root");

// Helper components
const SelectField = ({ id, label, options, value, onChange }) => (
  <div className="relative mb-4">
    <select
      id={id}
      name={id}
      className="peer w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-500 focus:outline-none"
      value={value}
      onChange={onChange}
    >
      <option value="">{`Select ${label}`}</option>
      {options &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
    <label
      htmlFor={id}
      className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
    >
      {label}
    </label>
  </div>
);

const BookAppointment = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctorDetails, setDoctorDetails] = useState(null);

  const [currentWeekStart, setCurrentWeekStart] = useState(
    moment().startOf("day")
  );
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlotsByDate, setBookedSlotsByDate] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [patientIssue, setPatientIssue] = useState("");
  const [diseaseName, setDiseaseName] = useState("");
  const [appointmentType, setAppointmentType] = useState("Online");
  const [loading, setLoading] = useState(false);
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);
  const [specialty, setSpecialty] = useState("");
  const [specialties, setSpecialties] = useState([]);

  // Fetch hospitals when the component mounts
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await api.get("/hospitals");
        const fetchedHospitals = response.data.data || [];
        setHospitals(fetchedHospitals);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setHospitals([]);
      }
    };
    fetchHospitals();
  }, []);

  // Fetch doctors when the selected hospital changes
  // Fetch specialties and doctors when the component mounts
  useEffect(() => {
    const fetchDoctorsAndSpecialties = async () => {
      try {
        const response = await api.get("/users/doctors");
        const fetchedDoctors = response.data;

        // Set the doctors in state
        setDoctors(fetchedDoctors);

        // Extract unique specialties
        const specialtiesSet = new Set();
        fetchedDoctors.forEach((doctor) => {
          if (doctor.doctorDetails.specialtyType) {
            specialtiesSet.add(doctor.doctorDetails.specialtyType);
          }
        });

        // Convert Set to Array and set specialties
        setSpecialties(Array.from(specialtiesSet));
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctorsAndSpecialties();
  }, []);

  // Fetch doctor details when selected doctor changes and generate slots
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (selectedDoctor) {
        try {
          const response = await api.get(`/users/doctors/${selectedDoctor}`);
          const details = response.data;
          setDoctorDetails(details);
        } catch (error) {
          console.error("Error fetching doctor details:", error);
          setDoctorDetails(null);
        }
      }
    };
    fetchDoctorDetails();
  }, [selectedDoctor]);

  // Fetch booked slots whenever doctorDetails changes
  useEffect(() => {
    if (doctorDetails) {
      const fetchBookedSlots = async () => {
        try {
          const response = await api.get(
            `/appointments/booked/${doctorDetails._id}`
          );
          setBookedSlotsByDate(response.data.bookedSlots);
        } catch (error) {
          console.error("Error fetching booked slots:", error);
        }
      };
      fetchBookedSlots();
    }
  }, [doctorDetails]);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    const countryObj = countryData.find((c) => c.name === selectedCountry);
    setFilteredStates(countryObj ? countryObj.states : []);
    setState("");
    setCity("");
    setFilteredCities([]);
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    const stateObj = filteredStates.find((s) => s.name === selectedState);
    setFilteredCities(stateObj ? stateObj.cities : []);
    setCity("");
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Helper function to convert time string to minutes
  const timeToMinutes = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  // Generate time slots dynamically based on the doctor's working hours and break time
  useEffect(() => {
    if (
      doctorDetails &&
      doctorDetails.doctorDetails &&
      doctorDetails.doctorDetails.workingHours
    ) {
      const { workingHours } = doctorDetails.doctorDetails;
      const { workingTime, checkupTime, breakTime } = workingHours;

      if (workingTime && checkupTime && breakTime) {
        const startTime = timeToMinutes(workingTime.split(" - ")[0]);
        const endTime = timeToMinutes(workingTime.split(" - ")[1]);
        const checkupEnd = timeToMinutes(checkupTime.split(" - ")[1]);
        const breakStart = timeToMinutes(breakTime);
        const breakEnd = breakStart + 60;

        const slots = [];
        for (let time = startTime; time < endTime; time += 60) {
          let slotStatus = "No Schedule";
          if (time >= breakStart && time < breakEnd) {
            slotStatus = "Lunch Break";
          } else if (time < checkupEnd) {
            slotStatus = "Available";
          }
          const slotTime = `${Math.floor(time / 60)
            .toString()
            .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")} ${
            time < 720 ? "AM" : "PM"
          }`;
          slots.push({ time: slotTime, status: slotStatus });
        }
        setTimeSlots(slots);
      }
    }
  }, [doctorDetails]);

  const isSlotBooked = (timeSlot, date) => {
    return (
      bookedSlotsByDate[date] && bookedSlotsByDate[date].includes(timeSlot)
    );
  };

  const getWeekDays = (start) => {
    return Array.from({ length: 7 }, (_, i) =>
      moment(start).add(i, "days").format("YYYY-MM-DD")
    );
  };

  const days = getWeekDays(currentWeekStart);

  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => moment(prev).add(7, "days"));
  };

  const handlePreviousWeek = () => {
    if (moment(currentWeekStart).isAfter(moment(), "day")) {
      setCurrentWeekStart((prev) => moment(prev).subtract(7, "days"));
    }
  };

  const handleSlotClick = (time, day) => {
    setSelectedSlot({ time, day });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAppointmentSuccess(false);
  };

  const handleBookAppointment = async () => {
    // Log all the values that will be used in the appointment booking
    console.log("Specialty:", specialty);
    console.log("Country:", country);
    console.log("State:", state);
    console.log("City:", city);
    console.log("Selected Hospital:", selectedHospital);
    console.log("Doctor ID:", doctorDetails?._id);
    console.log("Appointment Date:", selectedSlot?.day);
    console.log("Appointment Time:", selectedSlot?.time);
    console.log("Patient Issue:", patientIssue);
    console.log("Disease Name:", diseaseName);
    console.log("Appointment Type:", appointmentType);
    console.log(
      "Doctor Fees:",
      doctorDetails?.doctorDetails?.onlineConsultationRate
    ); // Use doctorDetails for fees

    // Validate required fields
    if (
      !patientIssue ||
      !country ||
      !state ||
      !city ||
      !selectedHospital ||
      !doctorDetails?._id ||
      !selectedSlot
    ) {
      alert("Please provide all the necessary details.");
      return;
    }
    console.log("detail ", doctorDetails.doctorDetails);
    // Prepare the data to be sent
    const appointmentData = {
      specialty,
      country,
      state,
      city,
      appointmentDate: selectedSlot.day,
      appointmentTime: selectedSlot.time,
      hospital: selectedHospital,
      doctor: doctorDetails._id,
      patientIssue,
      diseaseName,
      appointmentType,
      doctorFees: doctorDetails.doctorDetails.onlineConsultationRate,
    };

    console.log("Booking Appointment Data:", appointmentData); // Log the full payload

    // Send the request
    setLoading(true);
    try {
      const response = await api.post("/appointment", appointmentData);
      setAppointmentSuccess(true); // Success message
      console.log("Appointment booked successfully:", response.data);
      toast.success("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment", error); // Log the error for debugging
      toast.error("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Appointment Booking</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {/* Dropdowns for filters */}
        <SelectField
          id="specialty"
          label="Specialty"
          options={specialties.map((specialty) => ({
            label: specialty,
            value: specialty,
          }))}
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />
        <SelectField
          id="country"
          label="Country"
          options={countryData.map((c) => ({ label: c.name, value: c.name }))}
          value={country}
          onChange={handleCountryChange}
        />
        <SelectField
          id="state"
          label="State"
          options={filteredStates.map((state) => ({
            label: state.name,
            value: state.name,
          }))}
          value={state}
          onChange={handleStateChange}
        />
        <SelectField
          id="city"
          label="City"
          options={filteredCities.map((city) => ({
            label: city.name,
            value: city.name,
          }))}
          value={city}
          onChange={handleCityChange}
        />
        <SelectField
          id="hospital"
          label="Hospital"
          options={hospitals.map((hospital) => ({
            label: hospital.name,
            value: hospital.name,
          }))}
          value={selectedHospital}
          onChange={(e) => setSelectedHospital(e.target.value)}
        />
        <SelectField
          id="doctor"
          label="Doctor"
          options={doctors.map((doctor) => ({
            label: `Dr. ${doctor.firstName} ${doctor.lastName}`,
            value: doctor._id,
          }))}
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4">
        {/* Time Slots Table - Left Side 70% */}
        {doctorDetails && (
          <div className="w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 transition"
                onClick={handlePreviousWeek}
                disabled={moment(currentWeekStart).isSameOrBefore(
                  moment(),
                  "day"
                )}
              >
                &lt;
              </button>
              <h1 className="text-xl font-bold text-[#0eabeb]">
                {moment(currentWeekStart).format("DD MMMM, YYYY")} -{" "}
                {moment(currentWeekStart)
                  .add(6, "days")
                  .format("DD MMMM, YYYY")}
              </h1>
              <button
                className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 transition"
                onClick={handleNextWeek}
              >
                &gt;
              </button>
            </div>
            <table className="min-w-full table-auto border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-[#f6f8fb]">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600 border-b border-gray-300">
                    Time
                  </th>
                  {days.map((day) => (
                    <th
                      key={day}
                      className="px-6 py-3 text-sm font-semibold text-[#0eabeb] border-b border-gray-300"
                    >
                      {moment(day).format("ddd D")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.length === 0 ? (
                  <tr>
                    <td
                      className="px-6 py-4 text-center text-gray-500"
                      colSpan={days.length + 1}
                    >
                      No Slots Available
                    </td>
                  </tr>
                ) : (
                  timeSlots.map((slot) => (
                    <tr key={slot.time} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-[#0eabeb] font-semibold text-sm border-b border-gray-200">
                        {slot.time}
                      </td>
                      {days.map((day) => (
                        <td
                          key={day}
                          className="px-4 py-3 text-center border-b border-gray-200"
                        >
                          {isSlotBooked(slot.time, day) ? (
                            <span className="text-gray-400">Booked</span>
                          ) : slot.status === "Available" ? (
                            <span
                              className="bg-[#0eabeb] text-white px-3 py-3 rounded-xl cursor-pointer hover:bg-[#0eabee] hover:shadow-md transition"
                              onClick={() => handleSlotClick(slot.time, day)}
                            >
                              Available
                            </span>
                          ) : slot.status === "Lunch Break" ? (
                            <span className="text-yellow-500 font-medium">
                              Lunch Break
                            </span>
                          ) : slot.status === "Not Available" ? (
                            <span className="text-red-500 font-medium">
                              Not Available
                            </span>
                          ) : (
                            <span className="text-gray-400">{slot.status}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Doctor Details - Right Side 30% */}
        {doctorDetails && (
          <div className="w-full p-4">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex items-center mb-4">
                <img
                  src={`http://localhost:8000/${
                    doctorDetails.profileImage || noappointmentrecord
                  }`}
                  alt="Doctor"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-blue-600">
                    Dr. {doctorDetails.firstName} {doctorDetails.lastName}
                  </h3>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
                    {doctorDetails.gender === "Male" ? "Male" : "Female"}
                  </span>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-xl">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Qualification</p>
                    <p className="text-gray-900">
                      {doctorDetails.doctorDetails.qualification}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Years of Experience</p>
                    <p className="text-gray-900">
                      {doctorDetails.doctorDetails.experience}+ Year
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Specialty Type</p>
                    <p className="text-gray-900">
                      {doctorDetails.doctorDetails.specialtyType}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Working Time</p>
                    <p className="text-gray-900">
                      {doctorDetails.doctorDetails.workingHours.workingTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Break Time</p>
                    <p className="text-gray-900">
                      {doctorDetails.doctorDetails.workingHours.breakTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Emergency Contact Number</p>
                    <p className="text-gray-900">
                      {doctorDetails.doctorDetails.hospital
                        .emergencyContactNumber || "N/A"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Description</p>
                    <p className="text-gray-900">
                      {doctorDetails.doctorDetails.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for booking appointment */}
      {selectedSlot && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Appointment Booking"
          className="bg-white p-6 rounded-xl shadow-lg w-1/5 mx-auto my-16"
          overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
        >
          {appointmentSuccess ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Appointment Booked Successfully!
              </h2>
              <p className="text-gray-600">
                Your appointment has been booked for{" "}
                {moment(selectedSlot.day).format("MMMM D, YYYY")} at{" "}
                {selectedSlot.time}.
              </p>
              <button
                className="mt-6 px-4 py-2 bg-green-500 text-white rounded-xl"
                onClick={closeModal}
              >
                Okay
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Appointment
              </h2>
              <div className="bg-[#f6f8fb] p-4 rounded-xl mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">
                    Appointment Type
                  </span>
                  <span className="font-semibold text-yellow-600">
                    {appointmentType}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">Patient Name</span>
                  <span className="font-semibold text-gray-800">
                    John Doe
                  </span>{" "}
                  {/* Placeholder name */}
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">
                    Appointment Date
                  </span>
                  <span className="font-semibold text-gray-800">
                    {moment(selectedSlot.day).format("DD MMMM, YYYY")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">
                    Appointment Time
                  </span>
                  <span className="font-semibold text-gray-800">
                    {selectedSlot.time}
                  </span>
                </div>
              </div>

              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Enter Patient Issue"
                  className="w-full border border-gray-300 p-2 px-4 rounded-xl focus:outline-none"
                  value={patientIssue}
                  onChange={(e) => setPatientIssue(e.target.value)}
                />
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200">
                  Patient Issue
                </label>
              </div>

              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Enter Disease Name"
                  className="w-full border border-gray-300 p-2 px-4 rounded-xl focus:outline-none"
                  value={diseaseName}
                  onChange={(e) => setDiseaseName(e.target.value)}
                />
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200">
                  Disease Name (Optional)
                </label>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 hover:bg-gray-100 bg-white text-gray-600 border rounded-xl hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookAppointment}
                  className="flex items-center px-4 py-2 bg-[#0eabeb] text-white rounded-xl hover:bg-[#0eabeb] transition"
                  disabled={loading}
                >
                  <span>{loading ? "Booking..." : "Book Appointment"}</span>
                </button>
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

export default BookAppointment;
