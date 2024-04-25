import { createBrowserRouter } from "react-router-dom";

import { AuthenticationLayout, PrivateRoute, PublicRoute } from "@/layouts";
import { HomePage, LoginPage, RegisterPage } from "@/pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
        ],
    },
    {
        path: "/",
        element: <PublicRoute />,
        children: [
            {
                path: "/login",
                element: (
                    <AuthenticationLayout>
                        <LoginPage />
                    </AuthenticationLayout>
                ),
            },
            {
                path: "/register",
                element: (
                    <AuthenticationLayout>
                        <RegisterPage />
                    </AuthenticationLayout>
                ),
            },
        ],
    },
]);

export default router;
