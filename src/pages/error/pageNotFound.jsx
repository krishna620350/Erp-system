import React from "react";
import "./PageNotFound.scss"; // Import your custom CSS file for styling

const PageNotFound = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <div className="error-number">404</div>
        <div className="error-message">Page Not Found</div>
        <div className="error-description">
          The page you're looking for doesn't exist or has been moved.
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
