import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import ChangePasswordForm from "./ChangePasswordForm";
import TermsAndConditions from "./TermsAndConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import ProfileSidebar from "../../components/ProfileSidebar";
import ProfileForm from "../../components/ProfileForm";

const ProfileScreen = () => {
  const [activeSection, setActiveSection] = useState("Profile");
  const [role, setRole] = useState("");

  // Decode the token to get the user role
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    }
  }, []);


  // Function to render content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "Profile":
        return <ProfileForm role={role} />;
      case "Change Password":
        return <ChangePasswordForm />;
      case "Terms & Condition":
        return <TermsAndConditions />;
      case "Privacy Policy":
        return <PrivacyPolicy />;
      default:
        return <ProfileForm role={role} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="bg-gradient-to-b from-[#4C49ED] to-[#020067] p-16 text-white">
        <Typography variant="h4" className="font-semibold">
          Profile Setting
        </Typography>
      </div>
      <div className="flex mt-[-3rem] mx-8">
        <ProfileSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ProfileScreen;
