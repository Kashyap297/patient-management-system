import React, { useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const PatientEditProfile = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [formData, setFormData] = useState({
    name: "Marcus",
    number: "99130 44537",
    email: "John@gmail.com",
    gender: "Male",
    dob: "2 Jan, 2022",
    age: "20 Years",
    bloodGroup: "B+",
    height: "160",
    weight: "50",
    country: "India",
    state: "Gujarat",
    city: "Ahmedabad",
    address: "B-408 Swastik society, mota varacha rajkot.",
  });

  useEffect(() => {
    updateBreadcrumb([
      { label: "Profile Setting", path: "/patient/edit-patient-profile" },
    ]);
  }, [updateBreadcrumb]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.name) validationErrors.name = "Name is required.";
    if (!formData.email) validationErrors.email = "Email is required.";
    if (!formData.number) validationErrors.number = "Phone number is required.";
    if (!formData.age) validationErrors.age = "Age is required.";
    if (!formData.height) validationErrors.height = "Height is required.";
    if (!formData.weight) validationErrors.weight = "Weight is required.";
    if (!formData.gender) validationErrors.gender = "Gender is required.";
    if (!formData.bloodGroup)
      validationErrors.bloodGroup = "Blood group is required.";
    if (!formData.dob) validationErrors.dob = "Date of birth is required.";
    if (!formData.address) validationErrors.address = "Address is required.";
    if (!formData.country) validationErrors.country = "Country is required.";
    if (!formData.state) validationErrors.state = "State is required.";
    if (!formData.city) validationErrors.city = "City is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="relative py-16 px-24">
      {/* Gradient Background Header */}
      <div
        className="absolute top-0 left-0 right-0 h-64"
        style={{
          background:
            "linear-gradient(107.38deg, #4C49ED 2.61%, #020067 101.2%)",
        }}
      />

      {/* Profile Setting Title */}
      <h2 className="absolute top-12 left-18 text-3xl font-semibold text-white z-20">
        Profile Setting
      </h2>

      {/* Profile Content */}
      <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 flex mt-8">
        {/* Left Side: Profile Picture */}
        <div className="flex flex-col items-center w-1/5 border-r pr-8">
          <div className="relative w-48 h-48 mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-md mt-2 hover:bg-gray-200">
            <FiCamera className="text-gray-500" />
            <span>Change Profile</span>
          </button>
        </div>

        {/* Right Side: Editable Profile Form */}
        <form className="w-4/5 pl-8" onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Form Fields */}
            {[
              { name: "name", label: "Name" },
              { name: "number", label: "Phone Number" },
              { name: "email", label: "Email" },
              { name: "gender", label: "Gender" },
              { name: "dob", label: "Date of Birth" },
              { name: "age", label: "Age" },
              {
                name: "bloodGroup",
                label: "Blood Group",
                type: "select",
                options: ["A+", "B+", "O+", "AB+"],
              },
              { name: "height", label: "Height (Cm)" },
              { name: "weight", label: "Weight (Kg)" },
              { name: "country", label: "Country" },
              { name: "state", label: "State" },
              { name: "city", label: "City" },
              { name: "address", label: "Address", colSpan: 3 },
            ].map(({ name, label, type = "text", options, colSpan = 1 }) => (
              <div
                key={name}
                className={`relative mb-4 ${colSpan === 3 ? "col-span-3" : ""}`}
              >
                {type === "select" ? (
                  <select
                    id={name}
                    name={name}
                    className="peer w-full px-4 py-2 border border-gray-300 text-sm font-normal text-gray-500 rounded-md focus:outline-none"
                    value={formData[name]}
                    onChange={handleChange}
                  >
                    <option value="">Select {label}</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    id={name}
                    name={name}
                    className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                    placeholder=" "
                    value={formData[name]}
                    onChange={handleChange}
                  />
                )}
                <label
                  htmlFor={name}
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
                >
                  {label}
                  {[
                    "name",
                    "number",
                    "email",
                    "age",
                    "height",
                    "weight",
                    "gender",
                    "bloodGroup",
                    "dob",
                    "country",
                    "state",
                    "city",
                  ].includes(name) && <span className="text-red-500"> *</span>}
                </label>
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="px-6 py-2 rounded bg-gray-200 text-gray-700"
              onClick={() => setFormData({})} // Clear form on cancel (optional)
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded bg-blue-500 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientEditProfile;
