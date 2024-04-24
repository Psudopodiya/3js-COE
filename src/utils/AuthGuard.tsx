import { Outlet, Navigate } from "react-router-dom";

const AuthGuard = () => {
    let auth = { token: false };
    return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
