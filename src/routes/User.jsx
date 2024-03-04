import { useState, useContext, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { AppContext } from '../ContextRoot';

import "../styles/user.css";

function User() {

  const navigate = useNavigate();

  const { setChangeButtonsOnView, userProfilePicture, setUserProfilePicture, setAuthenticationView, setIsUserLoggedIn, username, setUsername, setUserPassword } = useContext(AppContext);

  // Dialog
  const deleteAccountDialogRef = useRef();

  const stateDeleteAccountDialog = (state) => {
    if (state) {
      deleteAccountDialogRef.current.showModal();
    } else {
      deleteAccountDialogRef.current.close();
    }
  }

  // Change the behavior the header's buttons depending on which view the user is currently on
  useEffect(() => {
    setChangeButtonsOnView('user');
  })


  // If user actually deletes their account
  const confirmedDeletionOfAccount = () => {
    setUsername('');
    setUserPassword('');
    setIsUserLoggedIn(false)
    stateDeleteAccountDialog(false)
    setAuthenticationView('register')
    navigate('/')
  };

  return (
    <section className="user__section">

      <h1 className="user__title">Hej {username}!</h1>

      <form className="form__container">

        <div className="form-input-with-label__box">

          <label htmlFor="profile-picture__input">Kontobild</label>

          <input type="text" id="profile-picture__input" placeholder="example-site.com/example-avatar-image.png" onChange={(e) => setUserProfilePicture(e.target.value)} />

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

          <button type="button" className="secondary__button" onClick={() => stateDeleteAccountDialog(true)}>Ta bort konto</button>

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
          <dialog ref={deleteAccountDialogRef} className="dialog">

            <section className="clickable__overlay" onClick={
              () => stateDeleteAccountDialog(false)
            }>

            <div className="dialog__container" onClick={(event) => (event.stopPropagation())}>
              <div className="dialog__action-bar">

                <button className="ghost__button" onClick={() => stateDeleteAccountDialog(false)} title="Stäng dialog">
                  
                  <span className="material-symbols-outlined">
                  close
                </span>

                </button>

              </div>

              <h1 className="dialog__title">Vill du verkligen lämna <span className="hr-bold__span">Hoarder Recorder</span>? 😢</h1>

              <p className="dialog-info__text">
                Alla dina kontouppgifter, kategorier och objekt kommer att raderas!
              </p>

              <div className="dialog-center__box">

                <p className="dialog-info__title">Detta konto bli raderat:</p>

                <ul className="dialog__list">

                  <li className="dialog__list-element"><span className="bold__span">ditt konto</span> och <span className="bold__span">din data</span>,</li>

                  <li className="dialog__list-element"><span className="bold__span">3</span> objekt inom <span className="bold__span">3</span> kategorier.</li>

                </ul>

                <button className="secondary__button" onClick={() => confirmedDeletionOfAccount()}>Bekräfta
                </button>

              </div>

          </div>

        </section>

      </dialog>

    </section>
  );
}
export default User;
