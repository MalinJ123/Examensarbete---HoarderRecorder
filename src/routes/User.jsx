import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { AppContext } from '../ContextRoot';
import { DisallowUserAccess } from "../components/DisallowUserAccess";


import "../styles/user.css";

export const User = () => {

  const navigate = useNavigate();

  const { setChangeButtonsOnView, userProfilePicture, setUserProfilePicture, username } = useContext(AppContext);

  // Change the behavior the header's buttons depending on which view the user is currently on
  useEffect(() => {
    setChangeButtonsOnView('user');
  })

  const goToDeleteAccountPrompt = () => {
    navigate('/delete-account');
  }

  return (
    <section className="user__section">

      <DisallowUserAccess />

      <h1 className="standard__title">Hej {username}!</h1>

      <form className="form__container">

        <div className="form-input-with-label__box">

          <label className="form__label" htmlFor="profile-picture__input">Kontobild</label>

          <input type="text" id="profile-picture__input" className="form__input-text" placeholder="example-site.com/example-avatar-image.png" onChange={(e) => setUserProfilePicture(e.target.value)} />

        </div>

        {
          userProfilePicture === "" ? (
            null
          ) : (

            <section className="profile-picture__spacer">

              <img className="user-profile-picture__image" src={userProfilePicture} alt="Profilbild" />

            </section>

          )
        }
        <div className="form-button__group">

          <button type="button" className="secondary__button" onClick={() => goToDeleteAccountPrompt()}>Ta bort konto</button>

          {
            userProfilePicture === "" ? (
              null
            )
            : (

              <button type="submit" className="primary__button">Slutför ändring</button>

            )
          }
        </div>

      </form>

    </section>
  );
}
