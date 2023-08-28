import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import { Dashboard } from "../Component/Dashboard/Dashboard";
import { Signup } from "../Component/Forms/SignUp";
import { Verify } from "../Component/Forms/Verify";
import { App } from "../App";
import { Signin } from "../Component/Forms/SignIn";
import Home from "../pages/home/Home";

const Router = () => {
  const PrivateRoute = ({ children }) => {
    const { userId } = useContext(AuthContext);
    if (!userId) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            // <PrivateRoute>
              <Dashboard />
            // </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };

