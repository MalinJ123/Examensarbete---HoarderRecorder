import React, { useState } from "react";
import "../styles/header.css";
import userimage from "../images/image.png";

export const Header = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [clickedImage, setClickedImage] = useState(null);

  const openOverlay = (imageSrc) => {
    setOverlayOpen(true);
    setClickedImage(imageSrc);
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
    setClickedImage(null);
  };

  return (
    <div className="wrapper">
        <div></div>
      <h1 className="header-font">Hoarder Recorder</h1>

      <div
        className="overlay"
        style={{ display: overlayOpen ? "block" : "none" }}
        onClick={closeOverlay}
      >
        <div>
          <h2>Victor Bergström</h2>
          <div>ikon</div>
        </div>
        <img src={clickedImage} alt="" />
      </div>
      <img
        className="user-image"
        src={userimage}
        alt=""
        onClick={() => openOverlay(userimage)}
      />
    </div>
  );
};

export default Header;