import { createBrowserRouter } from "react-router-dom";

import {
    AuthenticationLayout,
    MainLayout,
    PrivateRoute,
    PublicRoute,
} from "@/layouts";
import { LoginPage, RegisterPage } from "@/pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <PrivateRoute />,
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
        ],
    },
]);

export default router;
