import { Footer } from "../Bundles/Footer";
import { Headers } from "../Bundles/Header";
import { SideBar } from "../Menu/Sidebar";

import React, { useState, useEffect } from "react";

const Dashboard = ({userId}) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const htmlTag = document.querySelector("html");
    htmlTag.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const theme = {
    darkMode: darkMode,
    handleThemeChange: handleThemeChange,
  };

  return (
    <div className="container-fluid">
        <Headers theme={theme} />
        <div className="row">
          <div className="col-2 border-end">
            <SideBar />
          </div>
          <div className="col-10">
            {/* Replace with your actual content */}
            Content for logged-in users
          </div>
        </div>
      <Footer />
    </div>
  );
};

export { Dashboard };
