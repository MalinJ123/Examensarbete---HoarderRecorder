import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import { imageDb } from "../firebaseConfig.js";
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

  // State to store the selected image
  const [selectedImage, setSelectedImage] = useState(null);
  // State to store the URL of the selected image
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  useEffect(() => {
    setChangeButtonsOnView("user");
  }, [setChangeButtonsOnView]);

  useEffect(() => {
    if (selectedImage) {
      const imgRef = ref(imageDb, `images/${v4()}`);
      uploadBytes(imgRef, selectedImage, {
        contentType: "image/jpeg",
      })
        .then((snapshot) => {
          console.log("Image uploaded:", snapshot);
          getDownloadURL(snapshot.ref).then((url) => {
            console.log("Image URL:", url);
            setSelectedImageUrl(url);
          });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          // Handle error
        });
    }
  }, [selectedImage]);

  const goToDeleteAccountPrompt = () => {
    navigate("/delete-account");
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

              <span className="material-symbols-outlined trash">
                delete
              </span>
          </div>

          {/* Hide the default file input and make a custom one */}
          <input
            type="file"
            id="profile-picture__input"
            className="form__input-upload"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
        </div>
        {selectedImageUrl && (
          <section className="profile-picture__spacer">
            <img
              className="user-profile-picture__image"
              src={selectedImageUrl}
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

