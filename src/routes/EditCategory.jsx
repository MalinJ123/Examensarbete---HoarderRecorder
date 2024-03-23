import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { v4 } from "uuid";

import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

import { db, imageDb } from "../firebaseConfig";

import { AppContext } from "../ContextRoot";
import { DisallowUserAccess } from "../components/DisallowUserAccess";

export const EditCategory = () => {

  const { setChangeButtonsOnView, userCategories, setUserCategories } = useContext(AppContext);

  const { id } = useParams();

  const selectCategory = userCategories.find((category) => category.id === id);

  const oldCategory = {...selectCategory};

  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState(oldCategory.name || "");

  const [selectedImage, setSelectedImage] = useState(null);

  const [isSomethingChanged, setIsSomethingChanged] = useState(true);

  useEffect(() => {
    setChangeButtonsOnView("edit-category");
  });

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setIsSomethingChanged(false);
  };

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
    setIsSomethingChanged(false);
  }

  const updateCategory = async () => {
    try {
      if (categoryName.trim() !== "" || oldCategory.name) {

        const dbRef = collection(db, "categories");
        const matchCategoryById = query(dbRef, where("id", "==", id));
        const categorySnapshot = await getDocs(matchCategoryById);
        const categoryDocs = categorySnapshot.docs;
  
        if (categoryDocs.length === 1) {
          const categoryDoc = categoryDocs[0];
          const categoryDocRef = doc(db, "categories", categoryDoc.id);
  
          if (!selectedImage) {
            console.log("No new image selected, updating only the name of the category");
  
            await updateDoc(categoryDocRef, {
              name: categoryName || oldCategory.name,
            });
  
          } else {
            console.log("Selected image is different from the current image");
  
            const imgRef = ref(imageDb, `categories/${username}-${categoryName}-${v4()}`);
  
            const snapshot = await uploadBytes(imgRef, selectedImage, {
              contentType: "image/jpeg",
            });
  
            console.log("Image uploaded:", snapshot);
  
            const imageUrl = await getDownloadURL(snapshot.ref);
  
            await updateDoc(categoryDocRef, {
              name: categoryName || oldCategory.name,
              image: imageUrl,
            });
  
            const storageRef = ref(imageDb, oldCategory.image);
            await deleteObject(storageRef);
            console.log("Image deleted successfully");
          }
  
          const filteredCategories = userCategories.filter((category) => category.id !== oldCategory.id);
          setUserCategories(filteredCategories, categoryDoc);
  
          navigate("/start");
  
          console.log("Category updated successfully!");
        }
      } else if (categoryName.trim() === "" && !selectedImage) {
        
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <section className="add-category__section">

    <DisallowUserAccess />

      <div className="add-object__text-container">
        <h1 className="add-object__title">Redigera kategori</h1>
        <p className="add-object__info">
          Redigerar kategorin: {oldCategory.name}
        </p>
      </div>

    <form className="form__container 
    form__container--margin-bottom">

      <div className="form-input-with-label__box">

        <label className="form__label" htmlFor="category-name__input">
          Ange nytt kategorinamn*
        </label>

        <input
          type="text"
          id="category-name__input"
          className="form__input-text"
          placeholder={oldCategory.name}
          value={categoryName}
          onChange={(e) => handleCategoryNameChange(e)}
        />

      </div>

      <div className="form-input-with-label__box form-input-with-label__box--upload">

        <label className="form__label" htmlFor="category-image-upload__input">
          Ladda upp en ny bild för kategorin
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

      <img src={selectedImage ? URL.createObjectURL(selectedImage) : oldCategory.image} alt="Bild" className="add-category-image__preview" />

    </div>

      <button
        className="fixed__button" type="button"
        onClick={() => updateCategory()}
        disabled={isSomethingChanged}
        title="Slutför"
      >
        <span className="material-symbols-outlined round__button-icon">
          done
        </span>
      </button>

    </section>
  );
}