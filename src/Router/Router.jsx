import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import { Dashboard } from "../Component/Dashboard/Dashboard";
import { Signup } from "../Component/Forms/SignUp";
import { App } from "../App";

const Router = () => {
  const PrivateRoute = ({ component: Component }) => {
    const { userId } = useContext(AuthContext);

    if (!userId) {
      return <Navigate to="/" replace />;
    }

    return <Component />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute component={<Dashboard />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
