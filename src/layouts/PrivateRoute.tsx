import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const PrivateRoute = () => {
    const { isAuthenticated, logout } = useAuth();

    return isAuthenticated ? (
        <>
            <Button
                className="absolute right-4 top-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                variant="secondary"
                size="lg"
                onClick={logout}
            >
                Logout
            </Button>
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
