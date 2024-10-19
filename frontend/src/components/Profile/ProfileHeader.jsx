import React from 'react';

const ProfileHeader = ({ title }) => {
  return (
    <div
      className="absolute top-0 left-0 right-0 h-64 "
      style={{
        background:
          'linear-gradient(107.38deg, #4C49ED 2.61%, #020067 101.2%)',
      }}
    >
      <h2 className="absolute top-12 left-36 text-3xl font-semibold text-white z-20">
        {title}
      </h2>
    </div>
  );
};

export default ProfileHeader;