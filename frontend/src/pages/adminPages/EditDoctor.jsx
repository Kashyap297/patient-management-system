import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import api from "../../api/api";

const EditDoctor = ({ isViewOnly = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    qualification: "",
    specialtyType: "",
    workingTime: "",
    checkupTime: "",
    breakTime: "",
    experience: "",
    zipCode: "",
    onlineConsultationRate: "",
    country: "",
    state: "",
    city: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await api.get(`/users/doctors/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    // Always fetch doctor details regardless of view mode
    fetchDoctorDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/users/doctors/${id}`, formData);
      navigate("/doctor-management");
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <h2 className="text-lg font-semibold mb-4">
        {isViewOnly ? "View Doctor Details" : "Edit Doctor Details"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label>Qualification</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label>Specialty</label>
            <input
              type="text"
              name="specialtyType"
              value={formData.specialtyType}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label>Working Time</label>
            <input
              type="text"
              name="workingTime"
              value={formData.workingTime}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label>Checkup Time</label>
            <input
              type="text"
              name="checkupTime"
              value={formData.checkupTime}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label>Break Time</label>
            <input
              type="text"
              name="breakTime"
              value={formData.breakTime}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label>Experience</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label>Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label>Online Consultation Rate</label>
            <input
              type="number"
              name="onlineConsultationRate"
              value={formData.onlineConsultationRate}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          <div className="col-span-2">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              rows="4"
              disabled={isViewOnly}
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        {!isViewOnly && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-4"
          >
            Save Changes
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          className="mt-4 ml-2"
          onClick={() => navigate("/doctor-management")}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default EditDoctor;
