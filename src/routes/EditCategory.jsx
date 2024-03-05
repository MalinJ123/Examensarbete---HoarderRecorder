import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../ContextRoot";
import "../styles/editCategory.css"; 

function Editcategory() {
  const navigate = useNavigate();
  const { setChangeButtonsOnView } = useContext(AppContext);
  const [categoryName, setCategoryName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false); 

  useEffect(() => {
    setChangeButtonsOnView("add-category");
  }, []);

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
    navigate("/start");
  };

  const handleTrashClick = () => {
    setShowOverlay(true); 
  };

  const handleDeleteConfirmation = (confirm) => {
    if (confirm) {
      console.log("Kategori raderad!");
    }
    setShowOverlay(false); 
  };

  return (
    <>
      <div className="addcategory-container">
        <h2 className="category-title">Redigera kategori</h2>
      </div>

      <div>
        <div className="categorylabel-container first">
          <label className="category-label" htmlFor="categoryName">
            Ny titel
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
            Ny bild
          </label>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            className="category-input"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="category-image-container">
          <div className="category-content">
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            )}
          </div>
        </div>
      </div>
      <button className="trash__button" onClick={handleTrashClick}>
        {/* Lägg till ett klickhändelse för trash-knappen */}
        <span className="material-symbols-outlined trash__btn">delete</span>
      </button>
      <button
        className="fixed__button"
        onClick={GoToCompletedCategory}
        title="Slutför"
      >
        <span className="material-symbols-outlined round__button-icon">
          done
        </span>
      </button>

      {/* Overlay för bekräftelse */}

      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <p>Vill du verkligen radera mappen?</p>
            <div>
              <button className="" onClick={() => handleDeleteConfirmation(true)}>Ja</button>
              <button onClick={() => handleDeleteConfirmation(false)}>Nej</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Editcategory;