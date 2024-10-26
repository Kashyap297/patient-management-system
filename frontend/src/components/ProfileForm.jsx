import { useState, useEffect } from "react";
import api from "../api/api"; // Import your centralized API instance

const ProfileForm = ({ role }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    hospitalName: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    dob: "",
    bloodGroup: "",
  });

  // Fetch the user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/profile");
        setFormValues(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);
  console.log(formValues)
  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Toggle between edit and cancel modes
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Save changes
  const handleSaveChanges = async () => {
    try {
      await api.patch("/users/profile", formValues);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile changes:", error);
    }
  };

  return (
    <div className="flex-1 bg-white h-full p-8 rounded-r-3xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formValues.firstName || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full p-2 border ${isEditing ? "border-gray-300" : "border-transparent"
              } rounded-md bg-gray-100 ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formValues.lastName || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full p-2 border ${isEditing ? "border-gray-300" : "border-transparent"
              } rounded-md bg-gray-100 ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formValues.email || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full p-2 border ${isEditing ? "border-gray-300" : "border-transparent"
              } rounded-md bg-gray-100 ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formValues.phoneNumber || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full p-2 border ${isEditing ? "border-gray-300" : "border-transparent"
              } rounded-md bg-gray-100 ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />
        </div>

        {/* Hospital Name */}
        {role !== "patient" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hospital Name
            </label>
            <input
              type="text"
              name="hospitalName"
              value={formValues?.doctorDetails?.hospital.hospitalName || ""}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full p-2 border ${isEditing ? "border-gray-300" : "border-transparent"
                } rounded-md bg-gray-100 ${isEditing ? "bg-white" : "bg-gray-100"
                }`}
            />
          </div>
        )}

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formValues.gender || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border ${isEditing ? "border-gray-300" : "border-transparent"
              } rounded-md bg-gray-100 ${isEditing ? "bg-white" : "bg-gray-100"}`}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formValues.city || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full p-2 border ${isEditing ? "border-gray-300" : "border-transparent"
              } rounded-md bg-gray-100 ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formValues.state || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full p-2 border ${isEditing ? "border-gray-300" : "border-transparent"
              } rounded-md bg-gray-100 ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formValues.country || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full p-2 border ${isEditing ? "border-gray-300" : "border-transparent"
              } rounded-md bg-gray-100 ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />
        </div>

        {/* Additional Fields for Patient Role */}
        {role === "patient" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formValues.dob || ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full p-2 border ${isEditing ? "border-gray-300" : "border-transparent"
                  } rounded-md bg-gray-100 ${isEditing ? "bg-white" : "bg-gray-100"
                  }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formValues.bloodGroup || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-2 border ${isEditing ? "border-gray-300" : "border-transparent"
                  } rounded-md bg-gray-100 ${isEditing ? "bg-white" : "bg-gray-100"
                  }`}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </>
        )}
      </div>

      {isEditing && (
        <button
          onClick={handleSaveChanges}
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default ProfileForm;
