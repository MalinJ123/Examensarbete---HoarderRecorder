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

  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");

  const [selectedOldImage, setOldSelectedImage] = useState(selectCategory.image);

  const [selectedNewImage, setSelectedNewImage] = useState(null);

  useEffect(() => {
    setChangeButtonsOnView("edit-category");
  });

  const handleImageChange = (e) => {
    setSelectedNewImage(e.target.files[0]);
  };

  const updateCategory = async () => {
    try {
      if (categoryName.trim() !== "" && selectedOldImage !== null) {
        console.log("Category name and image are there!");

        const dbRef = collection(db, "categories");
        const matchCategoryById = query(dbRef, where("id", "==", id));
        const categorySnapshot = await getDocs(matchCategoryById);
        const categoryDocs = categorySnapshot.docs;
  
        if (categoryDocs.length === 1) {
          const categoryDoc = categoryDocs[0];
          const categoryDocRef = doc(db, "categories", categoryDoc.id);
  
  
          if (selectedOldImage === selectCategory.image) {
            console.log("Selected image is the same as the current image");
  
          await updateDoc(categoryDocRef, {
            name: categoryName,
          });
  
        } else if (selectedOldImage !== selectedNewImage) {
          console.log("Selected image is different from the current image");
  
          const imgRef = ref(imageDb, `categories/${v4()}`);
  
          const snapshot = await uploadBytes(imgRef, selectedNewImage, {
            contentType: "image/jpeg",
          });
  
          console.log("Image uploaded:", snapshot);
  
          const imageUrl = await getDownloadURL(snapshot.ref);
  
          await updateDoc(categoryDocRef, {
            name: categoryName,
            image: imageUrl,
          });
  
          const storageRef = ref(imageDb, selectedOldImage);
          await deleteObject(storageRef);
          console.log("Image deleted successfully");
  
        } else if (categoryName === selectCategory.name && selectedOldImage != selectedNewImage) {
          console.log("Category name is the same as the current name but the image is different");

          const imgRef = ref(imageDb, `categories/${v4()}`);
  
          const snapshot = await uploadBytes(imgRef, selectedOldImage, {
            contentType: "image/jpeg",
          });
  
          console.log("Image uploaded:", snapshot);
  
          const imageUrl = await getDownloadURL(snapshot.ref);
  
          await updateDoc(categoryDocRef, {
            image: imageUrl,
          });
  
          const storageRef = ref(imageDb, selectCategory.image);
          await deleteObject(storageRef);
          console.log("Image deleted successfully");
        }
  
          const updatedCategories = userCategories.filter((category) => category.id !== selectCategory.id);
          setUserCategories([]);
          setUserCategories(updatedCategories, categoryDoc);
  
          if (userCategories.includes(categoryDoc)) {
            navigate("/start");
          }
  
          console.log("Category updated successfully!");
  
        }
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  }

  return (
    <section className="add-category__section">

    <DisallowUserAccess />

      <div className="add-object__text-container">
        <h1 className="add-object__title">Redigera kategori</h1>
        <p className="add-object__info">
          Redigerar kategorin: {selectCategory.name}
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
          placeholder={selectCategory.name}
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
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

      {selectedOldImage ? (
        <img src={selectedOldImage} alt="Preview" className="add-category-image__preview" />
      ) : (
        <img src={selectedNewImage} alt="Preview" className="add-category-image__preview" />
      )}

    </div>

      <button
        className="fixed__button" type="button"
        onClick={() => updateCategory()}
        title="Slutför"
      >
        <span className="material-symbols-outlined round__button-icon">
          done
        </span>
      </button>

    </section>
  );
}