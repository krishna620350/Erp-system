import React, { useEffect, useState } from "react";
import "./menu.scss";
import { menu } from "../../../data";
import { Link } from "react-router-dom";

const Menu = ({ setActiveContent, userType }) => {
  const [newMenu, setNewmenu] = useState([])
  const handleMenuItemClick = (content) => {
    setActiveContent(content);
  };
  useEffect(() => {
    switch (userType) {
      case "school":
        setNewmenu(menu.school);
        break;
      case "teacher":
        setNewmenu(menu.teacher);
        break;
      case "student":
        setNewmenu(menu.teacher);
        break;
      default:
        return [];
    }
  },[userType])

  return (
    <div className="menu">
      {newMenu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link
              to={listItem.url}
              onClick={() => handleMenuItemClick(listItem.url)}
              key={listItem.id}
            >
              <div className="listItem">
                <i className={listItem.icon}></i>
                <span className="listItemTitle">{listItem.title}</span>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
