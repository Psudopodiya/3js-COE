import { RouterProvider } from "react-router-dom";

import "./App.css";
import { AuthContext } from "./contexts";
import { router } from "./router";

function App() {
    return (
        <AuthContext>
            <RouterProvider router={router} />
        </AuthContext>
    );
}

export default App;
