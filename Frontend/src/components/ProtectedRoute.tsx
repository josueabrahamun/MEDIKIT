import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const ProtectedRoute: React.FC<{ children: React.ReactNode; requiresAuth?: boolean }> = ({ children, requiresAuth = true }) => {
    const authContext = useContext(AuthContext);
    const isAuthenticated = !!authContext?.auth?.token;

    if (requiresAuth && !isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!requiresAuth && isAuthenticated) {
        return <Navigate to="/side-menu" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
