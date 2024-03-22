import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, imageDb } from "../firebaseConfig";

import { AppContext } from "../ContextRoot";
import { DisallowUserAccess } from "../components/DisallowUserAccess";

import "../styles/addCategory.css";

export const AddCategory = () => {
  const navigate = useNavigate();

  const { setChangeButtonsOnView, userId, userCategories, setUserCategories, username } = useContext(AppContext);
  const [categoryName, setCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setChangeButtonsOnView("add-category");
  });

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  }
  

  const areCategoryRequirementsEmpty = (categoryName.trim() === "" || !selectedImage);

    const uploadCategory = async () => {
      if (!areCategoryRequirementsEmpty) {
        if (selectedImage && categoryName.trim() !== "") {
          try {
  
            // Upload the image to the storage
            const imgRef = ref(imageDb, `categories/${username}-${categoryName}-${v4()}`);
            const snapshot = await uploadBytes(imgRef, selectedImage, {
              contentType: "image/jpeg",
            });
            console.log("Image uploaded:", snapshot);
  
            const imageUrl = await getDownloadURL(snapshot.ref);
  
            // Upload the category to the database
            const dbRef = collection(db, "categories");
  
            const generateCategoryId = async (dbRef) => {
              // Generate a category id
              let categoryId = v4();
  
              let checkIfCategoryIdExists = true;
              while (checkIfCategoryIdExists) {
                const matchCategoryId = query(dbRef, where("id", "==", categoryId));
                const snapshot = await getDocs(matchCategoryId);
  
                if (snapshot.empty) {
                  checkIfCategoryIdExists = false;
                } else {
                  categoryId = v4();
                }
              }
  
              return categoryId;
  
            }
  
            const categoryId = await generateCategoryId(dbRef);
  
            const categoryData = {id: categoryId, name: categoryName, image: imageUrl, userId: userId};
  
            await addDoc(dbRef, categoryData)
  
            // Update the user categories
            setUserCategories([...userCategories, categoryData]);

            console.log("Category uploaded:", categoryData);

            navigate("/start")
  
          } catch (error) {
            console.error("Error:", error);
            // Handle error
          }
        }
      };
      }

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
          <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="add-category-image__preview" />
        )}

      </div>

      <button type="button" className="fixed__button" onClick={() => uploadCategory()} disabled={areCategoryRequirementsEmpty} title="Slutför">

        <span className="material-symbols-outlined round__button-icon">done</span>

      </button>

    </section>
  );
}

