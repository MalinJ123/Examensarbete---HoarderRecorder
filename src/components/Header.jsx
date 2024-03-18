import React, { useState, useContext, useEffect } from "react";
import { useNavigate, NavLink} from "react-router-dom";

import { AppContext } from '../ContextRoot';

import "../styles/header.css";

export const Header = () => {

  const navigate = useNavigate();

  const { localStorageUser, changeButtonsOnView, setIsUserLoggedIn, setAuthenticationView, setUsername, setUserPassword, userProfilePicture } = useContext(AppContext);

  // If the is logging out, redirect to the start page
  const userIsLoggingOut = () => {
    setUsername('');
    setUserPassword('');
    setIsUserLoggedIn(false);
    localStorage.removeItem(localStorageUser);
    setAuthenticationView('login');
    navigate('/');
  }

  const goBackToPastPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    console.log(userProfilePicture)
  })

  return (
    <header className="header">

      {changeButtonsOnView === "add-category" || changeButtonsOnView === "edit-category" || changeButtonsOnView === "object" || changeButtonsOnView === "add-object" || changeButtonsOnView === "show-object" ||  changeButtonsOnView === "edit-object" ? (
        <span className="material-symbols-outlined header__icon" onClick={() => goBackToPastPage()}>reply</span>
      ) : changeButtonsOnView === "deletion" ? (
          <NavLink to="/user">
            <span className="material-symbols-outlined header__icon">reply</span>
          </NavLink>
      ) : changeButtonsOnView === "user" ? (
          <NavLink to="/start">
            <span className="material-symbols-outlined header__icon">reply</span>
          </NavLink>
      ) : (
        <div className="filler__box"></div>
      )}
      <h1 className="logotype__title">Hoarder Recorder</h1>
      {changeButtonsOnView === "user" ? (
          <span className="material-symbols-outlined header__icon" onClick={() => userIsLoggingOut()}>logout</span>
      ) : changeButtonsOnView === "authentication" || changeButtonsOnView === "deletion" || changeButtonsOnView === "add-category" || changeButtonsOnView === "edit-category" || changeButtonsOnView === "add-object" || changeButtonsOnView === "edit-object" || changeButtonsOnView === "object" || changeButtonsOnView === "show-object" ? (
        <div className="filler__box"></div>
      ) : (
        <NavLink to="/user">
          {
            userProfilePicture ? (
              <img src={userProfilePicture} alt="Profile" className="header__profile-picture" />
            ) : (
              <span className="material-symbols-outlined header__icon">person</span>
            )
          }
        </NavLink>
      )}
    </header>
  );
};


export default Header;