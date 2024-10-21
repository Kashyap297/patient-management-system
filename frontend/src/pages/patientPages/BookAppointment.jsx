import React, { useState, useEffect } from "react";
import noappointmentrecord from "../../assets/images/noappointmentrecord.png";
import countryData from "../../countryjson/countries+states+cities.json"; // Assuming this is the correct path to your JSON file
import api from "../../api/api"; // Axios instance with token interceptor
import TimeSlotTable from "../../components/TimeSlotTable";

const InputField = ({ id, label, type = "text", value, onChange }) => (
  <div className="relative mb-4">
    <input
      type={type}
      id={id}
      name={id}
      className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
      placeholder={`Enter ${label}`}
      value={value}
      onChange={onChange}
    />
    <label
      htmlFor={id}
      className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
    >
      {label}
    </label>
  </div>
);

const SelectField = ({ id, label, options, value, onChange }) => (
  <div className="relative mb-4">
    <select
      id={id}
      name={id}
      className="peer w-full px-4 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none"
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
  const [calendarSlots, setCalendarSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Helper function to convert time string to minutes (e.g., "9:00 AM" -> 540)
  const timeToMinutes = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  // Generate slots based on working hours and break time
  const generateTimeSlots = (startTime, endTime, breakTime, breakDuration) => {
    const slots = [];
    const slotDuration = 60; // 1-hour slots

    const start = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);
    const breakStart = timeToMinutes(breakTime);
    const breakEnd = breakStart + breakDuration * 60; // Break time is given in hours

    for (let time = start; time < end; time += slotDuration) {
      const slotTime = `${Math.floor(time / 60)
        .toString()
        .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;
      const available =
        time < breakStart || time >= breakEnd ? "Available" : "Break";
      slots.push({
        time: `${slotTime} ${time < 720 ? "AM" : "PM"}`,
        available,
      });
    }
    return slots;
  };

  // Fetch hospitals when the component mounts
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await api.get("/hospitals");
        const fetchedHospitals = response.data.data || [];
        setHospitals(fetchedHospitals);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setHospitals([]); // Fallback in case of error
      }
    };
    fetchHospitals();
  }, []);

  // Fetch doctors when the selected hospital changes
  useEffect(() => {
    const fetchDoctors = async () => {
      if (selectedHospital) {
        try {
          const response = await api.get("/users/doctors");
          const fetchedDoctors = response.data.map((doctor) => doctor);
          setDoctors(fetchedDoctors);
        } catch (error) {
          console.error("Error fetching doctors:", error);
          setDoctors([]);
        }
      }
    };
    fetchDoctors();
  }, [selectedHospital]);

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
  useEffect(() => {
    console.log(doctorDetails);
  }, [doctorDetails]);
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg m-6">
      <h2 className="text-2xl font-semibold mb-6">Appointment Booking</h2>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {/* Specialty Dropdown */}
        <SelectField
          id="specialty"
          label="Specialty"
          options={[
            { label: "Cardiology", value: "Cardiology" },
            { label: "Dermatology", value: "Dermatology" },
            { label: "Neurology", value: "Neurology" },
          ]}
          value="" // Add state value here
          onChange={() => {}}
        />

        {/* Country Dropdown */}
        <SelectField
          id="country"
          label="Country"
          options={countryData.map((c) => ({ label: c.name, value: c.name }))}
          value={country}
          onChange={handleCountryChange}
        />

        {/* State Dropdown */}
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

        {/* City Dropdown */}
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

        {/* Hospital Dropdown */}
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

        {/* Doctor Dropdown */}
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

        {/* Appointment Type Dropdown */}
        <SelectField
          id="appointmentType"
          label="Appointment Type"
          options={[
            { label: "Online", value: "Online" },
            { label: "In-Person", value: "In-Person" },
          ]}
          value="" // Add state value here
          onChange={() => {}}
        />
      </div>
      {/* Calendar and Doctor Details */}
      {doctorDetails && (
      <div className="flex">

      
      <div className="col-12">

      <TimeSlotTable doctorDetails={doctorDetails} selectedDate="2024-10-22" />
      </div>
        <div className="col-2">
       

        {/* Doctor Details */}
        
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Doctor Details</h3>
            <div className="flex items-center mb-4">
              <img
                src={doctorDetails.profileImage || noappointmentrecord}
                alt="Doctor"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p className="text-lg font-semibold">
                  Dr. {doctorDetails.firstName} {doctorDetails.lastName}
                </p>
                <p className="text-gray-500">
                  {doctorDetails.doctorDetails.specialtyType}
                </p>
              </div>
            </div>
            <p>
              <span className="font-semibold">Qualification: </span>
              {doctorDetails.doctorDetails.qualification}
            </p>
            <p>
              <span className="font-semibold">Experience: </span>
              {doctorDetails.doctorDetails.experience} years
            </p>
            <p>
              <span className="font-semibold">Consultation Type: </span>
              {doctorDetails.doctorDetails.workType}
            </p>
            <p>
              <span className="font-semibold">Online Consultation Rate: </span>
              ₹{doctorDetails.doctorDetails.onlineConsultationRate}
            </p>
          </div>
        
        </div>
        </div>
        )}
      </div>
  );
};

export default BookAppointment;
