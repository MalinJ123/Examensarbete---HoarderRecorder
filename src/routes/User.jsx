import { useState, useContext, useEffect, useRef } from "react";

import { AppContext } from '../ContextRoot';

import "../styles/user.css";

function User() {
  const { setChangeButtonsOnView, userProfilePicture, setUserProfilePicture } = useContext(AppContext);


  // Dialog
  const deleteAccountDialogRef = useRef();

  const stateDeleteAccountDialog = (state) => {
    if (state) {
      deleteAccountDialogRef.current.showModal();
    } else {
      deleteAccountDialogRef.current.close();
    }
  }

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

              <h1 className="dialog__title">Vill du verkligen lämna <span className="hr-bold__span">Hoarder Recorder</span>?  😢</h1>

              <p className="dialog-info__text">
                Alla dina kontouppgifter, kategorier och objekt kommer att raderas!
              </p>

            <p className="title">Detta konto bli raderat: </p>

            <ul className="deleteinfo-ul">

              <li>ditt konto och din data</li>

              <li>3 kategorier</li>

              <li>3 objekt kategorier</li>
          </ul>

          <button className="secondary__button" onClick={handleDeleteAccount}>
            Bekräfta
          </button>
          </div>

        </section>
      </dialog>

    </section>
  );
}
export default User;
