import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, addDoc, collection, where, query } from "firebase/firestore";
import { v4 } from "uuid";

import { db } from "../firebaseConfig";
import { AppContext } from "../ContextRoot";
import "../styles/authentication.css";

export const Authentication = () => {

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
    isUserLoggedIn
  } = useContext(AppContext);

  useEffect(() => {
    setChangeButtonsOnView("authentication");

    if(isUserLoggedIn) {
      navigate("/start");
    }
  }, [isUserLoggedIn])

  const navigate = useNavigate();

 
  const dbRef = collection(db, "users");

  const onHandleSubmit = async (e) => {
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
      console.log("Username and password are filled in!")
      console.log("Authentication view is: ", authenticationView)
      if (authenticationView === "register") {

        // If the username is already taken, display an error message
        const matchUsername = query(dbRef, where("username", "==", username));

        try {

          const snapshot = await getDocs(matchUsername);
          const userMatchArray = snapshot.docs.map((doc) => doc.data());

          if (userMatchArray.length > 0) {
            setUsernameError("Användarnamnet är upptaget");
            return;

          } else {

            const generateUserId = async (dbRef) => {
              // Generate an user id
              let userId = v4();

              let checkIfUserIdExists = true;
              while (checkIfUserIdExists) {
                const matchUserId = query(dbRef, where("userId", "==", userId));
                const snapshot = await getDocs(matchUserId);

                if (snapshot.empty) {
                  checkIfUserIdExists = false;
                } else {
                  userId = v4();
                }
              }

              return userId;

            }

            const userId = await generateUserId(dbRef);

            await addDoc(dbRef, {id: userId, username: username, password: userPassword});

            localStorage.setItem(
              localStorageUser,
              JSON.stringify({ id: userId, username: username, loggedIn: true })
            );

            setIsUserLoggedIn(true);

            navigate("/start");

          }

        } catch (error) {
          console.error("Error getting documents: ", error);
        }

      } else if (authenticationView === "login") {

        try {

          const querySnapshot = await getDocs(
            query(dbRef, "users", where("username", "==", username), where("password", "==", userPassword))
          );
      
          if (querySnapshot.empty) {

            setUsernameError("Fel användarnamn eller lösenord");

          } else {

            const userDoc = querySnapshot.docs[0];
            const userId = userDoc.data().id;

            localStorage.setItem(
              localStorageUser,
              JSON.stringify({ id: userId, username, loggedIn: true })
            );

            setIsUserLoggedIn(true);

            navigate("/start");

          }
        } catch (error) {
          console.error("Error getting documents:", error);
          setUsernameError("Ett fel inträffade, försök igen senare.");
        }
      };
      }
    }

  return (
    <section className="auth__splashscreen">
      {authenticationView === "register" ? (
        <Register setAuthenticationView={setAuthenticationView} onHandleSubmit={onHandleSubmit} usernameError={usernameError} setUsernameError={setUsernameError} setPasswordError={setPasswordError}
        passwordError={passwordError} />
      ) : (
        <Login
          setAuthenticationView={setAuthenticationView}
          usernameError={usernameError}
          passwordError={passwordError}
          onHandleSubmit={onHandleSubmit}
          setUsernameError={setUsernameError} setPasswordError={setPasswordError}
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
  setPasswordError
}) => {
  const { username, setUsername, userPassword, setUserPassword } =
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

  const { username, setUsername, userPassword, setUserPassword } =
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
