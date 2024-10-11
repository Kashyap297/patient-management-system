// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, roles }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        // Redirect to login if there is no token
        return <Navigate to="/" replace />;
    }

    try {
        const { role } = jwtDecode(token);

        // Check if the user's role is allowed to access this route
        if (roles && roles.includes(role)) {
            return children;
        } else {
            // Redirect to unauthorized page or home if role does not match
            return <Navigate to="/" replace />;
        }
    } catch (error) {
        console.error("Invalid token");
        // Redirect to login if the token is invalid
        return <Navigate to="/" replace />;
    }
};

export default ProtectedRoute;
