import { RouterProvider } from "react-router-dom";

import "./App.css";
import { AuthContext } from "./contexts";
import { router } from "./router";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <AuthContext>
            <MainLayout>
                <RouterProvider router={router} />
            </MainLayout>
        </AuthContext>
    );
}

export default App;
