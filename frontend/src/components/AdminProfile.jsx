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
        <div className="relative min-h-[calc(100vh-80px)] p-6 md:p-8 space-y-8 bg-[#fafbfc] overflow-hidden flex flex-col items-center">
            
            <div className="w-full max-w-7xl mx-auto z-10 animate-slide-up">
                {/* Header */}
                <div className="mb-6">
                    <ProfileHeader title="Profile Settings" />
                </div>

                {/* Main Container */}
                <div className="flex flex-col md:flex-row w-full bg-white shadow-sm rounded-3xl overflow-hidden border border-gray-100 z-10 relative">
                    {/* Sidebar */}
                    <div className="w-full md:w-[320px] bg-white p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100 shrink-0">
                        <ProfileSidebar />
                    </div>

                    {/* Content Area */}
                    <div className="w-full flex-1 p-6 md:p-10 relative">
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
