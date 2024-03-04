import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../ContextRoot';

import '../styles/authentication.css';

export const Authentication = () => {
    const { username, userPassword, isUserLoggedIn, setChangeButtonsOnView, setIsUserLoggedIn } = useContext(AppContext);

    useEffect(() => {
        setChangeButtonsOnView('authentication');
      })

    const navigate = useNavigate()

    const [selectView, setSelectView] = useState('register');

    const areFieldsEmpty = !username || !userPassword;

    const registerOrLoginUserGoToStart = (chosen) => {
        if (username !== "" && userPassword !== "") {
            /* 
                if (chosen === 'register') {

                } else {

                }
            */

            setIsUserLoggedIn(true);

            navigate('/start')
        }
    }

    const handleViewChange = (view) => {
        setSelectView(view);
    };


    // If the user is already logged in, redirect to start instead of going to the login & register views
    useEffect(() => {
        if (isUserLoggedIn) {
            navigate('/start')
        }
    })

    return (

        <section className="auth__splashscreen">

            {
                selectView === 'register' ? <Register handleViewChange={handleViewChange} registerOrLoginUserGoToStart={registerOrLoginUserGoToStart} areFieldsEmpty={areFieldsEmpty} />  : <Login handleViewChange={handleViewChange} registerOrLoginUserGoToStart={registerOrLoginUserGoToStart} areFieldsEmpty={areFieldsEmpty} />
            }

        </section>

    );
};

const Register = ({ handleViewChange, registerOrLoginUserGoToStart, areFieldsEmpty }) => {

    const { setUsername, setUserPassword } = useContext(AppContext);

    return (

        <section className="auth__section">

            <h1 className="auth__title">Registera nytt konto</h1>

            <div className="information__box">

                <p>
                    <span className="hr-bold__span">Hoarder Recorder</span> är en plattform där du kan sortera det du tycker är viktigt i ditt liv och
                    hålla reda på allt du håller kärt! ❤️
                </p>

            </div>

            <form className="form__container">

                <div className="form-input-with-label__box">

                    <label htmlFor="username__input">Användarnamn</label>

                    <input type="text" id="username__input" placeholder="JohannaDoe" onChange={(e) => setUsername(e.target.value)} />

                </div>

                <div className="form-input-with-label__box">

                    <label htmlFor="password__input">Lösenord</label>

                    <input type="password" id="password__input" placeholder="********" onChange={(e) => setUserPassword(e.target.value)} />

                </div>
                
                <div className="form-button__group">

                    <button type="submit" className="primary__button" onClick={() => registerOrLoginUserGoToStart("register")} disabled={areFieldsEmpty} >Registrera</button>

                    <button type="button" className="primary__button" onClick={() => handleViewChange("login")}>Gå till logga in</button>

                </div>

            </form>

        </section>
        
    )
};

const Login = ({ handleViewChange, registerOrLoginUserGoToStart, areFieldsEmpty }) => {

    const { setUsername, setUserPassword } = useContext(AppContext);

    return (

        <section className="auth__section">

            <h1 className="auth__title">Logga in</h1>

            <div className="information__box">

                <p>
                    <span className="hr-bold__span">Hoarder Recorder</span> är en plattform där du kan sortera det du tycker är viktigt i ditt liv och
                    hålla reda på allt du håller kärt! ❤️
                </p>

            </div>

            <form className="form__container">

                <div className="form-input-with-label__box">

                    <label htmlFor="username__input">Användarnamn</label>

                    <input type="text" id="username__input" placeholder="JohannaDoe" onChange={(e) => setUsername(e.target.value)} />

                </div>

                <div className="form-input-with-label__box">

                    <label htmlFor="password__input">Lösenord</label>

                    <input type="password" id="password__input" placeholder="********" onChange={(e) => setUserPassword(e.target.value)} />

                </div>

                <div className="form-button__group">

                    <button type="button" className="primary__button" onClick={() => handleViewChange("register")}>Gå tillbaka till registrering</button>

                    <button type="submit" className="primary__button" onClick={() => registerOrLoginUserGoToStart("login")} disabled={areFieldsEmpty}>Logga in</button>

                </div>


            </form>

        </section>

    )
};