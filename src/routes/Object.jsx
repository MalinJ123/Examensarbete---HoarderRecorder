import "../styles/object.css";
import { Link } from "react-router-dom";
import book from "../images/book.png";
import eld from "../images/eld.png";
import storm from "../images/storm.png";
import blade from "../images/blade.png";

function Object() {
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
              <span class="material-symbols-outlined penn">edit</span>
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
              <span class="material-symbols-outlined penn">edit</span>
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
              <span class="material-symbols-outlined penn">edit</span>
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
              <span class="material-symbols-outlined penn">edit</span>
            </div>
          </div>
        </div>
        
</div>

      <div className="add-category-container">
        <Link to="/addcategory">
          <button className="add-categorybtn">
            <span className="material-symbols-outlined">add</span>
          </button>
        </Link>
      </div>
    </>
  );
}
export default Object;
