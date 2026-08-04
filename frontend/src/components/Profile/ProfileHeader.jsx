import React from 'react';

const ProfileHeader = ({ title }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {title}
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage your personal details and security preferences.</p>
      </div>
    </div>
  );
};

export default ProfileHeader;