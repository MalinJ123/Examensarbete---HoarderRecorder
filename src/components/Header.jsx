import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import { AppContext } from '../ContextRoot';

import "../styles/header.css";

export const Header = () => {
  const { changeButtonsOnView } = useContext(AppContext);

  const [isUserView, setIsUserView] = useState(false);

  const handleNavLinkClick = () => {
    setIsUserView(!isUserView);
  };

  const handleBackButtonClick = () => {
    setIsUserView(false);
  };

  return (
    <header className="header">
      {changeButtonsOnView === "user" ? (
        <NavLink
          to="/start"
          onClick={handleBackButtonClick}
        >
          <span className="material-symbols-outlined header__icon">reply</span>
        </NavLink>
      ) : (
        <div className="filler__box"></div>
      )}
      <h1 className="logotype__title">Hoarder Recorder</h1>
      {isUserView ? (
          <span className="material-symbols-outlined header__icon">logout</span>
      ) : (
        <NavLink to="user" onClick={handleNavLinkClick}>
          <span className="material-symbols-outlined header__icon">person</span>
        </NavLink>
      )}
    </header>
  );
};

export default Header;