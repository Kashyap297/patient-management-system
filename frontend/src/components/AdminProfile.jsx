import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProfileHeader from "./Profile/ProfileHeader";
import ProfileSidebar from "./Profile/ProfileSidebar";
import AdminProfileView from "./Profile/AdminProfileView";
import ChangePassword from "./Profile/ChangePassword";
import TermsAndConditions from "./Profile/TermsAndConditions";
import PrivacyPolicy from "./Profile/PrivacyPolicy";
import Home from "../pages/Home";


const AdminProfile = () => {
    const navigate = useNavigate();

    return (
        <div className="relative bg-gray-100  py-16 px-36  h-full">
            {/* Header */}
            <ProfileHeader title="Profile Setting" />

            {/* Main Container */}
            <div className="flex flex-col md:flex-row w-full mt-8  mx-auto bg-white shadow-lg rounded-lg overflow-hidden z-10 relative">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 bg-white p-6 border-r">
                    <ProfileSidebar />
                </div>

                {/* Content Area */}
                <div className="w-full md:w-3/4">
                    <Routes>
                        <Route
                            path="/"
                            element={<AdminProfileView onEdit={() => navigate("/admin-profile/edit-profile")} />}
                        />
                        <Route path="change-password" element={<ChangePassword />} />
                        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
                        <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;