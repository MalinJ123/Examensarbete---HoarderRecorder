import React, { useEffect, useContext } from "react";

import "../styles/addcategory.css";

import { AppContext } from '../ContextRoot';

function AddCategory() {

  const { setChangeButtonsOnView } = useContext(AppContext);

  useEffect(() => {
    setChangeButtonsOnView('add-category');
  })

  return (
    <>
      <div className="addcategory-container">
        <h2 className="title">Lägg till Kategori</h2>
      </div>

      <div>
        <div className="categorylabel-container">
          <label className="category-label" htmlFor="categoryName">
            Kategorinamn
          </label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            className="category-input"
            placeholder="exempel: pokemon"
          />
        </div>
      </div>

      <div>
        <div className="categorylabel-container">
          <label className="category-label" htmlFor="imageUrl">
            Lägg till en bild
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="category-input"
            placeholder="example-site.com/example-pokemon-cards-image.png"
          />
        </div>
      </div>
    </>
  );
}

export default AddCategory;