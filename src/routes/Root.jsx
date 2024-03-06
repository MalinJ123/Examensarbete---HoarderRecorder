import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from "../components/Header.jsx"

import { AppContext } from '../ContextRoot';


export const Root = () => {
  const { userNotLoggedInDialogRef, stateUserNotLoggedInDialog } = useContext(AppContext);

  return (
    <>
      <Header/> 
      <Outlet /> 

      <dialog ref={userNotLoggedInDialogRef} className="dialog">

        <section className="clickable__overlay" onClick={
        () => stateUserNotLoggedInDialog(false)
        }>

        <div className="dialog__container" onClick={(event) => (event.stopPropagation())}>

        <div className="dialog__action-bar">

            <button className="ghost__button" type="button" onClick={() => stateUserNotLoggedInDialog(false)} title="Stäng dialog">

            <span className="material-symbols-outlined">
            close
            </span>

        </button>

        </div>

        <h1 className="dialog__title standard__title">Du måste vara inloggad!</h1>

        <p className="dialog-info__text">
            Du måste vara inloggad för att se denna vy eller resurs. Vänligen logga in på nytt.
        </p>

        <div className="dialog-center__box">
            <button className="primary__button primary__button--dialog" onClick={() => stateUserNotLoggedInDialog(false)}>Förstår
            </button>

        </div>

        </div>

        </section>

      </dialog>
      
    </>
  );
};
