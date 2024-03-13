import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../ContextRoot";
import "../styles/authentication.css";

export const Authentication = () => {
  const {
    localStorageUser,
    username,
    userPassword,
    authenticationView,
    isUserLoggedIn,
    setChangeButtonsOnView,
    setIsUserLoggedIn,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onHandleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      setUsernameError("Du måste fylla i användarnamn");
    } else {
      setUsernameError("");
    }

    if (!userPassword) {
      setPasswordError("Du måste fylla i lösenord");
    } else {
      setPasswordError("");
    }

    if (username && userPassword) {
      if (username === "Malin" && userPassword === "12345") {
        setIsUserLoggedIn(true);
        navigate("/start");

        localStorage.setItem(
          localStorageUser,
          JSON.stringify({ username, password: userPassword, loggedIn: true })
        );
      } else {
        setUsernameError("Fel användarnamn eller lösenord");
      }
    }
  };

  return (
    <section className="auth__splashscreen">
      {authenticationView === "register" ? (
        <Register />
      ) : (
        <Login
          usernameError={usernameError}
          passwordError={passwordError}
          onHandleSubmit={onHandleSubmit}
        />
      )}
    </section>
  );
};

const Login = ({ usernameError, passwordError, onHandleSubmit }) => {
  const { username, userPassword, setUsername, setUserPassword } = useContext(
    AppContext
  );

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (!value) {
      setUsernameError("Du måste fylla i användarnamn");
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setUserPassword(value);

    if (!value) {
      setPasswordError("Du måste fylla i lösenord");
    } else {
      setPasswordError("");
    }
  };

  return (
    <section className="auth__section">
      <h1 className="standard__title">Logga in</h1>
      <div className="information__box">
        <p>
          <span className="hr-bold__span">Hoarder Recorder</span> är en
          plattform där du kan sortera det du tycker är viktigt i ditt liv och
          hålla reda på allt du håller kärt! ❤️
        </p>
      </div>
      <form className="form__container" onSubmit={onHandleSubmit}>
        <div
          className={`form-input-with-label__box ${
            usernameError && "input-error"
          }`}
        >
          <label className="form__label" htmlFor="username__input">
            Användarnamn*
          </label>
          <input
            className={`form__input-text ${usernameError && "input-error"}`}
            type="text"
            id="username__input"
            placeholder="JohannaDoe"
            value={username}
            onChange={handleUsernameChange}
            maxLength={24}
          />
          {usernameError && (
            <p className="error-message">{usernameError}</p>
          )}
        </div>
        <div
          className={`form-input-with-label__box ${
            passwordError && "input-error"
          }`}
        >
          <label className="form__label" htmlFor="password__input">
            Lösenord*
          </label>
          <input
            className={`form__input-text ${passwordError && "input-error"}`}
            type="password"
            id="password__input"
            placeholder="********"
            value={userPassword}
            onChange={handlePasswordChange}
            maxLength={32}
          />
          {passwordError && (
            <p className="error-message">{passwordError}</p>
          )}
        </div>
        <div className="form-button__column-group">
          <button
            type="button"
            className="ghost__button"
            onClick={() => setAuthenticationView("register")}
          >
            Gå tillbaka till registrering
          </button>
          <button
            type="submit"
            className="primary__button"
            // disabled={usernameError || passwordError}
          >
            Logga in
          </button>
        </div>
      </form>
    </section>
  );
};

const Register = () => {
  return (
    <section className="auth__section">
      <h1 className="standard__title">Registrera nytt konto</h1>
      <div className="information__box">
        <p>
          <span className="hr-bold__span">Hoarder Recorder</span> är en
          plattform där du kan sortera det du tycker är viktigt i ditt liv och
          hålla reda på allt du håller kärt! ❤️
        </p>
      </div>
      <form className="form__container">
        <div className="form-input-with-label__box">
          <label className="form__label" htmlFor="username__input">
            Användarnamn*
          </label>
          <input
            className="form__input-text"
            type="text"
            id="username__input"
            placeholder="JohannaDoe"
            maxLength={24}
          />
        </div>
        <div className="form-input-with-label__box">
          <label className="form__label" htmlFor="password__input">
            Lösenord*
          </label>
          <input
            className="form__input-text"
            type="password"
            id="password__input"
            placeholder="********"
            maxLength={32}
          />
        </div>
        <div className="form-button__column-group">
          <button type="button" className="ghost__button">
            Gå till logga in
          </button>
          <button type="submit" className="primary__button">
            Registrera
          </button>
        </div>
      </form>
    </section>
  );
};
