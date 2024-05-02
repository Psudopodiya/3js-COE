import { createBrowserRouter } from "react-router-dom";

import {
    AuthenticationLayout,
    PrivateRoute,
    PublicRoute,
    MainLayout,
} from "@/layouts";
import { HomePage, LoginPage, RegisterPage, PythonHomePage } from "@/pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <PrivateRoute />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    },
                    {
                        path: "/python",
                        element: <PythonHomePage />,
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
        ],
    },
]);

export default router;
