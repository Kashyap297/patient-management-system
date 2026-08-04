import { useEffect, useState } from "react";
import api from "../api/api";
import adminPlaceholder from "../assets/images/admin-image.png";
import { HiOutlineUser, HiOutlineLockClosed, HiOutlineShieldCheck, HiOutlineDocumentText } from "react-icons/hi";

const ProfileSidebar = ({ activeSection, setActiveSection }) => {
  const [userData, setUserData] = useState({
    name: "",
    photo: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/users/profile");
        const { firstName, lastName, profileImage } = response.data;

        const imageUrl = profileImage
          ? (profileImage.startsWith('http') ? profileImage : `http://localhost:8000/${profileImage.replace(/\\/g, '/')}`)
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

  const menuItems = [
    { label: "Profile", icon: HiOutlineUser },
    { label: "Change Password", icon: HiOutlineLockClosed },
    { label: "Terms & Condition", icon: HiOutlineDocumentText },
    { label: "Privacy Policy", icon: HiOutlineShieldCheck },
  ];

  return (
    <div className="w-full bg-white h-full rounded-2xl border border-gray-100 flex flex-col py-8 px-6 shadow-sm font-sans">
      <div className="text-center mb-8">
        <img
          src={userData.photo || adminPlaceholder}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-gray-50 shadow-sm"
        />
        <h2 className="text-lg font-bold text-gray-800 mt-4 tracking-tight">
          {userData.name || "Unknown User"}
        </h2>
        <p className="text-sm text-gray-500 font-medium">Manage Account</p>
      </div>

      <div className="flex flex-col space-y-2">
        {menuItems.map((item, index) => {
          const isActive = activeSection === item.label;
          return (
            <button
              key={index}
              onClick={() => setActiveSection(item.label)}
              className={`flex items-center w-full px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                  ? "bg-[#ecfdf5] text-[#10b981]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon
                className={`mr-3 w-5 h-5 transition-colors ${
                  isActive ? "text-[#10b981]" : "text-gray-500"
                }`}
              />
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileSidebar;
