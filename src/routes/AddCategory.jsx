import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, addDoc } from "firebase/firestore";

import { db, imageDb } from "../firebaseConfig";


import { AppContext } from "../ContextRoot";
import { DisallowUserAccess } from "../components/DisallowUserAccess";

import "../styles/addCategory.css";

export const AddCategory = () => {
  const navigate = useNavigate();

  const { setChangeButtonsOnView, userId } = useContext(AppContext);
  const [categoryName, setCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setChangeButtonsOnView("add-category");
  });

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  }
  
  const GoToCompletedCategory = () => {
    navigate("/start");
  }

  useEffect(() => {
    const uploadCategory = async () => {
      if (selectedImage && categoryName.trim() !== "") {
        try {
          const imgRef = ref(imageDb, `images/${v4()}`);
          const snapshot = await uploadBytes(imgRef, selectedImage, {
            contentType: "image/jpeg",
          });
          console.log("Image uploaded:", snapshot);

          const url = await getDownloadURL(snapshot.ref);
          console.log("Image URL:", url);

          const dbRef = collection(db, "categories");
          const matchUsernameId = query(dbRef, where("id", "==", userId));
          const userSnapshot = await getDocs(matchUsernameId);
          const userDocs = userSnapshot.docs;

        } catch (error) {
          console.error("Error:", error);
          // Handle error
        }
      }
    };

    uploadCategory();
  }, [selectedImage, userId]);


  const areCategoryRequirementsEmpty = (categoryName.trim() === "" || !selectedImage);

  return (
    <section className="add-category__section">
      
      <DisallowUserAccess />

      <h1 className="standard__title">Skapa kategori</h1>

      <form className="form__container 
      form__container--margin-bottom">

        <div className="form-input-with-label__box">

          <label className="form__label" htmlFor="category-name__input">
            Namnge kategorin*
          </label>

          <input
            type="text"
            id="category-name__input"
            className="form__input-text"
            placeholder="Pokémonkort"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

        </div>

          <h2 className="standard__subtitle">Ladda upp bild</h2>

        <div className="form-input-with-label__box form-input-with-label__box--upload">

          <label className="form__label" htmlFor="category-image-upload__input">
            Ladda upp en bild för kategorin*
          </label>

          <div className="form-upload-button-name__container box">
          
          <label className="form__upload-label" htmlFor="category-image-upload__input">
            <span className="material-symbols-outlined upload">cloud_upload</span>
            <p className="upload__text">Välj bild</p>
          </label>

          <span className="material-symbols-outlined trash">delete</span>
          </div>

          {/* Hide the default file input and made a custom one */}
          <input 
            type="file"
            id="category-image-upload__input"
            className="form__input-upload"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />

        </div>

      </form>

      <div className="add-category-image__container">

        {selectedImage && (
          <img src={selectedImage} alt="Preview" className="add-category-image__preview" />
        )}

      </div>

      <button type="button" className="fixed__button" onClick={() => GoToCompletedCategory()} disabled={areCategoryRequirementsEmpty} title="Slutför">

        <span className="material-symbols-outlined round__button-icon">done</span>

      </button>

    </section>
  );
}

