import React from 'react';

const ProfileHeader = ({ title }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary to-blue-500 rounded-3xl shadow-lg border border-blue-400 p-8 md:p-12 min-h-[160px] flex items-center justify-between">
      {/* Decorative Elements */}
      <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-white/20 rounded-full mix-blend-overlay filter blur-xl"></div>
      <div className="absolute bottom-[-50%] right-[-10%] w-64 h-64 bg-blue-300/30 rounded-full mix-blend-overlay filter blur-xl"></div>
      
      <div className="relative z-10 flex flex-col">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          {title}
        </h2>
        <p className="text-blue-100/80 mt-2 font-medium">Manage your personal details and security preferences.</p>
      </div>
    </div>
  );
};

export default ProfileHeader;