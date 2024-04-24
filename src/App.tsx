import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Authentication from "./pages/Authenticate";
// import Login from "./components/Login";
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
            </Routes>
        </Router>
    );
}

export default App;
