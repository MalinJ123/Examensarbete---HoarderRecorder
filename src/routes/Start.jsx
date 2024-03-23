import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

import { db, imageDb } from "../firebaseConfig";
import { AppContext } from "../ContextRoot";
import { DisallowUserAccess } from "../components/DisallowUserAccess";

import "../styles/start.css";

import start from "../images/start.png";

export const Start = () => {
  const navigate = useNavigate();

  const { setChangeButtonsOnView, userId, userCategories, setUserCategories } = useContext(AppContext);

  const [sendToContextMenu, setSendToContextMenu] = useState({});
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categoriesImages, setCategoriesImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  // Get an image from the user's categories
  let imageUrl = "";

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

  useEffect(() => {

    setChangeButtonsOnView("start");

    const dbRef = collection(db, "categories");

    const fetchCategories = async () => {
        try {
            const matchCategoriesByUserId = query(dbRef, where("userId", "==", userId));
            const userSnapshot = await getDocs(matchCategoriesByUserId);
    
            const categoriesArray = [];
    
            userSnapshot.forEach((doc) => {
                const categoryData = doc.data();
                categoriesArray.push(categoryData);
            });

            setUserCategories(categoriesArray);

        } catch (error) {
            console.error("Error getting categories:", error);
        }
    };

    fetchCategories();
  }, [userId]);

  useEffect(() => {
    const fetchCategoriesImages = async () => {
      if (userCategories.length > 0) {
        const images = userCategories.map(category => category.image).filter(image => image);
        setCategoriesImages(images);
        console.log("Categories images:", images);
      }
    };
  
    fetchCategoriesImages();
  
  }, [userCategories]);
  
  const changeImage = () => {
    if (categoriesImages.length === 0) {
      // Reset to the beginning if categoriesImages is empty
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % categoriesImages.length);
    }
  };

  const deleteCategoryPlusObjects = async () => {
    try {
      const dbCategoriesRef = collection(db, "categories");
      const matchCategory = query(dbCategoriesRef, where("id", "==", sendToContextMenu.id));
      const categorySnapshot = await getDocs(matchCategory);
  
      const deleteCategory = async () => {
        // Delete category image
        const storageRef = ref(imageDb, sendToContextMenu.image);
        await deleteObject(storageRef);
  
        await deleteDoc(categorySnapshot.docs[0].ref);
  
        const updatedCategories = userCategories.filter((category) => category.id !== sendToContextMenu.id);
        setUserCategories(updatedCategories);
  
        const updatedCategoriesImages = categoriesImages.filter((image) => image !== sendToContextMenu.image);
        setCategoriesImages(updatedCategoriesImages);
  
        console.log("Category deleted successfully");
      };
  
      if (categorySnapshot.empty) {
        return;
      }
  
      const dbObjectsRef = collection(db, "objects");
      const matchObjectsByLinkedCategory = query(dbObjectsRef, where("linkedCategory", "==", sendToContextMenu.id));
      const objectsSnapshot = await getDocs(matchObjectsByLinkedCategory);
  
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
        });
      } else {
        console.log("No objects found in this category");
      }
  
      // After deleting objects, delete the category
      deleteCategory();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    changeImage();
  }, [categoriesImages])
  
  useEffect(() => {
    if (categoriesImages.length > 0) {
      const imageInterval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % categoriesImages.length);
      }, 7000);
  
      return () => clearInterval(imageInterval);
    }
  }, [categoriesImages]);

  // Search
  useEffect(() => {
    if (userCategories.length > 0) {
      setFilteredCategories(userCategories);
    }
  }, [userCategories]);

  const handleSearchInput = (e) => {
      if (e.target.value !== null) {
        const searchInput = e.target.value.toLowerCase();
        const filteredResults = userCategories.filter((category) => category.name.toLowerCase().includes(searchInput));
        setFilteredCategories(filteredResults);  
      } else {
        setFilteredCategories(userCategories);
      }
  };


  return (
    <section className="start__section section--spacer">

      {/* DisallowUserAccess is a component that checks if the user is really logged in. If not, the user will be redirected to root path. */}
      <DisallowUserAccess />

      {
        userCategories.length === 0 ? (
          <img className="hero__image" src={start} alt="Startsidans bild" />
        ) : (
          <img className="hero__image" src={categoriesImages[currentImageIndex]} alt="Startsidans bild" />
        )
      }

      <div className="start__container">
        
        <p className="quantity-categories__text">
          {userCategories.length === 0 || userCategories.length > 1 ? `Du har ${userCategories.length} kategorier` : "Du har 1 kategori"}
        </p>


        <div className="search-input-with-icon__box">

          <label htmlFor="search__input" className="search__label">

            <span className="material-symbols-outlined">search</span>

          </label>

          <input id="search__input" className="search__input-text" type="text" placeholder="Sök efter kategori" onChange={handleSearchInput} />

        </div>

        <section className="categories__section">
          {
            userCategories.length === 0 ? (
              <div className="information__box information__box--lighter">
                <p>
                  <span className="bold__span">Du har inte gjort några kategorier ännu!</span>
                </p>
                <p>
                  Börja med att lägga till några. 
                  Tryck på pluset och börja skapa.
                </p>


              </div>
            ) : (
              filteredCategories.map((category) => (
                <div className="category__container" key={category.id}>
  
                  <div className="category__box" onClick={() => navigate(`/object/${category.id}`)}>
  
                      <img className="category__image" src={category.image} alt="kategori bild" />
  
                  </div>
  
                  <div className="category__info-container">
  
                    <div className="category__info" onClick={() => navigate("/object")}>
  
                      <p className="category-info__title">{category.name}
                      </p>
  
                    </div>
  
                    <div className="category__kebab-icon">
  
                    <button className="ghost__button ghost__button--kebab" onClick={() => {setSendToContextMenu(category), stateDialogContextMenu(true)}}>
  
                      <span className="material-symbols-outlined kebab__icon">
                      more_vert
                      </span>
  
                    </button>
  
                  </div>
  
                  </div>
  
                </div>
  
              ))
            )
          }
          {
            }

        </section>

      </div>

      <dialog className="dialog__context-menu" ref={dialogContextMenuRef}>

        <section className="clickable__overlay clickable__overlay--menu" onClick={() => {stateDialogContextMenu(false), setSendToContextMenu({});}}>

          <div className="dialog__container" onClick={(event) => (event.stopPropagation())}>

            <div className="dialog__action-bar">

              <button className="ghost__button" type="button" onClick={() => {stateDialogContextMenu(false), setSendToContextMenu({});}} title="Stäng dialog">

                <span className="material-symbols-outlined">close</span>

              </button>

            </div>

              <h1 className="dialog__title dialog__title--menu"><span className="material-symbols-outlined">folder</span> <span>{sendToContextMenu.name}</span></h1>

              <ul className="dialog__list dialog__list--menu">

                <li className="dialog__list-element">
                  
                  <button className="ghost__button ghost__button--menu" onClick={() => {
                    navigate(`/object/${sendToContextMenu.id}`), stateDialogContextMenu(false), setSendToContextMenu({});
                  }}>
                  
                  <span className="material-symbols-outlined menu__icon">open_in_browser</span><span className="button__span">Öppna</span></button>
                  
                  </li>

                  <li className="dialog__list-element">
                  
                  <button className="ghost__button ghost__button--menu"  onClick={() => {
                    navigate(`/edit-category/${sendToContextMenu.id}`), stateDialogContextMenu(false), setSendToContextMenu({});
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
       <em>Kategorin och dess innehåll kommer att raderas permanent.</em>
        </p>
        
      <button className="secondary__button big" onClick={() => {
        stateDeleteCategoryDialog(false), stateDialogContextMenu(false), deleteCategoryPlusObjects();
      }}>Bekräfta
      </button>

  </div>

  </section>

</dialog>

      <button type="button" className="fixed__button" title="Lägg till kategori" onClick={() => navigate("/add-category")}> 
          <span className="material-symbols-outlined">add</span>
      </button>
    </section>
  );
}
