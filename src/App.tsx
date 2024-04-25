import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Authentication from "./pages/Authenticate";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import "./App.css";
import { AuthContext } from "./contexts";
import { PrivateRoute, PublicRoute } from "./utils";

function App() {
    return (
        <AuthContext>
            <Router>
                <Routes>
                    <Route element={<PrivateRoute />}>
                        {/* Add private routes here */}
                        <Route element={<Home />} path="/" />
                    </Route>
                    <Route element={<PublicRoute />}>
                        {/* Add public routes here */}
                        <Route
                            element={<Authentication children={<Login />} />}
                            path="/login"
                        />
                        <Route
                            element={<Authentication children={<SignUp />} />}
                            path="/signup"
                        />
                    </Route>
                    {/* Add open routes here */}
                </Routes>
            </Router>
        </AuthContext>
    );
}

export default App;
