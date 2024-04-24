import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Authentication from "./pages/Authenticate";
// import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AuthGuard from "./utils/AuthGuard";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<AuthGuard />}>
                    {/* Add private routes here */}
                    <Route element={<Home />} path="/" />
                </Route>
                {/* Add open routes here */}
                <Route element={<Authentication />} path="/login" />
                <Route
                    element={<Authentication children={<SignUp />} />}
                    path="/signup"
                />
            </Routes>
        </Router>
    );
}

export default App;
