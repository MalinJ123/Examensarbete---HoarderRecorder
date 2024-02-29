import "../styles/start.css";
import start from "../images/start.png";
import book from "../images/book.png";
import vhs from "../images/vhs.png";

function Start() {
  return (
    <div className="background">
      <img className="start-img" src={start} alt="en bild från unsplash" />

      <div className="p-container">
        <p className="lato">Du har 3 kategorier</p>
      </div>

      <div className="serarchfield-container">
        <div className="searchfield">
          <span class="material-symbols-outlined search">search</span>
          <p className="search-p">Sök efter katergori</p>
        </div>
      </div>

      <div className="category-wrapper">
        <div className="first">
          <div className="category-bg">
            <img className="category-img" src={book} alt="kategori bild" />
          </div>
          <div className="category-content">
            <div className="title-object">
              <h4 className="title category">Böcker</h4>
              <p className="object-p">3 objekt </p>
            </div>
            <div className="category-moreicon">
              <span class="material-symbols-outlined">more_vert</span>
            </div>
          </div>
        </div>

        <div className="first">
          <div className="category-bg">
            <img className="category-img" src={book} alt="kategori bild" />
          </div>
          <div className="category-content">
            <div className="title-object">
              <h4 className="title category">Böcker</h4>
              <p className="object-p">3 objekt</p>
            </div>
            <div className="category-moreicon">
              <span class="material-symbols-outlined">more_vert</span>
            </div>
          </div>
        </div>

        <div className="first">
          <div className="category-bg">
            <img className="category-img" src={book} alt="kategori bild" />
          </div>
          <div className="category-content">
            <div className="title-object">
              <h4 className="title category">Böcker</h4>
              <p className="object-p">3 objekt</p>
            </div>
            <div className="category-moreicon">
              <span class="material-symbols-outlined">more_vert</span>
            </div>
          </div>
        </div>
       
        </div>
        <div className="add-category-container">
          <div className="add-category">
            <span class="material-symbols-outlined">add</span>
          </div>
        </div>
      </div>

  );
}
export default Start;
