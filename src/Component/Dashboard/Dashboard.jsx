import Home from "../../pages/home/Home";
import Navbar from "../Menu/Navbar/Navbar";
import Menu from "../Menu/Menu/Menu";
import Footer from "../Bundles/footer/Footer";
import { AuthContext } from "../../Auth/AuthContext";

import "../../styles/global.scss";

import { useContext, useState, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";


const LazyComponent = {
  Calender : lazy(() => import("../Bundles/calender/calender")),
  Classes: lazy(() => import("../../pages/classes/Classes")),
  Profile: lazy(() => import("../../pages/profile/profile")),
  Product: lazy(() => import("../../pages/product/Product")),
  Students: lazy(() => import("../../pages/students/Students")),
  Teachers: lazy(() => import("../../pages/teachers/Teachers")),
  User: lazy(() => import("../../pages/user/User")),
}

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState("/home"); // Use state to manage active content
  const [previousCase, setPreviousCase] = useState([]);
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const { data } = location.state;
  const navigateTo = (newContent) => {
    setPreviousCase([...previousCase, activeContent]); // Store the current case as previous
    setActiveContent(newContent);
  };

  const goBack = () => {
    if (previousCase.length > 0) {
      const lastCase = previousCase.pop(); // Remove the last item from the array
      setActiveContent(lastCase);
      setPreviousCase([...previousCase]); // Update the array
    }
  };

  const renderContent = () => {
    const [caseString, operationalString] = activeContent
      .split("/")
      .slice(1, 3);
    const newCaseString = `/${caseString}`;
    switch (newCaseString) {
      case "/calender":
        return <LazyComponent.Calender />;
      case "/classes":
        return <LazyComponent.Classes userId={ authContext.userId } />;
      case "/home":
        return <Home setActiveContent={navigateTo} />;
      case "/profile":
        return <LazyComponent.Profile userId={ authContext.userId } data={data} />;
      case "/product":
        return <LazyComponent.Product id={operationalString} />;
      case "/students":
        return <LazyComponent.Students setActiveContent={navigateTo} />;
      case "/teachers":
        return <LazyComponent.Teachers setActiveContent={navigateTo} />;
      case "/user":
        return <LazyComponent.User id={operationalString} />;
      // Add more cases for other content
      default:
        return <Home />;
    }
  };
    return (
      <div className="main">
        <Navbar
          Name={data.name}
          logout={() => authContext.logout()}
          setActiveContent={navigateTo}
        />
        <div className="container">
          <div className="menuContainer">
            <Menu setActiveContent={navigateTo} />
          </div>
          <div className="contentContainer">
            <button className="btn btn-dark mb-2" onClick={goBack}>
              <i class="fa-solid fa-arrow-left"></i> Back
            </button>
            <Suspense fallback={<div>Loading...</div>}>
              {renderContent()}
            </Suspense>
          </div>
        </div>
        <Footer />
      </div>
    );
}

export { Dashboard };
