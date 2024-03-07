import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../ContextRoot";
import { DisallowUserAccess } from "../components/DisallowUserAccess";

import "../styles/addObject.css";

export const AddObject = () => {
  const navigate = useNavigate();

  const { setChangeButtonsOnView, checkWhatCategoryIsUserOn } = useContext(AppContext);

  const [objectName, setObjectName] = useState("");
  const [objectProducer, setObjectProducer] = useState("");
  const [objectValue, setObjectValue] = useState("");
  const [objectNote, setObjectNote] = useState("");

  const [previewSelectedImage, setPreviewSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState("");

  useEffect(() => {
    setChangeButtonsOnView("add-object");
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      setSelectedImageName(file.name);
    }
  };

  const GoToCompletedCategory = () => {
    navigate("/object");
  }

  const isCategoryNameEmpty = objectName === "";

  return (
    <section className="add-object__section">
      
      <DisallowUserAccess />
      <div className="add-object__text-container">
        <h1 className="add-object__title">Skapa objekt</h1>
        <p className="add-object__info">Är i kategorin: {checkWhatCategoryIsUserOn}</p>
      </div>


      <form className="form__container 
      form__container--margin-bottom">

        <div className="form-input-with-label-guideline__container">
        <div className="form-input-with-label__box">

          <label className="form__label" htmlFor="object-name__input">
            Namnge objektet*
          </label>

          <input
            type="text"
            id="object-name__input"
            className="form__input-text"
            placeholder="Heir of Fire"
            value={objectName}
            onChange={(e) => setObjectName(e.target.value)}
          />

        </div>
        
          <p className="add-object__guideline">Tex.: Boktitel, pokémonnamn.</p>
        
        </div>

        <div className="form-input-with-label-guideline__container">
        <div className="form-input-with-label__box">

          <label className="form__label" htmlFor="object-producer__input">
            Producent
          </label>

          <input
            type="text"
            id="object-producer__input"
            className="form__input-text"
            placeholder="Sara J Maas"
            value={objectProducer}
            onChange={(e) => setObjectProducer(e.target.value)}
          />

        </div>
        
          <p className="add-object__guideline">Tex.: Författare, skapare, tillverkare.</p>
        
        </div>

        <div className="form-input-with-label__box">

          <label className="form__label" htmlFor="object-value__input">
            Objektets värde i kronor
          </label>

          <input
            type="text"
            id="object-value__input"
            className="form__input-text"
            placeholder="249"
            value={objectValue}
            onChange={(e) => setObjectValue(e.target.value)}
          />

        </div>

        <div className="form-input-with-label__box">
            
            <label className="form__label" htmlFor="object-note__input">
              Anteckning
            </label>
  
            <textarea
              id="object-note__input"
              className="form__input-textarea"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              value={objectNote}
              cols={4}
              onChange={(e) => setObjectNote(e.target.value)}
            />

          </div>


        <div className="form-input-with-label__box form-input-with-label__box--upload">

          <label className="form__label" htmlFor="category-image-upload__input">
            Ladda upp en bild för objetet
          </label>

          <div className="form-upload-button-name__container">
          
          <label className="form__upload-label" htmlFor="category-image-upload__input">
            <span className="material-symbols-outlined upload">cloud_upload</span>
            <p className="upload__text">Välj bild</p>
          </label>

          <label className="form__selected-file__label" htmlFor="category-image-upload__input">
            {selectedImageName}
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

        {previewSelectedImage && (
          <img src={previewSelectedImage} alt="Preview" className="add-category-image__preview" />
        )}

      </div>

      <button type="button" className="fixed__button" onClick={() => GoToCompletedCategory()} disabled={isCategoryNameEmpty} title="Slutför">

        <span className="material-symbols-outlined round__button-icon">done</span>

      </button>

    </section>
  );
}

