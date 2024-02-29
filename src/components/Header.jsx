import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";

export const Header = () => {
  const [isUserView, setIsUserView] = useState(false);

  const handleNavLinkClick = () => {
    setIsUserView(!isUserView);
  };

  const handleBackButtonClick = () => {
    setIsUserView(false);
  };

  return (
    <div className="wrapper">
      <div></div>
      {isUserView ? (
        <NavLink
          to="/"
          className="back-button"
          onClick={handleBackButtonClick}
        >
          <span className="material-symbols-outlined backbtn">reply</span>
        </NavLink>
      ) : (
        <span className="back-button"></span>
      )}
      <h1 className="header-font">Hoarder Recorder</h1>
      <div></div>
      {isUserView ? (
        <div>
          <span className="material-symbols-outlined logout">logout</span>{" "}
        </div>
      ) : (
        <NavLink to="user" onClick={handleNavLinkClick}>
          <span className="material-symbols-outlined custom-icon">person</span>
        </NavLink>
      )}
    </div>
  );
};

export default Header;