import { useState, useContext, useEffect } from "react";

import { Link } from "react-router-dom";

import { AppContext } from "../ContextRoot";

import "../styles/start.css";

import start from "../images/start.png";
import book from "../images/book.png";

function Start() {
  const { setChangeButtonsOnView } = useContext(AppContext);

  useEffect(() => {
    setChangeButtonsOnView("start");
  });

  return (
    <>
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
                <span class="material-symbols-outlined pen">edit</span>
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
                <span class="material-symbols-outlined pen">edit</span>
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
                <span class="material-symbols-outlined pen">edit</span>
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
                <span class="material-symbols-outlined pen">edit</span>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      

      <div className="add-category-container">
        <Link to="/add-category">
          <button className="add-categorybtn">
            <span className="material-symbols-outlined">add</span>
          </button>
        </Link>
      </div>
    </>
  );
}
export default Start;