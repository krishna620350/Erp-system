import "./navbar.scss";
import { AuthContext } from "../../../Auth/AuthContext"; 
import { useContext, useEffect, useState } from "react";

const Navbar = ({Name}) => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setUserData(authContext.userId);
  }, [authContext.userId]);

  console.log(authContext.userId);
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>#ERP</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>{ Name }</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
