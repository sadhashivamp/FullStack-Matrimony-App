import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UserProfileSetup from "./pages/UserProfileSetup";
import ProfileCard from "./pages/ProfileCard";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/profile-setup" element={<UserProfileSetup />} />
        <Route path="/profile-card" element={<ProfileCard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
