import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../firebaseConfig";
import { AppContext } from "../ContextRoot";
import { DisallowUserAccess } from "../components/DisallowUserAccess";
import "../styles/object.css";

import book from "../images/book.png";

export const Object = () => {

  const { setChangeButtonsOnView, setCheckWhatCategoryIsUserOn, userId, setCurrentCategory } = useContext(AppContext);

  const { id } = useParams();

  useEffect(() => {
    
  setCurrentCategory(id);
  
  }, [id]);
  
  // firebase
  const [objects, setObjects] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

      // Försök för att hämta "objekt/dokument" från databasen för att sedan mappa ut dem på objekt sidan

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const objectsRef = collection(db, "objects");
        const matchObjectsByLinkedCategory = query(objectsRef, where("linkedCategory", "==", id));
        const querySnapshot = await getDocs(matchObjectsByLinkedCategory);

        const objectsData = [];
        querySnapshot.forEach((doc) => {
          objectsData.push({ id: doc.id, ...doc.data() });
        });

        console.log("Objects fetched:", objectsData);
        setObjects(objectsData);
        setLoading(false); // Sätt loading till false när data har hämtats
      } catch (error) {
        console.error("Error getting objects:", error);
        setLoading(false); // Sätt loading till false även om det uppstår fel
      }
    };

    fetchObjects();
  }, [userId]);


  // Dialog
  const deleteCategoryDialogRef = useRef();
  const stateDeleteCategoryDialog = (state) => {
    if (state) {
      deleteCategoryDialogRef.current.showModal();
    } else {
      deleteCategoryDialogRef.current.close();
    }
  };
  const dialogContextMenuRef = useRef();
  const stateDialogContextMenu = (state) => {
    if (state) {
      dialogContextMenuRef.current.showModal();
    } else {
      dialogContextMenuRef.current.close();
    }
  };

  useEffect(() => {
    setChangeButtonsOnView("object");
    setCheckWhatCategoryIsUserOn("Böcker");
  });

  const goToNewObjectView = () => {
    navigate("/add-object");
  };

  if (loading) {
    return <p>Loading...</p>; // Visa laddningsindikator medan data hämtas
  }
  return (
    <section className="object__section section--spacer">
      <DisallowUserAccess />

      <img className="hero__image" src={book} alt="Objektsidans bild" />

      <div className="start__container">
        <p className="quantity-categories__text">
          Du har {objects.length} objekt
        </p>

        <div className="search-input-with-icon__box">
          <label htmlFor="search__input" className="search__label">
            <span className="material-symbols-outlined">search</span>
          </label>

          <input
            id="search__input"
            className="search__input-text"
            type="text"
            placeholder="Sök efter objekt"
          />
        </div>
        
        <section className="objects__section">
        {objects.map(object => (
  <div className="object__container" key={object.id}>
    <div
      className="object__box"
      onClick={() => navigate("/show-object")}
    >
      <img
        className="object__image"
        src={object.image}
        alt="Objekt bild"
      />
    </div>
    <div className="object__info-container">
      <div
        className="object__info"
        onClick={() => navigate("/show-object")}
      >
        <p className="object-info__title">{object.name}</p>
        <p className="object-info__details">{object.producer}</p>
        <p className="object-info__details">{object.value}</p>
      </div>
      <div className="category__kebab-icon">
        <button
          className="ghost__button ghost__button--kebab"
          onClick={() => stateDialogContextMenu(true)}
        >
          <span className="material-symbols-outlined kebab__icon">
            more_vert
          </span>
        </button>
      </div>
    </div>
  </div>
))}
        </section>
      </div>

      <dialog className="dialog__context-menu" ref={dialogContextMenuRef}>
        <section
          className="clickable__overlay clickable__overlay--menu"
          onClick={() => stateDialogContextMenu(false)}
        >
          <div
            className="dialog__container"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="dialog__action-bar">
              <button
                className="ghost__button"
                type="button"
                onClick={() => stateDialogContextMenu(false)}
                title="Stäng dialog"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <h1 className="dialog__title dialog__title--menu">
              <span className="material-symbols-outlined">emoji_objects</span>{" "}
              <span>Storms</span>
            </h1>

            <ul className="dialog__list dialog__list--menu">
              <li className="dialog__list-element">
                <button
                  className="ghost__button ghost__button--menu"
                  onClick={() => {
                    navigate("/show-object"), stateDialogContextMenu(false);
                  }}
                >
                  <span className="material-symbols-outlined menu__icon">
                    open_in_browser
                  </span>
                  <span className="button__span">Öppna</span>
                </button>
              </li>

              <li className="dialog__list-element">
                <button
                  className="ghost__button ghost__button--menu"
                  onClick={() => {
                    navigate("/edit-object"), stateDialogContextMenu(false);
                  }}
                >
                  <span className="material-symbols-outlined menu__icon">
                    edit
                  </span>
                  <span className="button__span">Redigera</span>
                </button>
              </li>

              <li className="dialog__list-element">
                <button
                  className="ghost__button ghost__button--menu"
                  onClick={() => stateDeleteCategoryDialog(true)}
                >
                  <span className="material-symbols-outlined menu__icon">
                    folder_delete
                  </span>
                  <span className="button__span">Radera</span>
                </button>
              </li>
            </ul>
          </div>
        </section>
      </dialog>

      <dialog ref={deleteCategoryDialogRef} className="dialog">
        <section
          className="clickable__overlay"
          onClick={() => stateDeleteCategoryDialog(false)}
        >
          <div
            className="dialog__container"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="dialog__action-bar">
              <button
                className="ghost__button"
                type="button"
                onClick={() => stateDeleteCategoryDialog(false)}
                title="Stäng dialog"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <h1 className="dialog__title standard__title">
              Vill du radera objektet?
            </h1>

            <p className="dialog-info__text">
              Objektet kommer bli raderat permanent.
            </p>

            <div className="dialog-center__box">
              <button
                className="secondary__button"
                onClick={() => {
                  stateDeleteCategoryDialog(false),
                    stateDialogContextMenu(false);
                }}
              >
                Bekräfta
              </button>
            </div>
          </div>
        </section>
      </dialog>

      <button
        type="button"
        className="fixed__button"
        title="Lägg till objekt"
        onClick={() => goToNewObjectView()}
      >
        <span className="material-symbols-outlined">add</span>
      </button>
    </section>
  );
};
