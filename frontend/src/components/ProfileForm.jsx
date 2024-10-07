import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
// import { useUser } from "../context/user";

const ProfileForm = () => {
  // const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({});

  // Set initial form values once user data is fetched
  // useEffect(() => {
  //   if (user) {
  //     setFormValues(user);
  //   }
  // }, [user]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle toggle between edit and cancel modes
  const handleEdit = () => {
    if (isEditing) {
      // If cancelling, reset form values to initial user data from context
      // setFormValues(user);
    }
    setIsEditing(!isEditing);
  };

  // Handle save changes (mock API call)
  const handleSaveChanges = async () => {
    try {
      // Mock API call or real API call to update the profile
      console.log("Saving Changes:", formValues);

      // Assuming the API call was successful, update the user context with new data
      // setUser(formValues); // Update the context with new user data

      // Toggle editing mode off
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile changes:", error);
    }
  };

  // if (!user) return null; // If the user data is not available, return nothing

  const { role } = "admin";

  return (
    <div className="flex-1 bg-white h-full p-8 rounded-r-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* First Name */}
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          name="firstName"
          value={formValues.firstName || ""}
          onChange={handleChange}
          InputProps={{
            readOnly: !isEditing,
          }}
        />

        {/* Last Name */}
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          name="lastName"
          value={formValues.lastName || ""}
          onChange={handleChange}
          InputProps={{
            readOnly: !isEditing,
          }}
        />

        {/* Email */}
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          name="email"
          value={formValues.email || ""}
          onChange={handleChange}
          InputProps={{
            readOnly: !isEditing,
          }}
        />

        {/* Phone Number */}
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          name="phoneNumber"
          value={formValues.phoneNumber || ""}
          onChange={handleChange}
          InputProps={{
            readOnly: !isEditing,
          }}
        />

        {/* Conditionally show Hospital Name for admin/doctor */}
        {role !== "patient" && (
          <TextField
            label="Hospital Name"
            variant="outlined"
            fullWidth
            name="hospitalName"
            value={formValues.hospitalName || ""}
            onChange={handleChange}
            InputProps={{
              readOnly: !isEditing,
            }}
          />
        )}

        {/* Gender */}
        <TextField
          label="Gender"
          variant="outlined"
          fullWidth
          name="gender"
          value={formValues.gender || ""}
          onChange={handleChange}
          InputProps={{
            readOnly: !isEditing,
          }}
        />

        {/* City */}
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          name="city"
          value={formValues.city || ""}
          onChange={handleChange}
          InputProps={{
            readOnly: !isEditing,
          }}
        />

        {/* State */}
        <TextField
          label="State"
          variant="outlined"
          fullWidth
          name="state"
          value={formValues.state || ""}
          onChange={handleChange}
          InputProps={{
            readOnly: !isEditing,
          }}
        />

        {/* Country */}
        <TextField
          label="Country"
          variant="outlined"
          fullWidth
          name="country"
          value={formValues.country || ""}
          onChange={handleChange}
          InputProps={{
            readOnly: !isEditing,
          }}
        />

        {/* Conditionally render extra fields for patients */}
        {role === "patient" && (
          <>
            <TextField
              label="Date of Birth"
              variant="outlined"
              fullWidth
              name="dob"
              type="date"
              value={formValues.dob || ""}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditing,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              label="Age"
              variant="outlined"
              fullWidth
              name="age"
              value={formValues.age || ""}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditing,
              }}
            />

            <TextField
              label="Blood Group"
              variant="outlined"
              fullWidth
              name="bloodGroup"
              value={formValues.bloodGroup || ""}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditing,
              }}
              select
            >
              {/* Blood group options */}
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </TextField>

            <TextField
              label="Height (cm)"
              variant="outlined"
              fullWidth
              name="height"
              value={formValues.height || ""}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditing,
              }}
            />

            <TextField
              label="Weight (kg)"
              variant="outlined"
              fullWidth
              name="weight"
              value={formValues.weight || ""}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditing,
              }}
            />

            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              name="address"
              value={formValues.address || ""}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditing,
              }}
            />
          </>
        )}
      </div>

      {isEditing && (
        <Button
          variant="contained"
          color="primary"
          className="!mt-4"
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      )}
    </div>
  );
};

export default ProfileForm;
