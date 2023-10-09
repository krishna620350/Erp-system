import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import ErrorPage from "../pages/error/Server/serverError";
import { App } from "../App";

const LazyComponent = {
  PageNotFound: lazy(() => import("../pages/error/pageNotFound")),
  Signin: lazy(() => import("../Component/Forms/SignIn")),
  Signup: lazy(() => import("../Component/Forms/SignUp")),
  InternetErrorPage: lazy(() => import("../pages/error/internet/interneterror")),
  Verify: lazy(() => import("../Component/Forms/Verify")),
  Dashboard: lazy(() => import("../Component/Dashboard/Dashboard")),
};

const Router = () => {
  const PrivateRoute = ({ children }) => {
    const authContext = useContext(AuthContext);
    if (!authContext.user) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const [isServerResponding, setIsServerResponding] = useState(true);
  useEffect(() => {
    const isServerUp = Math.random() < 0.5;
    setIsServerResponding(isServerUp);
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {isServerResponding ? (
            <>
              <Route path="/*" element={<LazyComponent.PageNotFound />} />
              <Route path="/" element={<App />} />
              <Route path="/interneterror" element={<LazyComponent.InternetErrorPage />} />
              {isOnline && (
                <>
                  <Route path="/signup" element={<LazyComponent.Signup />} />
                  <Route path="/signin" element={<LazyComponent.Signin />} />
                  <Route path="/verify" element={<LazyComponent.Verify />} />
                  <Route path="/dashboard/*" element={<PrivateRoute><LazyComponent.Dashboard /></PrivateRoute>}/>
                </>
              )}
            </>
          ) : (
            <Route path="/" element={<ErrorPage />} />
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export { Router };
