import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../ContextRoot';

import '../styles/authentication.css';

export const Authentication = () => {
    const { localStorageUser, username, userPassword, authenticationView, isUserLoggedIn, setChangeButtonsOnView, setIsUserLoggedIn } = useContext(AppContext);

    useEffect(() => {
        setChangeButtonsOnView('authentication');
        if (isUserLoggedIn) {
            navigate('/start')
        }
      })

    const navigate = useNavigate()

    const onHandleSubmit = (e) => {
        e.preventDefault();

        if (username !== "" && userPassword !== "") {
            setIsUserLoggedIn(true);
            navigate('/start')

            localStorage.setItem(localStorageUser, JSON.stringify({username, password: userPassword, loggedIn: true}))
        }
    }

    const areFieldsEmpty = !username || !userPassword;

    return (

        <section className="auth__splashscreen">

          {
            authenticationView === 'register' ? <Register areFieldsEmpty={areFieldsEmpty} onHandleSubmit={onHandleSubmit} /> : <Login areFieldsEmpty={areFieldsEmpty} onHandleSubmit={onHandleSubmit} /> 
          }

        </section>

    );
};

const Register = ({ areFieldsEmpty, onHandleSubmit }) => {

    const { username, userPassword, setUsername, setUserPassword, setAuthenticationView } = useContext(AppContext);

    return (

        <section className="auth__section">

            <h1 className="standard__title">Registera nytt konto</h1>

            <div className="information__box">

                <p>
                    <span className="hr-bold__span">Hoarder Recorder</span> är en plattform där du kan sortera det du tycker är viktigt i ditt liv och
                    hålla reda på allt du håller kärt! ❤️
                </p>

            </div>

            <form className="form__container" onSubmit={onHandleSubmit} >

                <div className="form-input-with-label__box">

                    <label className="form__label" htmlFor="username__input">Användarnamn*</label>

                    <input className="form__input-text" type="text" id="username__input" placeholder="JohannaDoe" value={username} onChange={(e) => setUsername(e.target.value)} />

                </div>

                <div className="form-input-with-label__box">

                    <label className="form__label" htmlFor="password__input">Lösenord*</label>

                    <input className="form__input-text"  type="password" id="password__input" placeholder="********" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />

                </div>
                
                <div className="form-button__column-group">

                    <button type="button" className="ghost__button" onClick={() => setAuthenticationView("login")}>Gå till logga in</button>

                    <button type="submit" className="primary__button" disabled={areFieldsEmpty} >Registrera</button>

                </div>

            </form>

        </section>
        
    )
};

const Login = ({ areFieldsEmpty, onHandleSubmit }) => {

    const { username, userPassword, setUsername,  setUserPassword, setAuthenticationView} = useContext(AppContext);

    return (

        <section className="auth__section">

            <h1 className="standard__title">Logga in</h1>

            <div className="information__box">

                <p>
                    <span className="hr-bold__span">Hoarder Recorder</span> är en plattform där du kan sortera det du tycker är viktigt i ditt liv och
                    hålla reda på allt du håller kärt! ❤️
                </p>

            </div>

            <form className="form__container" onSubmit={onHandleSubmit} >

                <div className="form-input-with-label__box">

                    <label className="form__label" htmlFor="username__input">Användarnamn*</label>

                    <input className="form__input-text"  type="text" id="username__input" placeholder="JohannaDoe" value={username} onChange={(e) => setUsername(e.target.value)} />

                </div>

                <div className="form-input-with-label__box">

                    <label className="form__label" htmlFor="password__input">Lösenord*</label>

                    <input className="form__input-text"  type="password" id="password__input" placeholder="********" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />

                </div>

                <div className="form-button__column-group">

                    <button type="button" className="ghost__button" onClick={() => setAuthenticationView("register")}>Gå tillbaka till registrering</button>

                    <button type="submit" className="primary__button" disabled={areFieldsEmpty}>Logga in</button>

                </div>


            </form>

        </section>

    )
};