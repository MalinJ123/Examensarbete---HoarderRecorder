import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

import { db } from "../firebaseConfig";
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
    userId,
    localStorageUser
  } = useContext(AppContext);

  // State to store the selected image
  const [selectedImage, setSelectedImage] = useState(null);

  const existingDataInUserLS = JSON.parse(localStorage.getItem(localStorageUser)) || {};

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  useEffect(() => {
    setChangeButtonsOnView("user");
  }, [setChangeButtonsOnView]);

  useEffect(() => {
    const uploadImage = async () => {
      if (selectedImage) {
        try {
          const imgRef = ref(imageDb, `images/${v4()}`);
          const snapshot = await uploadBytes(imgRef, selectedImage, {
            contentType: "image/jpeg",
          });
          console.log("Image uploaded:", snapshot);

          const url = await getDownloadURL(snapshot.ref);
          console.log("Image URL:", url);

          const dbRef = collection(db, "users");
          const matchUsernameId = query(dbRef, where("id", "==", userId));
          const userSnapshot = await getDocs(matchUsernameId);
          const userDocs = userSnapshot.docs;

          if (userDocs.length === 1) {
            const userDoc = userDocs[0];
            const userDocRef = doc(db, "users", userDoc.id);

            await updateDoc(userDocRef, { userProfilePicture: url });
            setUserProfilePicture(url);
            // Error: Multiple users found with the same username
            // TODO: UserProfilePicture doesn't get added to localStorage

            existingDataInUserLS.userProfilePicture = userProfilePicture;

            localStorage.setItem(localStorageUser, JSON.stringify(existingDataInUserLS));

            console.log("User profile picture updated successfully");
          } else {
            console.error("Error: Multiple users found with the same username");
          }
        } catch (error) {
          console.error("Error:", error);
          // Handle error
        }
      }
    };

    uploadImage();
  }, [selectedImage, userId]);

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
        </div>
      </form>
    </section>
  );
};

