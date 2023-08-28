import React from "react";
import "./menu.scss";
import { menu } from "../../../data";

const Menu = ({ setActiveContent }) => {
  const handleMenuItemClick = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <div
              className="listItem"
              key={listItem.id}
              onClick={() => handleMenuItemClick(listItem.url)}
            >
              <i className={listItem.icon}></i>
              <span className="listItemTitle">{listItem.title}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
