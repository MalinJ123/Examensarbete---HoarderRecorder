import React, { useEffect, useContext, useState } from "react";
import "../styles/addcategory.css";
import { AppContext } from "../ContextRoot";

function AddCategory() {
  const { setChangeButtonsOnView } = useContext(AppContext);
  const [categoryName, setCategoryName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setChangeButtonsOnView("add-category");
  }, [setChangeButtonsOnView]);

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

  return (
    <>
      <div className="addcategory-container">
        <h2 className="category-title">Lägg till Kategori</h2>
      </div>

      <div>
        <div className="categorylabel-container first">
          <label className="category-label" htmlFor="categoryName">
            Kategorinamn
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
        <h2 className="category-title">Förhandsgranskning </h2>
          {imagePreview && (

            <img src={imagePreview} alt="Preview" className="image-preview" />
          )}
        </div>
        </div>
      </div>
    </>
  );
}

export default AddCategory;