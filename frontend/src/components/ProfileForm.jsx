import { useState, useEffect } from "react";
import api from "../api/api";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    try {
      await api.patch("/users/profile", formValues);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile changes:", error);
    }
  };

  const inputClass = `w-full p-3 border outline-none transition-all duration-300 rounded-xl text-sm ${
    isEditing 
      ? "bg-white border-gray-200 focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/20 text-gray-800" 
      : "bg-gray-50 border-transparent text-gray-500 cursor-not-allowed"
  }`;

  const labelClass = "block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide uppercase";

  return (
    <div className="flex-1 bg-white h-full p-8 md:p-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Profile Details</h2>
          <p className="text-gray-500 text-sm mt-1">Update your personal information.</p>
        </div>
        <button
          onClick={handleEdit}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-sm ${
            isEditing 
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
              : "bg-[#10b981] text-white hover:bg-green-600 hover:shadow-md hover:-translate-y-0.5"
          }`}
        >
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className={labelClass}>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formValues.firstName || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formValues.lastName || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formValues.email || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formValues.phoneNumber || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={inputClass}
          />
        </div>

        {role !== "patient" && (
          <div>
            <label className={labelClass}>Hospital Name</label>
            <input
              type="text"
              name="hospitalName"
              value={formValues?.doctorDetails?.hospital?.hospitalName || ""}
              onChange={handleChange}
              readOnly={!isEditing}
              className={inputClass}
            />
          </div>
        )}

        <div>
          <label className={labelClass}>Gender</label>
          <select
            name="gender"
            value={formValues.gender || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={inputClass}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>City</label>
          <input
            type="text"
            name="city"
            value={formValues.city || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>State</label>
          <input
            type="text"
            name="state"
            value={formValues.state || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Country</label>
          <input
            type="text"
            name="country"
            value={formValues.country || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={inputClass}
          />
        </div>

        {role === "patient" && (
          <>
            <div>
              <label className={labelClass}>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formValues.dob || ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Blood Group</label>
              <select
                name="bloodGroup"
                value={formValues.bloodGroup || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputClass}
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
        <div className="mt-10 flex justify-end">
          <button
            onClick={handleSaveChanges}
            className="bg-[#10b981] text-white px-8 py-3 rounded-xl hover:bg-green-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
