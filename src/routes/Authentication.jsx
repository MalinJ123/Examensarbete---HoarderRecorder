import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, addDoc, collection, where, query } from "firebase/firestore";

import { db } from "../firebaseConfig";
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
    setChangeButtonsOnView,
    setIsUserLoggedIn,
  } = useContext(AppContext);

  useEffect(() => {
    setChangeButtonsOnView("authentication");
  }, []);

  const navigate = useNavigate();

  const dbref = collection(db, "users");

  const onHandleSubmit = async (e) => {
    e.preventDefault();
 // Validera användarnamn och lösenord
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

// Om valideringen passerar, fortsätt med registrering eller inloggning
if (!usernameError && !passwordError && userPassword !== "" && username !== "" ) {
  if (authenticationView === "register") {
    const matchUsername = query(dbref, where("username", "==", username));

    try {
      const snapshot = await getDocs(matchUsername);
      const userMatchArray = snapshot.docs.map((doc) => doc.data());

      if (userMatchArray.length > 0) {
        setUsernameError("Användarnamnet är upptaget");
        return;
      } else {
        await addDoc(dbref, {username: username, password: userPassword});
        setIsUserLoggedIn(true);
        navigate("/start");

        localStorage.setItem(
          localStorageUser,
          JSON.stringify({ username, password: userPassword, loggedIn: true })
        );
      }

    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  } else if (authenticationView === "login") {
    const matchUsername = query(dbref, where("username", "==", username));
    const matchPassword = query(dbref, where("password", "==", userPassword));

    try {
      const userNameSnapshot = await getDocs(matchUsername);
      const userNameMatchArray = userNameSnapshot.docs.map((doc) => doc.data());

      const userPasswordSnapshot = await getDocs(matchPassword);
      const userPasswordMatchArray = userPasswordSnapshot.docs.map((doc) => doc.data());

      if (userNameMatchArray.length > 0 && userPasswordMatchArray.length > 0) {
        setIsUserLoggedIn(true);
        navigate("/start");

        localStorage.setItem(
          localStorageUser,
          JSON.stringify({ username, password: userPassword, loggedIn: true })
        );
      } else {
        setUsernameError("Fel användarnamn eller lösenord");
        return;
      }

    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }
}
};
  // Hantera valideringen för registrera konto

  // const onHandleRegister = (e) => {
  //   e.preventDefault();

  //   if (!username) {
  //     setUsernameError("Du måste fylla i användarnamn");
  //   } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
  //     setUsernameError(
  //       "Användarnamnet får bara innehålla bokstäver och siffror"
  //     );
  //   } else {
  //     setUsernameError("");
  //   }

  //   if (!userPassword) {
  //     setPasswordError("Du måste fylla i lösenord");
  //   } else if (!/^[a-zA-Z0-9]+$/.test(userPassword)) {
  //     setPasswordError("Lösenordet får bara innehålla bokstäver och siffror");
  //   } else {
  //     setPasswordError("");
  //   }

  //   if (username && userPassword && !usernameError && !passwordError) {
  //     if (username === "Malin" && userPassword === "12345") {
  //       setIsUserLoggedIn(true);
  //       navigate("/start");

  //       localStorage.setItem(
  //         localStorageUser,
  //         JSON.stringify({ username, password: userPassword, loggedIn: true })
  //       );
  //     } else {
  //       setUsernameError("Fel användarnamn eller lösenord");
  //     }
  //   }
  // };
  return (
    <section className="auth__splashscreen">
      {authenticationView === "register" ? (
        <Register
          setAuthenticationView={setAuthenticationView}
          onHandleSubmit={onHandleSubmit}
          usernameError={usernameError}
          setUsernameError={setUsernameError}
          setPasswordError={setPasswordError}
          passwordError={passwordError}
        />
      ) : (
        <Login
          setAuthenticationView={setAuthenticationView}
          usernameError={usernameError}
          passwordError={passwordError}
          onHandleSubmit={onHandleSubmit}
          setUsernameError={setUsernameError}
          setPasswordError={setPasswordError}
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
  setUsernameError,
  setPasswordError,
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
  onHandleSubmit,
  setAuthenticationView,
  usernameError,
  setUsernameError,
  passwordError,
  setPasswordError,
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
      <h1 className="standard__title">Registrera nytt konto</h1>
      <div className="information__box">
        <p>
          <span className="hr-bold__span">Hoarder Recorder</span> är en
          plattform där du kan sortera det du tycker är viktigt i ditt liv och
          hålla reda på allt du håller kärt! ❤️
        </p>
      </div>
      <form className="form__container" onSubmit={(e) => onHandleSubmit(e)}>
        <div className="form-input-with-label__box">
          <label className="form__label" htmlFor="username__input">
            Användarnamn*
          </label>
          <input
            className="form__input-text"
            type="text"
            id="username__input"
            placeholder="JohannaDoe"
            value={username}
            onChange={handleUsernameChange}
            maxLength={24}
          />
          {usernameError && <p className="error-message">{usernameError}</p>}
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
