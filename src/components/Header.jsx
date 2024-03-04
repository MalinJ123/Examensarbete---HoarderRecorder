import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import { AppContext } from '../ContextRoot';

import "../styles/header.css";

export const Header = () => {
  const { changeButtonsOnView } = useContext(AppContext);

  return (
    <header className="header">

      {changeButtonsOnView === "add-category" || changeButtonsOnView === "user" ? (
        <NavLink
          to="/start"
        >
          <span className="material-symbols-outlined header__icon">reply</span>
        </NavLink>
      ) : (
        <div className="filler__box"></div>
      )}
      <h1 className="logotype__title">Hoarder Recorder</h1>
      {changeButtonsOnView === "user" ? (
          <span className="material-symbols-outlined header__icon">logout</span>
      ) : changeButtonsOnView === "authentication" ? (
        <div className="filler__box"></div>
      ) : (
        <NavLink to="/user">
          <span className="material-symbols-outlined header__icon">person</span>
        </NavLink>
      )}
    </header>
  );
};

export default Header;