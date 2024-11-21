import React from "react";
import { Toaster } from "react-hot-toast";

const GlobalToaster = () => {
  return (
    <Toaster
      position="top-right" // Positioning for the toasts
      reverseOrder={false} // Show new toasts at the bottom of the stack
      toastOptions={{
        // Global default styling for all toast notifications
        style: {
          fontSize: "14px",
          fontWeight: "500",
          padding: "10px 15px",
          borderRadius: "10px", // Smooth rounded corners
          background: "#333", // Dark theme background
          color: "#fff", // White text for better readability
        },
        // Styling for success toasts
        success: {
          style: {
            background: "#333", // Keep the background consistent
            color: "#fff", // Ensure white text
          },
          iconTheme: {
            primary: "#4caf50", // Green icon
            secondary: "#fff",
          },
        },
        // Styling for error toasts
        error: {
          style: {
            background: "#333", // Keep the background consistent
            color: "#fff", // Ensure white text
          },
          iconTheme: {
            primary: "#f44336", // Red icon
            secondary: "#fff",
          },
        },
        // Optional: Add customizations for loading or other types if needed
      }}
    />
  );
};

export default GlobalToaster;
