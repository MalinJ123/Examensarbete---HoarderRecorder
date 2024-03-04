import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { AppContext } from '../ContextRoot';

import image from "../images/image.png";
import "../styles/user.css";

function User() {
  const { setChangeButtonsOnView, userProfilePicture, setUserProfilePicture } = useContext(AppContext);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setChangeButtonsOnView('user');
  })

  const handleDeleteAccount = () => {
    console.log("Konto är raderat! DIN LOSER");
  };
  return (
    <section className="user__section">
      <h1 className="user__title">Hej Norfe!</h1>
      <form className="form__container">
        <div className="form-input-with-label__box">

          <label htmlFor="profile-picture__input">Kontobild</label>

          <input type="text" id="profile-picture__input" placeholder="example-site.com/example-avatar-image.png" onChange={(e) => setUserProfilePicture(e.target.value)} />

        </div>

        {
          userProfilePicture === "" ? (
            null
          )
          : (
              <img className="user-profile-picture__image" src={userProfilePicture} alt="" />
          )
        }


      </form>

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
    </section>
  );
}
export default User;
