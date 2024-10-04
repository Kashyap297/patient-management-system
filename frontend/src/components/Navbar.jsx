import React from "react";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <h1 className="text-xl font-bold">Doctor Management</h1>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-md px-4 py-2 mr-4"
        />
        <img
          src="https://via.placeholder.com/50"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
