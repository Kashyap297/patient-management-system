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
    <div className="min-h-screen bg-[#fafbfc] relative overflow-hidden flex flex-col font-sans">
      {/* Header section */}
      <div className="relative z-10 w-full h-[200px] bg-white border-b border-gray-100 flex flex-col justify-center px-10 md:px-20 mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Profile Settings
        </h1>
        <p className="text-gray-500 font-medium mt-2">Manage your account settings and preferences.</p>
      </div>

      {/* Content Section */}
      <div className="relative z-20 flex flex-col md:flex-row mx-6 md:mx-12 lg:mx-20 pb-12 gap-8 -mt-20">
        <div className="w-full md:w-1/4">
          <ProfileSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
        <div className="w-full md:w-3/4">
          <div className="bg-white h-full rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
