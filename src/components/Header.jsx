import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";

import { AppContext } from '../ContextRoot';

import "../styles/header.css";

export const Header = () => {

  const navigate = useNavigate();

  const { changeButtonsOnView, setIsUserLoggedIn, setAuthenticationView, setUsername, setUserPassword } = useContext(AppContext);

  // If the is logging out, redirect to the start page
  const userIsLoggingOut = () => {
    setUsername('');
    setUserPassword('');
    setIsUserLoggedIn(false);
    setAuthenticationView('login');
    navigate('/');
  }

  return (
    <header className="header">

      {changeButtonsOnView === "add-category" || changeButtonsOnView === "user" ? (
        <NavLink
          to="/start"
        >
          <span className="material-symbols-outlined header__icon">reply</span>
        </NavLink>
      ) : changeButtonsOnView === "deletion" ? (
        <NavLink
          to="/user"
        >
          <span className="material-symbols-outlined header__icon">reply</span>
        </NavLink>
      ) : (
        <div className="filler__box"></div>
      )}
      <h1 className="logotype__title">Hoarder Recorder</h1>
      {changeButtonsOnView === "user" ? (
          <span className="material-symbols-outlined header__icon" onClick={() => userIsLoggingOut()}>logout</span>
      ) : changeButtonsOnView === "authentication" || changeButtonsOnView === "deletion" || changeButtonsOnView === "add-category" ? (
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