import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
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

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard/*"
        element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/income" element={<Income />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </MainLayout>
        }
      />

    </Routes>
  );
}

export default ExpenseRouter;