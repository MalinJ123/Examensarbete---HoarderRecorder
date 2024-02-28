import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";
import userimage from "../images/image.png";

export const Header = () => {


  return (
    <div className="wrapper">
        <div></div>
      <h1 className="header-font">Hoarder Recorder</h1>

      <NavLink to="user">
        <img className="user-image" src={userimage} alt="Detta är en bild på din avatar" />
      </NavLink>
   
    </div>
  );
};

export default Header;