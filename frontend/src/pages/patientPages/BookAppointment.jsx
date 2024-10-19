import React, { useState, useEffect } from "react";
import noappointmentrecord from "../../assets/images/noappointmentrecord.png";
import countryData from "../../countryjson/countries+states+cities.json"; // Assuming this is the correct path to your JSON file
import api from "../../api/api"; // Assuming api.js is the file where your axios instance or fetch methods are set up

// Reusing InputField and SelectField components from AddDoctorForm
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
          <option key={option} value={option}>
            {option}
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
  const [calendarSlots, setCalendarSlots] = useState(null);

  // Fetch hospitals when the component mounts
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await api.get("/hospitals");
        const fetchedHospitals = response.data.data || []; // Ensure default value
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
      try {
        const response = await api.get("/users/doctors");
        const fetchedDoctors = response.data.data || []; // Ensure default value
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]); // Fallback in case of error
      }
    };
    fetchDoctors();
  }, [selectedHospital]);

  // Fetch doctor details when selected doctor changes
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (selectedDoctor) {
        try {
          const response = await api.get(`/users/doctors/${selectedDoctor}`);
          setDoctorDetails(response.data);
          // Simulating calendar data fetching
          const slots = [
            { time: "8:00 AM", available: false },
            { time: "9:00 AM", available: true },
            { time: "10:00 AM", available: false },
            { time: "11:00 AM", available: true },
            { time: "12:00 PM", available: false },
            { time: "1:00 PM", available: false },
          ];
          setCalendarSlots(slots); // Set available slots for the calendar
        } catch (error) {
          console.error("Error fetching doctor details:", error);
          setDoctorDetails(null); // Fallback in case of error
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg m-6">
      <h2 className="text-2xl font-semibold mb-6">Appointment Booking</h2>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {/* Specialty Dropdown */}
        <SelectField
          id="specialty"
          label="Specialty"
          options={["Cardiology", "Dermatology", "Neurology"]}
          value="" // Add state value here
          onChange={() => {}}
        />

        {/* Country Dropdown */}
        <SelectField
          id="country"
          label="Country"
          options={countryData.map((c) => c.name)} // Ensure you're using c.name, not the full object
          value={country}
          onChange={handleCountryChange}
        />

        {/* State Dropdown */}
        <SelectField
          id="state"
          label="State"
          options={filteredStates.map((state) => state.name)} // Use state.name, not the full object
          value={state}
          onChange={handleStateChange}
        />

        <SelectField
          id="city"
          label="City"
          options={filteredCities.map((city) => city.name)} // Use city.name, not the full object
          value={city}
          onChange={handleCityChange}
        />

        {/* Hospital Dropdown */}
        <SelectField
          id="hospital"
          label="Hospital"
          options={hospitals.map((hospital) => hospital.name)} // Fetch from API
          value={selectedHospital}
          onChange={(e) => setSelectedHospital(e.target.value)}
        />

        {/* Doctor Dropdown */}
        <SelectField
          id="doctor"
          label="Doctor"
          options={doctors.map((doctor) => `${doctor.firstName} ${doctor.lastName}`)} // Fetch from API
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
        />

        {/* Appointment Type Dropdown */}
        <SelectField
          id="appointmentType"
          label="Appointment Type"
          options={["Online", "In-Person"]}
          value="" // Add state value here
          onChange={() => {}}
        />
      </div>

      {/* Calendar and Doctor Details */}
      {doctorDetails && calendarSlots ? (
        <div className="grid grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Select a Time Slot</h3>
            <div className="grid grid-cols-3 gap-2">
              {calendarSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-md text-center ${
                    slot.available
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                  disabled={!slot.available}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>

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
                <p className="text-gray-500">{doctorDetails.specialtyType}</p>
              </div>
            </div>
            <p>
              <span className="font-semibold">Qualification: </span>
              {doctorDetails.qualification}
            </p>
            <p>
              <span className="font-semibold">Experience: </span>
              {doctorDetails.yearsOfExperience} years
            </p>
            <p>
              <span className="font-semibold">Consultation Type: </span>
              {doctorDetails.workType}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg">
          <img
            src={noappointmentrecord} // Replace with your illustration image URL
            alt="No Appointments"
            className="mb-4"
          />
          <p className="text-lg font-semibold text-gray-600">
            No Appointment Found Yet
          </p>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
