import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { AppContext } from "../ContextRoot";
import { DisallowUserAccess } from "../components/DisallowUserAccess";

import "../styles/start.css";

import start from "../images/start.png";
import book from "../images/book.png";

export const Start = () => {

  const navigate = useNavigate();

  const { setChangeButtonsOnView } = useContext(AppContext);

  useEffect(() => {
    setChangeButtonsOnView("start");
  });

  const goToNewCategoryView = () => {
    navigate("/add-category");
  }

  return (
    <>

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
                <Link to="/edit-category">
                  <span className="material-symbols-outlined pen">edit</span>
                </Link>
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

      <button type="button" className="fixed__button" title="Lägg till kategori" onClick={() => goToNewCategoryView()}> 
          <span className="material-symbols-outlined">add</span>
      </button>
    </>
  );
}
