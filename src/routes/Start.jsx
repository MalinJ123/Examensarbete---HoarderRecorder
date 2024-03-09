import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { AppContext } from "../ContextRoot";
import { DisallowUserAccess } from "../components/DisallowUserAccess";

import "../styles/start.css";

import start from "../images/start.png";
import book from "../images/book.png";

export const Start = () => {

    // Dialog
    const deleteCategoryDialogRef = useRef();

    const stateDeleteCategoryDialog = (state) => {
      if (state) {
        deleteCategoryDialogRef.current.showModal();
      } else {
        deleteCategoryDialogRef.current.close();
      }
    }

  const dialogContextMenuRef = useRef();

  const stateDialogContextMenu = (state) => {
    if (state) {
      dialogContextMenuRef.current.showModal();
    } else {
      dialogContextMenuRef.current.close();
    }
  }

  const navigate = useNavigate();

  const { setChangeButtonsOnView } = useContext(AppContext);

  useEffect(() => {
    setChangeButtonsOnView("start");
  });

  const goToNewCategoryView = () => {
    navigate("/add-category");
  }

  return (
    <section className="section--spacer">

      {/* DisallowUserAccess is a component that checks if the user is really logged in. If not, the user will be redirected to root path. */}
      <DisallowUserAccess />
      
      <img className="hero__image" src={start} alt="en bild från unsplash" />

      <p className="quantity-categories__text">Du har 3 kategorier</p>

      <div className="serarchfield-container">
        <div className="searchfield">
          <span className="material-symbols-outlined search">search</span>
          <p className="search-p">Sök efter katergori</p>
        </div>
      </div>

      <div className="category-wrapper">
        <div className="c-container">
          <div className="first">
            <div className="category-bg">
              <Link to="/object">
                <img className="category-img" src={book} alt="kategori bild" />
              </Link>
            </div>
            <div className="category-content">
              <div className="title-category">
                <h4 className="title category">Böcker</h4>
              </div>

              <div className="category-more">
                <p className="object-p">3 objekt </p>
                <button className="ghost__button" onClick={() => stateDialogContextMenu(true)}>
                  <span className="material-symbols-outlined pen">more_vert</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="c-container">
          <div className="first">
            <div className="category-bg">
              <Link to="/object">
                <img className="category-img" src={book} alt="kategori bild" />
              </Link>
            </div>
            <div className="category-content">
              <div className="title-category">
                <h4 className="title category">Böcker</h4>
              </div>

              <div className="category-more">
                <p className="object-p">3 objekt </p>
                <span className="material-symbols-outlined pen">edit</span>
              </div>
            </div>
          </div>
        </div>

        <div className="c-container">
          <div className="first">
            <div className="category-bg">
              <Link to="/object">
                <img className="category-img" src={book} alt="kategori bild" />
              </Link>
            </div>
            <div className="category-content">
              <div className="title-category">
                <h4 className="title category">Böcker</h4>
              </div>

              <div className="category-more">
                <p className="object-p">3 objekt </p>
                <span className="material-symbols-outlined pen">edit</span>
              </div>
            </div>
          </div>
        </div>
        <div className="c-container">
          <div className="first">
            <div className="category-bg">
              <Link to="/object">
                <img className="category-img" src={book} alt="kategori bild" />
              </Link>
            </div>
            <div className="category-content">
              <div className="title-category">
                <h4 className="title category">Böcker</h4>
              </div>

              <div className="category-more">
                <p className="object-p">3 objekt </p>
                <span className="material-symbols-outlined pen">edit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog className="dialog__context-menu" ref={dialogContextMenuRef}>

        <section className="clickable__overlay clickable__overlay--menu" onClick={() => stateDialogContextMenu(false)}>

          <div className="dialog__container" onClick={(event) => (event.stopPropagation())}>

            <div className="dialog__action-bar">

              <button className="ghost__button" type="button" onClick={() => stateDialogContextMenu(false)} title="Stäng dialog">

                <span className="material-symbols-outlined">close</span>

              </button>

            </div>

              <h1 className="dialog__title dialog__title--menu">Böcker</h1>

              <ul className="dialog__list dialog__list--menu">

                <li className="dialog__list-element">
                  
                  <button className="ghost__button ghost__button--menu" onClick={() => {
                    navigate("/object"), stateDialogContextMenu(false)
                  }}>
                  
                  <span className="material-symbols-outlined menu__icon">open_in_browser</span><span className="button__span">Öppna</span></button>
                  
                  </li>

                  <li className="dialog__list-element">
                  
                  <button className="ghost__button ghost__button--menu"  onClick={() => {
                    navigate("/edit-category"), stateDialogContextMenu(false)
                  }}>
                  
                  <span className="material-symbols-outlined menu__icon">edit</span><span className="button__span">Redigera</span></button>
                  
                  </li>

                  <li className="dialog__list-element">
                  
                  <button className="ghost__button ghost__button--menu" onClick={() => 
                    stateDeleteCategoryDialog(true)
                  }>
                  
                  <span className="material-symbols-outlined menu__icon">folder_delete</span><span className="button__span">Radera</span></button>
                  
                  </li>

              </ul>
          </div>
        </section>
      </dialog>

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

      <button type="button" className="fixed__button" title="Lägg till kategori" onClick={() => goToNewCategoryView()}> 
          <span className="material-symbols-outlined">add</span>
      </button>
    </section>
  );
}
