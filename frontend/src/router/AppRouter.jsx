import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import Dashboard from "../pages/Dashboard";
import Help from "../pages/Help";
import Login from "../pages/Login";
import MapView from "../pages/MapView";
import Register from "../pages/Register";
import Report from "../pages/Report";
import VerifyReports from "../pages/VerifyReports";
import VolunteerDashboard from "../pages/VolunteerDashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/verify-reports" element={<VerifyReports />} />
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/help" element={<Help />} /> 
        <Route path="/map" element={<MapView />} /> 
      </Routes>
    </BrowserRouter>
  );
}
