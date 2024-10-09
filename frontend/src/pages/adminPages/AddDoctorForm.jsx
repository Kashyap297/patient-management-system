import React, { useState } from "react";

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    qualification: "",
    gender: "",
    specialtyType: "",
    checkupTime: "",
    workingTime: "",
    breakTime: "",
    email: "",
    phoneNumber: "",
    password: "", // New password field
    country: "",
    state: "",
    city: "",
    onlineConsultationRate: "",
    zipCode: "",
    doctorAddress: "",
    description: "",
    currentHospital: "",
    hospitalName: "",
    hospitalAddress: "",
    websiteLink: "",
    emergencyContactNumber: "",
    experience: "",
    age: "",
    workType: "", // New field for work type (Online, Onsite, Both)
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [signature, setSignature] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoUpload = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSignatureUpload = (e) => {
    setSignature(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (profilePhoto) data.append("profileImage", profilePhoto);
    if (signature) data.append("signatureImage", signature);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8000/api/users/add-doctor",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Server error:", error);
        alert(`Error: ${error.message}`);
        return;
      }

      const result = await response.json();
      console.log("Doctor added:", result);
      alert("Doctor added successfully");
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Error adding doctor");
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md m-6">
      <h2 className="text-xl font-semibold mb-6">Add New Doctor</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-6">
        <div className="col-span-1 flex flex-col items-center">
          <input
            type="file"
            onChange={handlePhotoUpload}
            className="hidden"
            id="profile-upload"
          />
          <label htmlFor="profile-upload" className="cursor-pointer">
            <div className="text-center mb-4">
              <img
                src={
                  profilePhoto
                    ? URL.createObjectURL(profilePhoto)
                    : "/placeholder.jpg"
                }
                alt="Profile"
                className="rounded-full w-28 h-28 mb-2"
              />
              <span className="text-blue-500">Choose Photo</span>
            </div>
          </label>
          <input
            type="file"
            onChange={handleSignatureUpload}
            className="hidden"
            id="signature-upload"
          />
          <label htmlFor="signature-upload" className="cursor-pointer">
            <div className="text-center">
              {signature ? (
                <img
                  src={URL.createObjectURL(signature)}
                  alt="Signature"
                  className="w-24 h-12 object-contain"
                />
              ) : (
                <span className="text-gray-500">Upload Signature</span>
              )}
            </div>
          </label>
        </div>

        <div className="col-span-3 grid grid-cols-3 gap-4">
          {/* Doctor's Information Fields */}
          <input
            type="text"
            name="firstName"
            placeholder="Doctor Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          <input
            type="text"
            name="qualification"
            placeholder="Doctor Qualification"
            value={formData.qualification}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="workType"
            value={formData.workType}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          >
            <option value="">Work Type</option>
            <option value="Online">Online</option>
            <option value="Onsite">Onsite</option>
            <option value="Both">Both</option>
          </select>

          <input
            type="text"
            name="specialtyType"
            placeholder="Specialty Type"
            value={formData.specialtyType}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          <input
            type="text"
            name="workingTime"
            placeholder="Working Time"
            value={formData.workingTime}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          <input
            type="text"
            name="checkupTime"
            placeholder="Checkup Time"
            value={formData.checkupTime}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          <input
            type="text"
            name="breakTime"
            placeholder="Break Time"
            value={formData.breakTime}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Doctor Email"
            value={formData.email}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          <input
            type="number"
            name="onlineConsultationRate"
            placeholder="Online Consultation Rate"
            value={formData.onlineConsultationRate}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />

          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          <input
            type="text"
            name="doctorAddress"
            placeholder="Doctor Address"
            value={formData.doctorAddress}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          <div>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div>
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          </div>
          {/* Hospital Information Fields */}
          <input
            type="text"
            name="currentHospital"
            placeholder="Current Hospital"
            value={formData.currentHospital}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          <input
            type="text"
            name="hospitalName"
            placeholder="Hospital Name"
            value={formData.hospitalName}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          <input
            type="text"
            name="hospitalAddress"
            placeholder="Hospital Address"
            value={formData.hospitalAddress}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          <input
            type="url"
            name="websiteLink"
            placeholder="Website Link"
            value={formData.websiteLink}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          <input
            type="text"
            name="emergencyContactNumber"
            placeholder="Emergency Contact Number"
            value={formData.emergencyContactNumber}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
        </div>

        <div className="col-span-4 flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorForm;
