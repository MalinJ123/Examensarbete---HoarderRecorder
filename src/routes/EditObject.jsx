import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../ContextRoot";
import { DisallowUserAccess } from "../components/DisallowUserAccess";
import "../styles/editObject.css";

import "../styles/addObject.css";

export const EditObject = () => {
  const navigate = useNavigate();

  const { setChangeButtonsOnView, checkWhatCategoryIsUserOn } =
    useContext(AppContext);

  const [objectName, setObjectName] = useState("");
  const [objectProducer, setObjectProducer] = useState("");
  const [objectValue, setObjectValue] = useState("");
  const [objectNote, setObjectNote] = useState("");

  
  
  const [previewSelectedImageOne, setPreviewSelectedImageOne] = useState(null);
  const [selectedImageNameOne, setSelectedImageNameOne] = useState("");
  const [hasSelectedImageOne, setHasSelectedImageOne] = useState(false);

  const [previewSelectedImageTwo, setPreviewSelectedImageTwo] = useState(null);
  const [selectedImageNameTwo, setSelectedImageNameTwo] = useState("");
  const [hasSelectedImageTwo, setHasSelectedImageTwo] = useState(false);

  const [previewSelectedImageThree, setPreviewSelectedImageThree] = useState(null);
  const [selectedImageNameThree, setSelectedImageNameThree] = useState("");
  const [hasSelectedImageThree, setHasSelectedImageThree] = useState(false);

  useEffect(() => {
    setChangeButtonsOnView("edit-object");
  });

  const handleImageChangeOne = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSelectedImageOne(reader.result);
      };
      reader.readAsDataURL(file);

      setSelectedImageNameOne(file.name);
      setHasSelectedImageOne(true);
    } else {
      setPreviewSelectedImageOne(null);
      setSelectedImageNameOne("");
      setHasSelectedImageOne(false);
    }
  };

  const handleImageChangeTwo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSelectedImageTwo(reader.result);
      };
      reader.readAsDataURL(file);

      setSelectedImageNameTwo(file.name);
    } else {
      setPreviewSelectedImageTwo(null);
      setSelectedImageNameTwo("");
    }
  };

  const handleImageChangeThree = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSelectedImageThree(reader.result);
      };
      reader.readAsDataURL(file);

      setSelectedImageNameThree(file.name);
      setHasSelectedImageThree(true);
    } else {
      setPreviewSelectedImageThree(null);
      setSelectedImageNameThree("");
      setHasSelectedImageThree(false);
    }
  };

  const GoToCompletedObject = () => {
    navigate("/object");
  };

  const areObjectRequirementsEmpty =
    objectName.trim() === "" || !hasSelectedImageOne;

  return (
    <section className="add-object__section">
      <DisallowUserAccess />
      <div className="add-object__text-container">
        <h1 className="add-object__title">Redigera objekt</h1>
        <p className="add-object__info">
          Är i kategorin: {checkWhatCategoryIsUserOn}
        </p>
      </div>

      <form
        className="form__container 
          form__container--margin-bottom"
      >
        <div className="form-input-with-label-guideline__container">
          <div className="form-input-with-label__box">
            <label className="form__label" htmlFor="object-name__input">
              Titel
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

          <p className="add-object__guideline">
            Tex.: Författare, skapare, tillverkare.
          </p>
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
            rows={4}
            onChange={(e) => setObjectNote(e.target.value)}
          />
        </div>

        <div className="add-object__text-container">
          <h2 className="standard__subtitle">Redigera befintliga bilder</h2>
        </div>

{/* bild 1  */}
        <div className="form-input-with-label__box form-input-with-label__box--upload">
          <label
            className="form__label"
            htmlFor="category-image-upload__input-one"
          >
            Ladda upp bild 1
          </label>

          <div className="form-upload-button-name__container box">
            <label
              className="form__upload-label"
              htmlFor="category-image-upload__input-one"
            >
              <span className="material-symbols-outlined upload">
                cloud_upload
              </span>
              <p className="upload__text">Välj bild</p>
            </label>

            <label
              className="form__selected-file__label"
              htmlFor="category-image-upload__input-one"
            >
              {selectedImageNameOne}
            </label>
            <span className="material-symbols-outlined trash__btn">delete</span>
          </div>

          {/* Hide the default file input and made a custom one */}
          <input
            type="file"
            id="category-image-upload__input-one"
            className="form__input-upload"
            accept="image/*"
            onChange={(e) => handleImageChangeOne(e)}
          />
        </div>

{/* bild 2  */}
        <div className="form-input-with-label__box form-input-with-label__box--upload">
          <label
            className="form__label"
            htmlFor="category-image-upload__input-two"
          >
            Ladda upp bild 2
          </label>

          <div className="form-upload-button-name__container box">
            <label
              className="form__upload-label"
              htmlFor="category-image-upload__input-two"
            >
              <span className="material-symbols-outlined upload">
                cloud_upload
              </span>
              <p className="upload__text">Välj bild</p>
            </label>

            <label
              className="form__selected-file__label"
              htmlFor="category-image-upload__input-two"
            >
              {selectedImageNameTwo}
            </label>
            <span className="material-symbols-outlined trash__btn">delete</span>
          </div>

          {/* Hide the default file input and made a custom one */}
          <input
            type="file"
            id="category-image-upload__input-two"
            className="form__input-upload"
            accept="image/*"
            onChange={(e) => handleImageChangeTwo(e)}
          />
        </div>




{/* bild 3 */}

        <div className="form-input-with-label__box form-input-with-label__box--upload lastchild">
          <label
            className="form__label"
            htmlFor="category-image-upload__input-two"
          >
            Ladda upp bild 3
          </label>

          <div className="form-upload-button-name__container box">
            <label
              className="form__upload-label"
              htmlFor="category-image-upload__input-three"
            >
              <span className="material-symbols-outlined upload">
                cloud_upload
              </span>
              <p className="upload__text">Välj bild</p>
            </label>

            <label
              className="form__selected-file__label"
              htmlFor="category-image-upload__input-three"
            >
              {selectedImageNameThree}
            </label>
            <span className="material-symbols-outlined trash__btn">delete</span>
          </div>

          {/* Hide the default file input and made a custom one */}
          <input
            type="file"
            id="category-image-upload__input-three"
            className="form__input-upload"
            accept="image/*"
            onChange={(e) => handleImageChangeThree(e)}
          />
        </div>
      </form>

      <div className="add-category-image__container">
        {previewSelectedImageOne && (
          <img
            src={previewSelectedImageOne}
            alt="Preview"
            className="add-category-image__preview"
          />
        )}
      </div>

      <div className="add-category-image__container">
        {previewSelectedImageTwo && (
          <img
            src={previewSelectedImageTwo}
            alt="Preview"
            className="add-category-image__preview"
          />
        )}
      </div>

      <div className="add-category-image__container">
        {previewSelectedImageThree && (
          <img
            src={previewSelectedImageThree}
            alt="Preview"
            className="add-category-image__preview"
          />
        )}
      </div>

      <button
        type="button"
        className="fixed__button"
        onClick={() => GoToCompletedObject()}
        disabled={areObjectRequirementsEmpty}
        title="Slutför"
      >
        <span className="material-symbols-outlined round__button-icon">
          done
        </span>
      </button>
    </section>
  );
};
