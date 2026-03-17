import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../app/pages/Login";
import { Dashboard } from "../app/pages/Dashboard";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}