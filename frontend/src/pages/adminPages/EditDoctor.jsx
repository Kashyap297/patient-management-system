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
    workType: "",
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
    doctorCurrentHospital: "",
    hospitalName: "",
    hospitalAddress: "",
    websiteLink: "",
    emergencyContactNumber: "",
    profileImage: "",
    signatureImage: "",
    age: "", // Added age field
  });

  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [signatureImagePreview, setSignatureImagePreview] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await api.get(`/users/doctors/${id}`);
        const doctor = response.data;

        // Flatten nested doctor details for easy form binding
        setFormData({
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          email: doctor.email,
          phoneNumber: doctor.phoneNumber,
          gender: doctor.gender,
          qualification: doctor.doctorDetails.qualification,
          specialtyType: doctor.doctorDetails.specialtyType,
          workType: doctor.doctorDetails.workType,
          workingTime: doctor.workingTime,
          checkupTime: doctor.doctorDetails.workingHours.checkupTime,
          breakTime: doctor.doctorDetails.workingHours.breakTime,
          experience: doctor.doctorDetails.experience,
          zipCode: doctor.doctorDetails.zipCode,
          onlineConsultationRate: doctor.doctorDetails.onlineConsultationRate,
          country: doctor.country,
          state: doctor.state,
          city: doctor.city,
          address: doctor.address,
          description: doctor.description,
          doctorCurrentHospital: doctor.doctorDetails.hospital.currentHospital,
          hospitalName: doctor.doctorDetails.hospital.hospitalName,
          hospitalAddress: doctor.doctorDetails.hospital.hospitalAddress,
          websiteLink: doctor.doctorDetails.hospital.websiteLink,
          emergencyContactNumber:
            doctor.doctorDetails.hospital.emergencyContactNumber,
          profileImage: doctor.profileImage,
          signatureImage: doctor.signatureImage,
          age: doctor.age, // Populate age
        });

        // Set image previews with server URL
        const serverUrl = "http://localhost:8000/"; // Replace with your server's URL
        setProfileImagePreview(`${serverUrl}${doctor.profileImage}`);
        setSignatureImagePreview(`${serverUrl}${doctor.signatureImage}`);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({ ...prevData, [name]: file }));

      if (name === "profileImage") {
        setProfileImagePreview(URL.createObjectURL(file));
      } else if (name === "signatureImage") {
        setSignatureImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await api.patch(`/users/doctors/${id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            <label>Work Type</label>
            <select
              name="workType"
              value={formData.workType}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            >
              <option value="">Select Work Type</option>
              <option value="Online">Online</option>
              <option value="In-Person">In-Person</option>
            </select>
          </div>
          <div>
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
          </div>
          {/* Additional fields */}
          <div>
            <label>Profile Image</label>
            <input
              type="file"
              name="profileImage"
              onChange={handleImageChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
            {profileImagePreview && (
              <img
                src={profileImagePreview}
                alt="Profile Preview"
                className="mt-2"
                width="100"
              />
            )}
          </div>
          <div>
            <label>Signature Image</label>
            <input
              type="file"
              name="signatureImage"
              onChange={handleImageChange}
              className="w-full border p-2 rounded mt-1"
              disabled={isViewOnly}
            />
            {signatureImagePreview && (
              <img
                src={signatureImagePreview}
                alt="Signature Preview"
                className="mt-2"
                width="100"
              />
            )}
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
