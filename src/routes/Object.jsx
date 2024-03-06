import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { AppContext } from "../ContextRoot";

import "../styles/object.css";

import book from "../images/book.png";
import storm from "../images/storm.png";

export const Object = () => {

  const navigate = useNavigate();

  const { setChangeButtonsOnView } = useContext(AppContext);

  useEffect(() => {
    setChangeButtonsOnView("object");
  });

  const goToNewObjectView = () => {
    navigate("/add-object");
  }
  return (
    <>
      <img
        className="hero__img-object"
        src={book}
        alt="en bild från unsplash"
      />

      <p className="quantity-categories__text">Du har 3 objekt</p>

      <div className="serarchfield-container">
        <div className="searchfield">
          <span className="material-symbols-outlined search">search</span>
          <p className="search-p">Sök efter objekt</p>
        </div>
      </div>

      <div className="object-wrapper">
        <div className="object-container">
          <div className="first-object">
            <div className="object-bg">
              <Link to="/object">
                <img className="object-img" src={storm} alt="kategori bild" />
              </Link>
            </div>
            <div className="object-info">
              <div className="title-object">
                <h4 className="title category"> Title: Böcker</h4>
                <p className="object-author">
                  <span className="object-bold">Författare:</span> Sara J maas
                </p>

                <p className="object-price">
                  <span className="object-bold"> Pris:</span> 205:-
                </p>
              </div>{" "}
              <span className="material-symbols-outlined penn">edit</span>
            </div>
          </div>
        </div>

        <div className="object-container">
          <div className="first-object">
            <div className="object-bg">
              <Link to="/object">
                <img className="object-img" src={storm} alt="kategori bild" />
              </Link>
            </div>
            <div className="object-info">
              <div className="title-object">
                <h4 className="title category"> Title: Böcker</h4>
                <p className="object-author">
                  <span className="object-bold">Författare:</span> Sara J maas
                </p>

                <p className="object-price">
                  <span className="object-bold"> Pris:</span> 205:-
                </p>
              </div>{" "}
              <span className="material-symbols-outlined penn">edit</span>
            </div>
          </div>
        </div>

        <div className="object-container">
          <div className="first-object">
            <div className="object-bg">
              <Link to="/object">
                <img className="object-img" src={storm} alt="kategori bild" />
              </Link>
            </div>
            <div className="object-info">
              <div className="title-object">
                <h4 className="title category"> Title: Böcker</h4>
                <p className="object-author">
                  <span className="object-bold">Författare:</span> Sara J maas
                </p>

                <p className="object-price">
                  <span className="object-bold"> Pris:</span> 205:-
                </p>
              </div>{" "}
              <span className="material-symbols-outlined penn">edit</span>
            </div>
          </div>
        </div>

        <div className="object-container">
          <div className="first-object">
            <div className="object-bg">
              <Link to="/object">
                <img className="object-img" src={storm} alt="kategori bild" />
              </Link>
            </div>
            <div className="object-info">
              <div className="title-object">
                <h4 className="title category"> Title: Böcker</h4>
                <p className="object-author">
                  <span className="object-bold">Författare:</span> Sara J maas
                </p>

                <p className="object-price">
                  <span className="object-bold"> Pris:</span> 205:-
                </p>
              </div>{" "}
              <span className="material-symbols-outlined penn">edit</span>
            </div>
          </div>
        </div>
        
</div>
 
      <button type="button" className="fixed__button" title="Lägg till objekt" onClick={() => goToNewObjectView()}> 
        <span className="material-symbols-outlined">add</span>
      </button>
    </>
  );
}
