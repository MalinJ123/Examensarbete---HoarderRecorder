import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
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
          const imgRef = ref(imageDb, `profiles/${v4()}`);
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
            // If changing the code, the page reloads and the upload function goes off

            existingDataInUserLS.userProfilePicture = userProfilePicture;

            localStorage.setItem(localStorageUser, JSON.stringify(existingDataInUserLS));

            console.log("User profile picture updated successfully");
          } else {
            console.error("Error: Multiple users found with the same username");
          }
        } catch (error) {
          console.error("Error:", error);

        }
      }
    };

    uploadImage();
  }, [selectedImage, userId]);

  const deleteUserImage = async (userId) => {
    try {
      const dbRef = collection(db, "users");
      const matchUserId = query(dbRef, where("id", "==", userId));
      const userSnapshot = await getDocs(matchUserId);
      const userDocs = userSnapshot.docs;
  
      if (userDocs.length === 1) {
        const userDoc = userDocs[0];
        const userDocRef = doc(db, "users", userDoc.id);
  
        // Retrieve the image URL from Firestore
        const userData = userDoc.data();
        const imageUrl = userData.userProfilePicture;
  
        // Check if the user has a profile image
        if (imageUrl) {
          // Delete the image URL from Firestore
          await updateDoc(userDocRef, { userProfilePicture: null });
  
          // Construct the storage reference by appending Firebase Storage domain
          const storageRef = ref(imageDb, imageUrl);
  
          // Delete the image from Firebase Storage
          await deleteObject(storageRef);

          setUserProfilePicture(null);

          // TODO: UserProfilePicture doesn't get removed from localStorage and where does userPicture come from?
  
          console.log("Image deleted successfully");
        } else {
          console.error("Error: User does not have a profile image");
        }
      } else {
        console.error("Error: Multiple users found with the same user ID");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };


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

              <span className="material-symbols-outlined trash" onClick={() => deleteUserImage(userId)}>
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

