import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Person, Lock, Gavel, PrivacyTip } from "@mui/icons-material";
import adminPlaceholder from "../assets/images/admin-image.png"; // Placeholder image for users without photos
import { useEffect, useState } from "react";
import api from "../api/api"; // Import your centralized API instance

const ProfileSidebar = ({ activeSection, setActiveSection }) => {
  const [userData, setUserData] = useState({
    name: "",
    photo: "",
  });

  useEffect(() => {
    // Fetch user profile data from the API
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/users/profile");
        const { firstName, lastName, profileImage } = response.data;

        // Check if the profileImage is a relative path and construct the full URL
        const imageUrl = profileImage
          ? `http://localhost:8000/${profileImage}`
          : "";

        setUserData({
          name: `${firstName} ${lastName}`,
          photo: imageUrl,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="w-64 bg-white h-full rounded-l-3xl border-r border-gray-200 flex flex-col p-6">
      <div className="text-center mb-6">
        <img
          src={userData.photo || adminPlaceholder}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto"
        />
        <h2 className="text-xl font-semibold mt-2">
          {userData.name || "You have not uploaded a photo yet"}
        </h2>
      </div>

      {/* Sidebar Menu */}
      <List>
        <ListItem
          button
          selected={activeSection === "Profile"}
          onClick={() => setActiveSection("Profile")}
        >
          <ListItemIcon>
            <Person
              color={activeSection === "Profile" ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        <ListItem
          button
          selected={activeSection === "Change Password"}
          onClick={() => setActiveSection("Change Password")}
        >
          <ListItemIcon>
            <Lock
              color={
                activeSection === "Change Password" ? "primary" : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>

        <ListItem
          button
          selected={activeSection === "Terms & Condition"}
          onClick={() => setActiveSection("Terms & Condition")}
        >
          <ListItemIcon>
            <Gavel
              color={
                activeSection === "Terms & Condition" ? "primary" : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Terms & Condition" />
        </ListItem>

        <ListItem
          button
          selected={activeSection === "Privacy Policy"}
          onClick={() => setActiveSection("Privacy Policy")}
        >
          <ListItemIcon>
            <PrivacyTip
              color={activeSection === "Privacy Policy" ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText primary="Privacy Policy" />
        </ListItem>
      </List>
    </div>
  );
};

export default ProfileSidebar;
