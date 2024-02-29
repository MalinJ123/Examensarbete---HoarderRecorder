import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";
import userimage from "../images/image.png";

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
        <NavLink to="/" className="back-button" onClick={handleBackButtonClick}>
          <span class="material-symbols-outlined backbtn">reply</span>
        </NavLink>
      ) : null}
      <div className="header-content">
        <h1 className="header-font">Hoarder Recorder</h1>
        {isUserView ? (
          <span className="material-symbols-outlined">logout</span>
        ) : (
          <NavLink to="user" onClick={handleNavLinkClick}>
            <span className="material-symbols-outlined custom-icon">
              person
            </span>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
