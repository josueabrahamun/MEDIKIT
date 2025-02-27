import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SideMenu from "./pages/sideMenu";
import Appointment from "./components/Appointment";
import HistorialMedico from "./components/HistorialMedico";
import AdminDashboard from "./pages/AdminDashboard";



type AppointmentType = {
  date: string;
  time: string;
  doctor: string;
};

const App: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentType[]>([
    { date: "2025-02-15", time: "10:00 AM", doctor: "Dr. Pérez" }
  ]);

  const removeAppointment = (index: number) => {
    setAppointments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/historial"
            element={<ProtectedRoute><HistorialMedico /></ProtectedRoute>}
          />
                    <Route
            path="/admin-dashboard"
            element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
          />
          
          <Route
            path="/login"
            element={<ProtectedRoute requiresAuth={false}><Login /></ProtectedRoute>}
          />
          <Route
            path="/register"
            element={<ProtectedRoute requiresAuth={false}><Register /></ProtectedRoute>}
          />
          <Route
            path="/agendar-cita"
            element={<ProtectedRoute><Appointment /></ProtectedRoute>}
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/side-menu"
            element={<ProtectedRoute><SideMenu /></ProtectedRoute>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
