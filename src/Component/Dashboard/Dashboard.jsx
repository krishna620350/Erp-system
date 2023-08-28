import Navbar from "../Menu/Navbar/Navbar";
import Menu from "../Menu/Menu/Menu";
import Footer from "../Bundles/footer/Footer";
import Home from "../../pages/home/Home";
import Products from "../../pages/products//Products";
import Product from "../../pages/product/Product";
import Users from "../../pages/users/Users";
import User from "../../pages/user/User";
import Calender from "../Bundles/calender/calender";

import "../../styles/global.scss";

import { useState } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState("/home"); // Use state to manage active content
  const [previousCase, setPreviousCase] = useState([]);
  const location = useLocation();
  const { data } = location.state;
  console.log(data);
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
      case "/home":
        return <Home />;
      case "/teachers":
        return <Products setActiveContent={navigateTo} />;
      case "/product":
        return <Product id={operationalString} />;
      case "/schools":
        return <Users setActiveContent={navigateTo} />;
      case "/user":
        return <User id={operationalString} />;
      case "/calender":
        return <Calender />;
      // Add more cases for other content
      default:
        return <Home />;
    }
  };
    return (
      <div className="main">
        <Navbar Name={data.name} />
        <div className="container">
          <div className="menuContainer">
            <Menu setActiveContent={navigateTo} />
          </div>
          <div className="contentContainer">
            <button className="btn btn-dark" onClick={goBack}>
              <i class="fa-solid fa-arrow-left"></i> Back
            </button>
            {renderContent()}
          </div>
        </div>
        <Footer />
      </div>
    );
}

export { Dashboard };
