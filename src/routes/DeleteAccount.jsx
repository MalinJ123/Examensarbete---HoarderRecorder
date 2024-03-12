import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { AppContext } from '../ContextRoot';
import { DisallowUserAccess } from "../components/DisallowUserAccess";

import "../styles/delete-account.css";

export const DeleteAccount = () => {

    const navigate = useNavigate();

    const { setAuthenticationView, setChangeButtonsOnView, setIsUserLoggedIn, setUsername, setUserPassword, localStorageUser } = useContext(AppContext);

    // Change the behavior the header's buttons depending on which view the user is currently on
    useEffect(() => {
        setChangeButtonsOnView('deletion');
    })

    // If user actually deletes their account
    const confirmedDeletionOfAccount = () => {
        setUsername('');
        setUserPassword('');
        setIsUserLoggedIn(false)
        localStorage.removeItem(localStorageUser);
        setAuthenticationView('register')
        navigate('/')
    };

    return (

        <section className="delete-account__section">

             <DisallowUserAccess />
             
            <h1 className="standard__title"><span className="material-symbols-outlined big__icon">
            warning
            </span></h1>

            <h1 className="standard__title">Vill du lämna oss? 😢</h1>
        
            <p className="delete-account-info__text">
            Alla dina kontouppgifter, kategorier och objekt som du har gjort, kommer att raderas!
            </p>

            <div className="delete-account-center__box">

                <p className="delete-account-info__title">Detta konto bli raderat:
                </p>

                <ul className="standard__list">

                  <li className="standard__list-element"><span className="bold__span">ditt konto</span> och <span className="bold__span">din data</span>,</li>

                  <li className="standard__list-element"><span className="bold__span">3</span> objekt inom <span className="bold__span">3</span> kategorier.</li>

                </ul>

                <button className="secondary__button user-btn" onClick={() => confirmedDeletionOfAccount()}>Bekräfta
                </button>

              </div>

      </section>

    )
}