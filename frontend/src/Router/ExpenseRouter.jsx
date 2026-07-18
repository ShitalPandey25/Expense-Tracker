import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import Income from "../pages/Income";
import Reports from "../pages/Reports";


function ExpenseRouter() {

  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* Protected Pages */}
      <Route element={<MainLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/expenses" element={<Expenses />} />

        <Route path="/income" element={<Income />} />

        <Route path="/reports" element={<Reports />} />

      </Route>


      {/* Default */}
      <Route 
        path="*" 
        element={<Navigate to="/login" />} 
      />

    </Routes>
  );
}


export default ExpenseRouter;