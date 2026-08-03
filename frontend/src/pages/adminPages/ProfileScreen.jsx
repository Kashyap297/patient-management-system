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
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>

      {/* Header section with modern gradient */}
      <div className="relative z-10 w-full h-[250px] bg-gradient-to-r from-primary to-blue-600 rounded-b-[40px] shadow-lg flex items-center px-16">
        <Typography variant="h3" className="font-extrabold text-white tracking-tight drop-shadow-md">
          Profile Settings
        </Typography>
      </div>

      {/* Content Section overlapping the header */}
      <div className="relative z-20 flex flex-col md:flex-row mt-[-80px] mx-6 md:mx-12 lg:mx-20 pb-12 gap-8">
        <div className="w-full md:w-1/4 animate-fade-in">
          <ProfileSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
        <div className="w-full md:w-3/4 animate-slide-up">
          <div className="glass h-full rounded-3xl shadow-sm border border-white/50 overflow-hidden">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
