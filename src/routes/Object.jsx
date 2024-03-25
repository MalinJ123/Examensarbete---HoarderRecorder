import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

import { db, imageDb } from "../firebaseConfig";
import { AppContext } from "../ContextRoot";
import { DisallowUserAccess } from "../components/DisallowUserAccess";
import "../styles/object.css";

export const Object = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    setChangeButtonsOnView,
    setCheckWhatCategoryIsUserOn,
    userId,
    setCurrentCategory,
    userObjects,
    setUserObjects,
  } = useContext(AppContext);
  const [sendToContextMenu, setSendToContextMenu] = useState({});
  const [currentHeroImage, setCurrentHeroImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredObjects, setFilteredObjects] = useState([]);
  const deleteCategoryDialogRef = useRef();
  const dialogContextMenuRef = useRef();

  useEffect(() => {
    setCurrentCategory(id);
  }, [id]);

  useEffect(() => {
    const fetchObjects = async () => {
      if (!userId) {
        return;
      }
      try {
        // Get objects from the database from collection categories to objects
        const objectsRef = collection(db, "objects");
        const matchObjectsByLinkedCategory = query(
          objectsRef,
          where("linkedCategory", "==", id)
        );
        const querySnapshot = await getDocs(matchObjectsByLinkedCategory);

        const objectsData = [];
        querySnapshot.forEach((doc) => {
          objectsData.push({ id: doc.id, ...doc.data() });
        });

        console.log("Objects fetched:", objectsData);

        // Get the main category image, name, and user ID
        const getMainCategoryRef = collection(db, "categories");
        const matchMainCategory = query(
          getMainCategoryRef,
          where("id", "==", id)
        );
        const mainCategorySnapshot = await getDocs(matchMainCategory);

        if (mainCategorySnapshot.empty) {
          console.error("Main category document not found");
          navigate("/start");
        } else {
          const mainCategoryDoc = mainCategorySnapshot.docs[0];

          const mainCategoryData = mainCategoryDoc.data();
          setCurrentHeroImage(mainCategoryData.image);
          setCheckWhatCategoryIsUserOn(mainCategoryData.name);

          // Check ownership using the fetched data
          if (mainCategoryData.userId === userId) {
            console.log("User owns this category");
          } else {
            console.log("User does not own this category");
            navigate("/start");
          }
        }

        setUserObjects(objectsData);
        setLoading(false);
      } catch (error) {
        console.error("Error getting objects:", error);
        setLoading(false);
      }
    };
    fetchObjects();
  }, [
    userId,
    id,
    navigate,
    setCurrentCategory,
    setCheckWhatCategoryIsUserOn,
    setUserObjects,
  ]);

  const deleteSpecificObject = async () => {
    try {
      const dbObjectsRef = collection(db, "objects");
      const matchObjectsById = query(
        dbObjectsRef,
        where("id", "==", sendToContextMenu.id)
      );
      const objectsSnapshot = await getDocs(matchObjectsById);

      if (!objectsSnapshot.empty) {
        objectsSnapshot.forEach(async (doc) => {
          const objectData = doc.data();

          const imageUrls = objectData.images;

          for (const imageUrl of imageUrls) {
            const imageRef = ref(imageDb, imageUrl);

            await deleteObject(imageRef);

            console.log("Image deleted successfully");
          }

          await deleteDoc(doc.ref);

          console.log("Object deleted successfully");

          const updatedObjects = userObjects.filter(
            (object) => object.id !== sendToContextMenu.id
          );
          setUserObjects(updatedObjects);
        });
      } else {
        console.log("No objects found");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    setChangeButtonsOnView("object");
  }, [setChangeButtonsOnView]);

  useEffect(() => {
    if (userObjects.length > 0) {
      setFilteredObjects(userObjects);
    }
  }, [userObjects]);

  const handleSearchInput = (e) => {
    if (e.target.value !== null) {
      const searchInput = e.target.value.toLowerCase();
      const filteredResults = userObjects.filter((object) =>
        object.name.toLowerCase().includes(searchInput)
      );
      setFilteredObjects(filteredResults);
    } else {
      setFilteredObjects(userObjects);
    }
  };

  if (loading) {
    return <p>Laddar och hämtar data . . . </p>;
  }

  return (
    <section className="object__section section--spacer">
      <DisallowUserAccess />
      <img
        className="hero__image"
        src={currentHeroImage}
        alt="Objektsidans bild"
      />
      <div className="start__container">
        <p className="quantity-categories__text">
          Du har {userObjects.length} objekt
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
            onChange={handleSearchInput}
          />
        </div>
        <section className="objects__section">
          {userObjects.length === 0 ? (
            <div className="information__box information__box--lighter">
              <p>
                <span className="bold__span">
                  Du har inte gjort några objekt ännu!
                </span>
              </p>
              <p>
                Börja med att lägga till några. Tryck på pluset och börja skapa.
              </p>
            </div>
          ) : (
            filteredObjects.map((object) => (
              <div className="object__container" key={object.id}>
                <div
                  className="object__box"
                  onClick={() => navigate(`show-object/${object.id}`)}
                >
                  <img
                    className="object__image"
                    src={object.images[0]}
                    alt="Objekt bild"
                  />
                </div>
                <div className="object__info-container">
                  <div
                    className="object__info"
                    onClick={() => navigate(`show-object/${object.id}`)}
                  >
                    <p className="object-info__title">{object.name}</p>
                    <p className="object-info__details">{object.producer}</p>
                    <p className="object-info__details">{object.value}</p>
                  </div>
                  <div className="category__kebab-icon">
                    <button
                      className="ghost__button ghost__button--kebab"
                      onClick={() => {
                        setSendToContextMenu(object),
                          stateDialogContextMenu(true);
                      }}
                    >
                      <span className="material-symbols-outlined kebab__icon">
                        more_vert
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
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
              <span>{sendToContextMenu.name}</span>
            </h1>

            <ul className="dialog__list dialog__list--menu">
              <li className="dialog__list-element">
                <button
                  className="ghost__button ghost__button--menu"
                  onClick={() => {
                    navigate(`show-object/${sendToContextMenu.id}`),
                      stateDialogContextMenu(false),
                      setSendToContextMenu({});
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
                    navigate(`edit-object/${sendToContextMenu.id}`),
                      stateDialogContextMenu(false),
                      setSendToContextMenu({});
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
                  onClick={() => {
                    stateDeleteCategoryDialog(true);
                  }}
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
                    deleteSpecificObject(),
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
        onClick={() => navigate("add-object")}
      >
        <span className="material-symbols-outlined">add</span>
      </button>
    </section>
  );
};
