import React, { JSX } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { DashboardLayout } from "./components/DashboardLayout";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";

// 🔐 Auth guard
const requireAuth = (element: JSX.Element) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/",
    element: requireAuth(<DashboardLayout />),
    children: [
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);