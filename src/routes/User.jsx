import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../ContextRoot";
import { DisallowUserAccess } from "../components/DisallowUserAccess";
import "../styles/user.css";

export const User = () => {
  const navigate = useNavigate();

  const {
    setChangeButtonsOnView,
    userProfilePicture,
    setUserProfilePicture,
    username,
  } = useContext(AppContext);

  // State to store the name of the selected image
  const [selectedImageName, setSelectedImageName] = useState("");

  useEffect(() => {
    setChangeButtonsOnView("user");
  }, [setChangeButtonsOnView]);

  const goToDeleteAccountPrompt = () => {
    navigate("/delete-account");
  };

  // Function to handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageName(file.name); 
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="user__section">
      <DisallowUserAccess />

      <h1 className="standard__title">Hej {username}!</h1>

      <form className="form__container">
        <div className="form-input-with-label__box form-input-with-label__box--upload">
          <label
            className="form__label"
            htmlFor="category-image-upload__input-one"
          >
            Välj en profilbild
          </label>
          <div className="form-upload-button-name__container box">
            <label
              className="form__upload-label"
              htmlFor="profile-picture__input"
            >
              <span className="material-symbols-outlined upload">
                cloud_upload
              </span>
              <p className="upload__text">Välj bild</p>
            </label>
            
            {/* Display the name of the selected image */}
            <label
              className="form__selected-file__label"
              htmlFor="profile-picture__input"
            >
              {selectedImageName}
            </label>
            <span className="material-symbols-outlined trash">delete</span>
          </div>

          {/* Hide the default file input and make a custom one */}
          <input
            type="file"
            id="profile-picture__input"
            className="form__input-upload"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </div>
        {userProfilePicture && (
          <section className="profile-picture__spacer">
            <img
              className="user-profile-picture__image"
              src={userProfilePicture}
              alt="Profilbild"
            />
          </section>
        )}
        <div className="form-button__group">
          <button
            type="button"
            className="secondary__button"
            onClick={goToDeleteAccountPrompt}
          >
            Ta bort konto
          </button>
          {userProfilePicture && (
            <button type="submit" className="primary__button">
              Slutför ändring
            </button>
          )}
        </div>
      </form>
    </section>
  );
};