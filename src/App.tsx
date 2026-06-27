import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Absensi } from "./pages/employee/Absensi";
import { MasterData } from "./pages/admin/MasterData";
import { Monitoring } from "./pages/admin/Monitoring";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/employee/absensi" element={<Absensi />} />
          <Route path="/admin/dashboard" element={<MasterData />} />
          <Route path="/admin/monitoring" element={<Monitoring />} />
          <Route path="/admin/absensi" element={<Absensi />} />
        </Route>

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
