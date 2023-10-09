import React, { Suspense, useContext, useState, lazy } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../Menu/Navbar/Navbar";
import Menu from "../Menu/Menu/Menu";
import Footer from "../Bundles/footer/Footer";
import { AuthContext } from "../../Auth/AuthContext";
import "../../styles/global.scss";

const LazyComponent = {
  Calender: lazy(() => import("../Bundles/calender/calender")),
  Classes: lazy(() => import("../../pages/classes/Classes")),
  ClassDetail: lazy(() => import("../../pages/classes/ClassDetail")),
  Home: lazy(() => import("../../pages/home/Home")),
  Profile: lazy(() => import("../../pages/profile/profile")),
  Product: lazy(() => import("../../pages/product/Product")),
  Students: lazy(() => import("../../pages/students/Students")),
  Teachers: lazy(() => import("../../pages/teachers/Teachers")),
  User: lazy(() => import("../../pages/user/User")),
  PageNotFound: lazy(() => import("../../pages/error/pageNotFound")),
};

const Dashboard = () => {
  const [previousCase, setPreviousCase] = useState([]);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState(null);
  const navigateTo = (newContent) => {
    setPreviousCase((prev) => [...prev, window.location.pathname]);
    navigate(newContent);
  };
  const goBack = () => {
    if (previousCase.length > 0) {
      const lastCase = previousCase.pop();
      navigate(lastCase);
      setPreviousCase([...previousCase]);
    }
  };
  return (
    <div className="main">
      <Navbar
        user={authContext.user.data}
        logout={() => authContext.logout()}
        setActiveContent={navigateTo}
      />
      <div className="container">
        <div className="menuContainer">
          <Menu setActiveContent={navigateTo} userType={ authContext.user.data.type } />
        </div>
        <div className="contentContainer">
          <button className="btn btn-dark mb-2" onClick={goBack}>
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/*" element={<LazyComponent.PageNotFound />} />
              <Route path="/" element={<LazyComponent.Home />} />
              <Route path="calender" element={<LazyComponent.Calender />} />
              <Route
                path="classes/*"
                element={
                  <LazyComponent.Classes
                    userId={authContext.user.id}
                    setActiveContent={navigateTo}
                    setClassDetails={setClassDetails}
                  />
                }
              />
              <Route
                path="classes/details"
                element={
                  <LazyComponent.ClassDetail classDetails={classDetails} />
                }
              />
              <Route
                path="profile"
                element={
                  <LazyComponent.Profile
                    userId={authContext.user.id}
                    data={authContext.user.data}
                  />
                }
              />
              <Route path="product" element={<LazyComponent.Product />} />
              <Route
                path="students"
                element={
                  <LazyComponent.Students setActiveContent={navigateTo} />
                }
              />
              <Route
                path="teachers"
                element={
                  <LazyComponent.Teachers
                    setActiveContent={navigateTo}
                    userId={authContext.user.id}
                  />
                }
              />
              <Route path="user" element={<LazyComponent.User />} />
            </Routes>
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
