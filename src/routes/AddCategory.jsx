import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/addcategory.css";
import { AppContext } from "../ContextRoot";

function AddCategory() {
  const navigate = useNavigate();

  const { setChangeButtonsOnView } = useContext(AppContext);
  const [categoryName, setCategoryName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setChangeButtonsOnView("add-category");
  });

  const handleNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const GoToCompletedCategory = () => {
    navigate("/object");
  }

  return (
    <>
      <div className="addcategory-container">
        <h2 className="category-title">Lägg till kategori</h2>
      </div>

      <div>
        <div className="categorylabel-container first">
          <label className="category-label" htmlFor="categoryName">
            Kategorinamn*
          </label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            className="category-input"
            placeholder="exempel: pokemon"
            value={categoryName}
            onChange={handleNameChange}
          />
        </div>
      </div>

      <div>
        <div className="categorylabel-container second">
          <label className="category-label" htmlFor="imageUpload">
            Lägg till en bild
          </label>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            className="category-input"
            accept="image/*"
            onChange={handleImageChange}
          />
          {/* Visa bildförhandsgranskning om en bild har valts */}
        </div>
        <div className="category-image-container">
        <div className="category-content">
          {imagePreview && (

            <img src={imagePreview} alt="Preview" className="image-preview" />
          )}
        </div>
        </div>
      </div>
      <button className="fixed__button" onClick={() => GoToCompletedCategory()} title="Slutför">
          <span className="material-symbols-outlined round__button-icon">done</span>
      </button>
    </>
  );
}

export default AddCategory;