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
            <NavLink to="/" className="back-button">
              {/* <span className="material-symbols-outlined">chevron_left</span> */}
            </NavLink>
         
            <h1 className="title">Hej Norfe!</h1> <div></div>
            {/* <span className="material-symbols-outlined">logout</span> */}
          </div>

          <div className="label-container">
            <label className="user-label" htmlFor="username">
              Användarnamn
            </label>
            <span className="user-input">Victor</span>

            {/* <input className='label'
        type="text"
        id="username"
        placeholder="Victor"
      /> */}
          </div>

          <div className="label-container">
            <label className="user-label" htmlFor="username">
              Kontobild
            </label>
            <span className="user-input">
              example-site.com/example-avatar-image.png
            </span>
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
