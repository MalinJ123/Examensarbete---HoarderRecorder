import "../styles/user.css";
import { NavLink } from "react-router-dom";
import image from "../images/image.png";
import { useState } from "react";

function User() {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleDeleteAccount = () => {
    console.log("Konto är raderat! DIN LOSER");
  };
  return (
    <>
      <div className="user-wrapper">
        <div className="">
          <div className="title-logout">
           <div></div>
            <h1 className="title">Hej Norfe!</h1> <div></div>
         
          </div>

          <div className="label-container">
            <label className="user-label" htmlFor="username">
              Användarnamn
            </label>
           
            <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="user-input"
            placeholder="example-site.com/example-pokemon-cards-image.png"
          />
          </div>

          <div className="label-container">
            <label className="user-label" htmlFor="username">
              Kontobild
            </label>
            <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="user-input"
            placeholder="example-site.com/example-pokemon-cards-image.png"
          />
           
          </div>

          <div className="image-container">
            <img className="user-img" src={image} alt="" />
          </div>
          <div className="userbtn-container">
            <button className="userbtn" onClick={() => setShowOverlay(true)}>
              Ta bort konto
            </button>

            {showOverlay && (
              <div className="overlay">
                {/* Innehållet för Overlayen */}
                <div className="overlay-content">
                  <div className="deleteuser-info">
                    <h3 className="title">Vill du verkligen lämna <span className="header-font">Hoarder Recorder</span>?  😢</h3>

                    <p className="deleteinfo-p">
                     Alla dina kontouppgifter, kategorier och objekt kommer
                      att raderas!
                    </p>
                    <p className="deleteinfo-p"> Det kommer inte att gå att återskapa.</p>
                  </div>
                  <p className="title">Detta konto bli raderat: </p>
                  <ul className="deleteinfo-ul">
                    <li>3 kategorier</li>
                    <li>2 objekt kategorier</li>
                    <li>ditt konto och din data</li>
                  </ul>

                  <div className="userbtn-container space">
                    {" "}
                    <button
                      className="userbtn"
                      onClick={() => setShowOverlay(false)}
                    >
                      Avbryt
                    </button>
                    <button className="userbtn" onClick={handleDeleteAccount}>
                      Ja, ta bort
                    </button>
                  </div>
                </div>
              </div>
            )}
            <button className="userbtn">Slutför</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default User;
