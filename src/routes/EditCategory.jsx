import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../ContextRoot";

export const EditCategory = () => {

  const navigate = useNavigate();

  const { setChangeButtonsOnView } = useContext(AppContext);

  const [categoryName, setCategoryName] = useState("");
  const [previewSelectedImage, setPreviewSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState("");

    // Dialog
    const deleteCategoryDialogRef = useRef();

    const stateDeleteCategoryDialog = (state) => {
      if (state) {
        deleteCategoryDialogRef.current.showModal();
      } else {
        deleteCategoryDialogRef.current.close();
      }
    }

  useEffect(() => {
    setChangeButtonsOnView("edit-category");
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
    navigate("/start");
  };

  const handleTrashClick = () => {
    setShowOverlay(true); 
  };

  const handleDeleteConfirmation = (confirm) => {
    if (confirm) {
      navigate("/start");
    }
    setShowOverlay(false); 
  };

  const isCategoryNameEmpty = categoryName === "";

  return (
    <section className="add-category__section">

    <h1 className="standard__title">Redigera kategori</h1>

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
          placeholder="Pokémon kort"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

      </div>

      <div className="form-input-with-label__box form-input-with-label__box--upload">

        <label className="form__label" htmlFor="category-image-upload__input">
          Ladda upp en ny bild för kategorin
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

    <div className="category-image__container">

      {previewSelectedImage && (
        <img src={previewSelectedImage} alt="Preview" className="image-preview" />
      )}

    </div>

      <button
        className="fixed__button" type="button"
        onClick={() => GoToCompletedCategory()} disabled={isCategoryNameEmpty}
        title="Slutför"
      >
        <span className="material-symbols-outlined round__button-icon">
          done
        </span>
      </button>

      <button className="fixed__button fixed__button--second" type="button" onClick={() => stateDeleteCategoryDialog(true)}>
        <span className="material-symbols-outlined trash__btn">delete</span>
      </button>

      <dialog ref={deleteCategoryDialogRef} className="dialog">

        <section className="clickable__overlay" onClick={
          () => stateDeleteCategoryDialog(false)
        }>

        <div className="dialog__container" onClick={(event) => (event.stopPropagation())}>

          <div className="dialog__action-bar">

            <button className="ghost__button" type="button" onClick={() => stateDeleteCategoryDialog(false)} title="Stäng dialog">

            <span className="material-symbols-outlined">
              close
            </span>

      </button>

      </div>

          <h1 className="dialog__title standard__title">Vill du radera kategorin?</h1>

          <p className="dialog-info__text">
            Kategorin och dess innehåll kommer att raderas permanent.
          </p>

          <div className="dialog-center__box">

            <p className="dialog-info__title">Detta kommer bli raderat:</p>

            <ul className="dialog__list">

              <li className="dialog__list-element"><span className="bold__span">kategorin</span> och <span className="bold__span">3 objekt</span> inom kategorin.</li>
            </ul>

            <button className="secondary__button" onClick={() => handleDeleteConfirmation(true)}>Bekräfta
            </button>

          </div>

        </div>

        </section>

      </dialog>
    </section>
  );
}