import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/authentication.css';

export const Authentication = () => {
    const [selectView, setSelectView] = useState('register');

    const handleViewChange = (view) => {
        setSelectView(view);
    };

    return (
        <section className="auth__splashscreen">
            <Link to="/start">Startsidan</Link>
            {selectView === 'register' ? <Register handleViewChange={handleViewChange} /> : <Login handleViewChange={handleViewChange} />}
        </section>
    );
};

const Register = ({ handleViewChange }) => (
    <section className="auth__section">
        <h1 className="auth__title">Registera nytt konto</h1>
        <div className="information__box">
            <p>
                <span className="hr-bold__span">Hoarder Recorder</span> är en plattform där du kan sortera det du tycker är viktigt i ditt liv och
                hålla reda på allt du håller kärt! ❤️
            </p>
        </div>
        <form className="form__container">
            <div className="form-input__group">
                <label htmlFor="username__input">Användarnamn</label>
                <input type="text" id="username__input" placeholder="Användarnamn" />
            </div>
            <div className="form-input__group">
                <label htmlFor="password__input">Lösenord</label>
                <input type="password" id="password__input" placeholder="Lösenord" />
            </div>
            <button type="submit" className="gray__button">Registrera</button>
            <button type="button" className="gray__button" onClick={() => handleViewChange("login")}>Gå till logga in</button>
        </form>
    </section>
);

const Login = ({ handleViewChange }) => (
    <section className="auth__section">
        <h1 className="auth__title">Logga in</h1>
        <div className="information__box">
            <p>
                <span className="hr-bold__span">Hoarder Recorder</span> är en plattform där du kan sortera det du tycker är viktigt i ditt liv och
                hålla reda på allt du håller kärt! ❤️
            </p>
        </div>
        <form className="form__container">
            <div className="form-input__group">
                <label htmlFor="username__input">Användarnamn</label>
                <input type="text" id="username__input" placeholder="Användarnamn" />
            </div>
            <div className="form-input__group">
                <label htmlFor="password__input">Lösenord</label>
                <input type="password" id="password__input" placeholder="Lösenord" />
            </div>
            <button type="button" className="gray__button" onClick={() => handleViewChange("register")}>Gå tillbaka till registrering</button>
            <button type="submit" className="gray__button">Logga in</button>
        </form>
    </section>
);
