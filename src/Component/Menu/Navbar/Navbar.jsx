import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
const Navbar = (props) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    "New notification 1",
    "New notification 2",
  ]);

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleFullScreenClick = () => {
    const element = document.documentElement;

    if (document.fullscreenElement && fullScreen) {
      document.exitFullscreen();
      setFullScreen(false);
    } else {
      setFullScreen(true);
      element.requestFullscreen().catch((err) => {
        console.error(
          "Error attempting to enable full-screen mode:",
          err.message
        );
      });
    }
  };

  const handleNotification = () => {
    setShowNotifications(!showNotifications);
  }

  const NotificationBox = ({ notifications }) => {
    return (
      <div className="notification-box">
        <h3>Notifications</h3>
        {notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            {notification}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/dashboard">
          <span>
            <img
              className="image"
              src="logo.png"
              alt="#"
            />
            {props.user.type === "school" ? props.user.name : "School Dries"}
            <sup className="border border-info rounded-pill px-1 ms-1">
              {" "}
              #ERP
            </sup>
          </span>
        </Link>
      </div>
      {isSearchVisible && (
        <div className="search">
          <form action="">
            <div>
              <input
                type="text"
                class=""
                placeholder="Search ............."
                aria-describedby="button-addon2"
              />
              <button class="" type="button" id="button-addon2">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="icons">
        {!isSearchVisible && (
          <img
            src="/search.svg"
            alt=""
            className="icon"
            onClick={toggleSearchVisibility}
          />
        )}
        <img src="/app.svg" alt="" className="icon" />
        <span onClick={handleFullScreenClick}>
          {!fullScreen ? (
            <img
              src="/expand.svg"
              alt=""
              className="icon"
            />
          ) : (
            <button
              type="button"
              class="btn-close"
              aria-label="exit fullscreen"
            ></button>
          )}
        </span>
        <div className="notification">
          <img src="/notifications.svg" alt="#" onClick={handleNotification}/>
          {showNotifications ? ("") : (<span>1</span>)}
        {showNotifications && <NotificationBox notifications={notifications}/>}
        </div>
        <div
          className="user btn btn-outline-secondary"
          onClick={() => props.logout()}
          >
          <i class="fa-solid fa-power-off"></i>
          <span>Sign-out</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
