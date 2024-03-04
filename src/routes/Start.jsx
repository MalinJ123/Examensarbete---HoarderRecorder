import { useState, useContext, useEffect } from "react";



import { useNavigate } from "react-router-dom";

import { AppContext } from "../ContextRoot";

import "../styles/start.css";

import start from "../images/start.png";
import book from "../images/book.png";

function Start() {
  const navigate = useNavigate();

  const { setChangeButtonsOnView } = useContext(AppContext);

  useEffect(() => {
    setChangeButtonsOnView("start");
  });

  const goToAddCategory = () => {
    navigate("/add-category");
  };

  return (
    <section className="start__section">

      <img className="hero__image" src={start} alt="Startsidans bild" />

      <div className="start__container">

        <p className="quantity-categories__text">Du har 3 kategorier</p>

        <div className="search-input-with-icon__box">

          <label htmlFor="search__input" className="search__label">

            <span className="material-symbols-outlined">search</span>

          </label>

          <input id="search__input"
            className="search__input-text"
            type="text"
            placeholder="Sök efter kategori" />

        </div>

        <section className="categories__section">

          <div className="category__container">

              <div className="category__box">

                <img className="category__image" src={book} alt="kategori bild" />
              </div>

              <div className="category__info-kebab-icon">
                <div className="category__info">
                  
                <p className="category-info__title">Böcker
                </p>

                <p className="category-info__details">3 objekt</p>

                </div>

                <div className="category__kebab-icon">
                  
                  <span className="material-symbols-outlined kebab__icon">
                    more_vert
                  </span>

                </div>

            </div>

          </div>

          <div className="category__container">

            <div className="category__box">

              <img className="category__image" src={book} alt="kategori bild" />
            </div>

            <div className="category__info-kebab-icon">
              <div className="category__info">
                
              <p className="category-info__title">Böcker
              </p>

              <p className="category-info__details">3 objekt</p>

              </div>

              <div className="category__kebab-icon">
                
                <span className="material-symbols-outlined kebab__icon">
                  more_vert
                </span>

              </div>

            </div>

          </div>

          <div className="category__container">

            <div className="category__box">

              <img className="category__image" src={book} alt="kategori bild" />
            </div>

            <div className="category__info-kebab-icon">
              <div className="category__info">
                
              <p className="category-info__title">Böcker
              </p>

              <p className="category-info__details">3 objekt</p>

              </div>

              <div className="category__kebab-icon">
                
                <span className="material-symbols-outlined kebab__icon">
                  more_vert
                </span>

              </div>

            </div>

          </div>

          <div className="category__container">

            <div className="category__box">

              <img className="category__image" src={book} alt="kategori bild" />
            </div>

            <div className="category__info-kebab-icon">
              <div className="category__info">
                
              <p className="category-info__title">Böcker
              </p>

              <p className="category-info__details">3 objekt</p>

              </div>

              <div className="category__kebab-icon">
                
                <span className="material-symbols-outlined kebab__icon">
                  more_vert
                </span>

              </div>

            </div>

          </div>

        </section>

            <button className="fixed__button" onClick={() => goToAddCategory()} title="Lägg till ny kategori">
              <span className="material-symbols-outlined round__button-icon">add</span>
            </button>
        </div>
    </section>
  );
}
export default Start;
