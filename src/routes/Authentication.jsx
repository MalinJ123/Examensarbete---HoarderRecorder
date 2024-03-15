import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../ContextRoot";
import "../styles/authentication.css";

export const Authentication = () => {

  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {
    localStorageUser,
    username,
    userPassword,
    authenticationView,
    setAuthenticationView,
    isUserLoggedIn,
    setChangeButtonsOnView,
    setIsUserLoggedIn,
  } = useContext(AppContext);
  const navigate = useNavigate();

 
  // Hantera validering för login
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

  // Hantera valideringen för registrera konto 

  const onHandleRegister = (e) => {
    e.preventDefault();

    if (!username) {
      setUsernameError("Du måste fylla i användarnamn");
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setUsernameError("Användarnamnet får bara innehålla bokstäver och siffror");
    } else {
      setUsernameError("");
    }

    if (!userPassword) {
      setPasswordError("Du måste fylla i lösenord");
    } else if (!/^[a-zA-Z0-9]+$/.test(userPassword)) {
      setPasswordError("Lösenordet får bara innehålla bokstäver och siffror");
    } else {
      setPasswordError("");
    }

    if (username && userPassword && !usernameError && !passwordError) {
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
        <Register setAuthenticationView={setAuthenticationView}  onHandleRegister={onHandleRegister}  />
      ) : (
        <Login
          setAuthenticationView={setAuthenticationView}
          usernameError={usernameError}
          passwordError={passwordError}
          onHandleSubmit={onHandleSubmit}
        />
      )}
    </section>
  );
};

const Login = ({
  usernameError,
  passwordError,
  onHandleSubmit,
  setAuthenticationView,
}) => {
  const { username, userPassword, setUsername, setUserPassword } =
    useContext(AppContext);
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
          {usernameError && <p className="error-message">{usernameError}</p>}
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
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <div className="form-button__column-group">
          <button
            type="button"
            className="ghost__button"
            onClick={() => setAuthenticationView("register")}
          >
            Gå tillbaka till registrering
          </button>
          <button type="submit" className="primary__button">
            Logga in
          </button>
        </div>
      </form>
    </section>
  );
};

const Register = ({
  usernameError,
  passwordError,
  onHandleRegister,  
  setAuthenticationView,
}) => {
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
      <form className="form__container" onSubmit={onHandleRegister}>
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
          <button
            type="button"
            className="ghost__button"
            onClick={() => setAuthenticationView("login")}
          >
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
