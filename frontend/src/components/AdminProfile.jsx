import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProfileHeader from "./Profile/ProfileHeader";
import ProfileSidebar from "./Profile/ProfileSidebar";
import AdminProfileView from "./Profile/AdminProfileView";
import ChangePassword from "./Profile/ChangePassword";
import TermsAndConditions from "./Profile/TermsAndConditions";
import PrivacyPolicy from "./Profile/PrivacyPolicy";

const AdminProfile = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-[calc(100vh-80px)] p-6 md:p-8 space-y-8 bg-background overflow-hidden flex flex-col items-center">
            {/* Decorative Blur Backgrounds */}
            <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
            <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>
            
            <div className="w-full max-w-7xl mx-auto z-10 animate-slide-up">
                {/* Header */}
                <div className="mb-6">
                    <ProfileHeader title="Profile Settings" />
                </div>

                {/* Main Container */}
                <div className="flex flex-col md:flex-row w-full bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl overflow-hidden border border-white/50 z-10 relative">
                    {/* Sidebar */}
                    <div className="w-full md:w-[320px] bg-gray-50/50 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100/80 backdrop-blur-sm shadow-[inset_-2px_0_10px_rgba(0,0,0,0.01)] shrink-0">
                        <ProfileSidebar />
                    </div>

                    {/* Content Area */}
                    <div className="w-full flex-1 p-6 md:p-10 relative">
                        {/* Inner subtle gradient for content area */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none rounded-3xl" />
                        
                        <div className="relative z-10 h-full">
                            <Routes>
                                <Route
                                    path="/"
                                    element={<AdminProfileView onEdit={() => navigate("/admin/edit-profile")} />}
                                />
                                <Route path="change-password" element={<ChangePassword />} />
                                <Route path="terms-and-conditions" element={<TermsAndConditions />} />
                                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
