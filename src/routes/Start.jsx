import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

import { db } from "../firebaseConfig";
import { AppContext } from "../ContextRoot";
import { DisallowUserAccess } from "../components/DisallowUserAccess";

import "../styles/start.css";

import start from "../images/start.png";
import book from "../images/book.png";

export const Start = () => {

  const [categories, setCategories] = useState([]);

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

  const { setChangeButtonsOnView, username } = useContext(AppContext);

  useEffect(() => {
    setChangeButtonsOnView("start");
  });

  const goToNewCategoryView = () => {
    navigate("/add-category");
  }

  const dbRef = collection(db, "categories");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
          const matchCategoriesByUsername = query(dbRef, where("username", "==", username));
          const userSnapshot = await getDocs(matchCategoriesByUsername);
    
          const categoriesArray = [];
    
          userSnapshot.forEach((doc) => {
            const categoryData = doc.data();
    
            categoriesArray.push(categoryData);
    
        });

        setCategories(categoriesArray);
      } catch (error) {
        console.error("Error getting categories:", error);
      }
    }

    fetchCategories();


  }, [username]); 

  return (
    <section className="start__section section--spacer">

      {/* DisallowUserAccess is a component that checks if the user is really logged in. If not, the user will be redirected to root path. */}
      <DisallowUserAccess />
      
      <img className="hero__image" src={start} alt="Startsidans bild" />

      <div className="start__container">
        
        <p className="quantity-categories__text">Du har 3 kategorier</p>


        <div className="search-input-with-icon__box">

          <label htmlFor="search__input" className="search__label">

            <span className="material-symbols-outlined">search</span>

          </label>

          <input id="search__input" className="search__input-text" type="text" placeholder="Sök efter kategori" />

        </div>

        <section className="categories__section">

          {
            categories.map((category, index) => (
              <div className="category__container" key={index}>

                <div className="category__box" onClick={() => navigate("/object")}>

                    <img className="category__image" src={book} alt="kategori bild" />

                </div>

                <div className="category__info-container">

                  <div className="category__info" onClick={() => navigate("/object")}>

                    <p className="category-info__title">{category.categoryName}
                    </p>

                    <p className="category-info__details">{category.objects.length} obj.</p>

                  </div>

                  <div className="category__kebab-icon">

                  <button className="ghost__button ghost__button--kebab" onClick={() => stateDialogContextMenu(true)}>

                    <span className="material-symbols-outlined kebab__icon">
                    more_vert
                    </span>

                  </button>

                </div>

                </div>

              </div>

            ))}

          {
            [...Array(22)].map((_, index) => (
              <div className="category__container" key={index}>

                <div className="category__box" onClick={() => navigate("/object")}>

                    <img className="category__image" src={book} alt="kategori bild" />

                </div>

                <div className="category__info-container">

                  <div className="category__info" onClick={() => navigate("/object")}>

                    <p className="category-info__title">Böcker
                    </p>

                    <p className="category-info__details">3 obj.</p>

                  </div>

                  <div className="category__kebab-icon">

                  <button className="ghost__button ghost__button--kebab" onClick={() => stateDialogContextMenu(true)}>

                    <span className="material-symbols-outlined kebab__icon">
                    more_vert
                    </span>

                  </button>

                </div>

                </div>

            </div>
            ))
          }

        </section>

      </div>

      <dialog className="dialog__context-menu" ref={dialogContextMenuRef}>

        <section className="clickable__overlay clickable__overlay--menu" onClick={() => stateDialogContextMenu(false)}>

          <div className="dialog__container" onClick={(event) => (event.stopPropagation())}>

            <div className="dialog__action-bar">

              <button className="ghost__button" type="button" onClick={() => stateDialogContextMenu(false)} title="Stäng dialog">

                <span className="material-symbols-outlined">close</span>

              </button>

            </div>

              <h1 className="dialog__title dialog__title--menu"><span className="material-symbols-outlined">folder</span> <span>Böcker</span></h1>

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

        <p className="dialog-info__text overlay-text">
       <em>   Kategorin och dess innehåll kommer att raderas permanent.</em>
        </p>

        <div className="dialog-center__box">
      <p className="dialog-info__title">Detta kommer bli raderat:</p>


      <ul className="dialog__list">

        <li className="dialog__list-element"><span className="bold__span">kategorin</span> och <span className="bold__span">3 objekt</span> </li>
      </ul>


    </div>
      <button className="secondary__button big" onClick={() => {
        stateDeleteCategoryDialog(false), stateDialogContextMenu(false);
      }}>Bekräfta
      </button>

  </div>

  </section>

</dialog>

      <button type="button" className="fixed__button" title="Lägg till kategori" onClick={() => goToNewCategoryView()}> 
          <span className="material-symbols-outlined">add</span>
      </button>
    </section>
  );
}
