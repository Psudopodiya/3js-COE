import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

const PublicRoute = () => {
    const { isAuthenticated } = useAuth();

    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
