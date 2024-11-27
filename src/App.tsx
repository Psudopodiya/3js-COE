import "./App.css";
import { AuthContext } from "./contexts";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";

function App() {
    return (
        <AuthContext>
            <RouterProvider router={router} />
        </AuthContext>
    );
}

export default App;
